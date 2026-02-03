import express from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { registerTools } from "./tools.js";
import dotenv from "dotenv";

dotenv.config();

const server = new McpServer({
    name: "generated-server",
    version: "1.0.0",
});

// Register all tools
registerTools(server);

async function main() {
    // Check for transport mode
    if (process.argv.includes('--stdio')) {
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error("MCP Server running on stdio");
        return;
    }

    // Default to Express/SSE for Tunneling Support
    const app = express();
    const PORT = process.env.PORT || 5174;

    app.use(cors());
    app.use(express.json());

    // SSE Endpoint
    app.get('/sse', async (req, res) => {
        console.log("New SSE connection");
        const transport = new SSEServerTransport("/messages", res);
        await server.connect(transport);
    });

    // Friendly Home
    app.get('/', (req, res) => {
        res.type('html').send(`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Generated MCP Server</title>
            <style>
              body { font-family: system-ui, -apple-system, Segoe UI, sans-serif; background:#f7f4ee; color:#1f1e1c; margin:0; }
              .wrap { max-width: 720px; margin: 0 auto; padding: 48px 24px; }
              .card { background: #fff; border: 1px solid #e6e0d7; border-radius: 16px; padding: 24px; }
              code { background:#f1ece4; padding:2px 6px; border-radius:6px; }
              a { color: #1f1e1c; }
            </style>
          </head>
          <body>
            <div class="wrap">
              <h1>Generated MCP Server</h1>
              <p>Your server is running. Useful endpoints:</p>
              <div class="card">
                <p><code>/health</code> – health check</p>
                <p><code>/sse</code> – MCP SSE endpoint</p>
                <p><code>/messages</code> – MCP message endpoint</p>
                <p><code>/secrets</code> – API key injection</p>
              </div>
            </div>
          </body>
        </html>
      `);
    });

    // Message Endpoint
    app.post('/messages', async (req, res) => {
        // In a real implementation, we'd need to route messages to the correct transport
        // For simple single-client tunneling, this might need refinement, or rely on the SDK's handling.
        // The SDK's SSEServerTransport handles the response writing directly via the `res` passed in constructor?
        // Actually, SSEServerTransport mainly handles the *outgoing* stream.
        // Incoming messages (POST) need to be fed *into* the server.

        // This is a simplified implementation. The SDK implementation of SSEServerTransport usually expects
        // the server to handle the POST body handling itself and passing it to the server.
        // But `server.connect` usually binds the transport.
        // Let's look at how reference implementations do it.
        // Usually: transport.handlePostMessage(req, res);

        // Since we create a NEW transport on every GET /sse, we have a challenge routing the POST to the right one.
        // For the "Tunnel Bridge" MVP, we will start the server and listener.

        res.status(501).json({ error: "Message handling requires session management. Use Claude Desktop or a compliant socket client." });
    });

    // Health Check
    app.get('/health', (req, res) => {
        res.json({ status: 'ok', server: 'generated-mcp-server' });
    });

    // API Key Injection Endpoint (Secrets Management)
    app.post('/secrets', (req, res) => {
        const { apiKey } = req.body;
        if (!apiKey) {
            return res.status(400).json({ error: "Missing apiKey in body" });
        }
        
        // Dynamically set the environment variable for this runtime session
        process.env.API_KEY = apiKey;
        
        console.log("🔒 API Key injected successfully from Cloud Dashboard");
        res.json({ status: "success", message: "Secrets updated successfully" });
    });

    app.listen(PORT, () => {
        console.log(`MCP Server running on HTTP/SSE at http://localhost:${PORT}/sse`);
        console.log(`Run with --stdio to use standard input/output`);
    });
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
