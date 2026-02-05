#!/bin/bash
# ============================================================================
# setup-claude.sh - Auto-configure Claude Desktop with this MCP Server
# ============================================================================
# This script automatically:
#   1. Installs dependencies
#   2. Builds the TypeScript project
#   3. Configures Claude Desktop with the correct absolute paths
#
# Usage: npm run setup:claude
#    or: bash setup-claude.sh
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the absolute path to this script's directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Detect OS and set config path
case "$(uname -s)" in
    Darwin*)
        CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
        ;;
    Linux*)
        CONFIG_PATH="$HOME/.config/claude/claude_desktop_config.json"
        ;;
    MINGW*|CYGWIN*|MSYS*)
        CONFIG_PATH="$APPDATA/Claude/claude_desktop_config.json"
        ;;
    *)
        echo -e "${RED}❌ Unsupported operating system${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        🚀 MCP Server Setup for Claude Desktop                ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Install dependencies
echo -e "${YELLOW}📦 Step 1/3: Installing dependencies...${NC}"
if [ -f "package-lock.json" ]; then
    npm ci --silent 2>/dev/null || npm install --silent
else
    npm install --silent
fi
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 2: Build TypeScript
echo -e "${YELLOW}🔨 Step 2/3: Building TypeScript...${NC}"
npm run build --silent
echo -e "${GREEN}✓ Build complete${NC}"

# Step 3: Configure Claude Desktop
echo -e "${YELLOW}⚙️  Step 3/3: Configuring Claude Desktop...${NC}"

# Create the config directory if it doesn't exist
mkdir -p "$(dirname "$CONFIG_PATH")"

# Generate server name from directory name
SERVER_NAME=$(basename "$SCRIPT_DIR" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

# Check if config file exists and has content
if [ -f "$CONFIG_PATH" ] && [ -s "$CONFIG_PATH" ]; then
    # Backup existing config
    cp "$CONFIG_PATH" "$CONFIG_PATH.backup"
    echo -e "${YELLOW}  ℹ️  Backed up existing config to claude_desktop_config.json.backup${NC}"
    
    # Check if jq is available for proper JSON merging
    if command -v jq &> /dev/null; then
        # Use jq to merge configurations
        TEMP_CONFIG=$(mktemp)
        jq --arg name "$SERVER_NAME" \
           --arg path "$SCRIPT_DIR/dist/index.js" \
           '.mcpServers[$name] = {"command": "node", "args": [$path, "--stdio"]}' \
           "$CONFIG_PATH" > "$TEMP_CONFIG"
        mv "$TEMP_CONFIG" "$CONFIG_PATH"
    else
        # Simple overwrite if jq is not available
        cat > "$CONFIG_PATH" << EOF
{
  "mcpServers": {
    "$SERVER_NAME": {
      "command": "node",
      "args": ["$SCRIPT_DIR/dist/index.js", "--stdio"]
    }
  }
}
EOF
        echo -e "${YELLOW}  ⚠️  Note: Install 'jq' to preserve existing servers when re-running setup${NC}"
    fi
else
    # Create new config
    cat > "$CONFIG_PATH" << EOF
{
  "mcpServers": {
    "$SERVER_NAME": {
      "command": "node",
      "args": ["$SCRIPT_DIR/dist/index.js", "--stdio"]
    }
  }
}
EOF
fi

echo -e "${GREEN}✓ Claude Desktop configured${NC}"

# Success message
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    ✅ Setup Complete!                        ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  ${BLUE}Server Name:${NC} $SERVER_NAME"
echo -e "  ${BLUE}Config File:${NC} $CONFIG_PATH"
echo ""
echo -e "  ${YELLOW}Next Steps:${NC}"
echo -e "    1. ${GREEN}Restart Claude Desktop${NC} (Cmd+Q then reopen)"
echo -e "    2. Try asking Claude: ${BLUE}\"What tools do you have?\"${NC}"
echo ""
echo -e "  ${YELLOW}Config Preview:${NC}"
echo -e "  ┌──────────────────────────────────────────────────────────────┐"
echo -e "  │ {                                                            │"
echo -e "  │   \"mcpServers\": {                                           │"
echo -e "  │     \"$SERVER_NAME\": {"
echo -e "  │       \"command\": \"node\","
echo -e "  │       \"args\": [\"$SCRIPT_DIR/dist/index.js\", \"--stdio\"]"
echo -e "  │     }"
echo -e "  │   }"
echo -e "  │ }"
echo -e "  └──────────────────────────────────────────────────────────────┘"
echo ""
