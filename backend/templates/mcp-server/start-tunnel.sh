#!/bin/bash

# Lightweight Tunnel Agent (The "Bridge")
# This script starts the local MCP server and exposes it via a secure Cloudflare Tunnel.

PORT=5174

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# 0. Cleanup: Release the port if it's currently occupied
if lsof -i :$PORT > /dev/null; then
    echo "⚠️  Port $PORT is already in use. Attempting to free it..."
    PID=$(lsof -t -i:$PORT)
    if [ -n "$PID" ]; then
        kill -9 $PID
        echo "✅ Freed port $PORT (killed PID $PID)"
    fi
fi

# 1. Ensure Dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# 2. Build Project
if [ ! -d "dist" ]; then
    echo "🛠️  Building project..."
    npm run build
fi

echo "🚀 Starting Local MCP Server on port $PORT..."
PORT=$PORT npm start &
SERVER_PID=$!

echo "⏳ Waiting for server to be ready..."
sleep 5

# Check if server is actually running
if ! lsof -i :$PORT > /dev/null; then
    echo "❌ Server failed to start on port $PORT. Check logs above."
    exit 1
fi

echo "🌐 preparing Cloudflare Tunnel..."

# 3. Resolve Cloudflared Binary
# If a local file exists but is invalid (often a 404 HTML page), delete it
if [ -f "./cloudflared" ]; then
    # Check if it's a valid binary (executable and not a text file)
    if [[ $(file -b --mime-type ./cloudflared) == text/* ]]; then
        echo "🗑️  Removing invalid local cloudflared file..."
        rm ./cloudflared
    fi
fi

# Prefer global installation
if command_exists cloudflared; then
    echo "✅ Using system cloudflared."
    cloudflared tunnel --url http://localhost:$PORT
else
    # Fallback: Download if not present
    if [ ! -f "./cloudflared" ]; then
        echo "⬇️  System cloudflared not found. Downloading binary..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
             # macOS
             curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz -o cloudflared.tgz
             tar -xzf cloudflared.tgz
             rm cloudflared.tgz
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
             # Linux
             curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
             chmod +x cloudflared
        fi
    fi
    
    # Run local binary
    if [ -f "./cloudflared" ]; then
        ./cloudflared tunnel --url http://localhost:$PORT
    else
        echo "❌ Could not find or install cloudflared. Please install manually."
        kill $SERVER_PID
        exit 1
    fi
fi

# Cleanup on exit
kill $SERVER_PID
