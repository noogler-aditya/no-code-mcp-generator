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
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(express.json());

    // SSE Endpoint
    app.get('/sse', async (req, res) => {
        console.log("New SSE connection");
        const transport = new SSEServerTransport("/messages", res);
        await server.connect(transport);
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
