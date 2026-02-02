import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize MCP Server
const mcp = new McpServer({
    name: "mcp-generator",
    version: "1.0.0",
});

import generatorRoutes from './routes/generator.routes.js';
app.use('/api/generator', generatorRoutes);

// Basic Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'MCP Generator Backend is running' });
});

// SSE Endpoint for MCP
app.get('/sse', async (req, res) => {
    const transport = new SSEServerTransport("/messages", res);
    await mcp.connect(transport);
});

// Message Endpoint for MCP
app.post('/messages', async (req, res) => {
    // Note: multiple transports implementation detail to be handled if needed for full compliance
    // For basic SSE setup, usually the transport handles the response.
    // We might need to store active transports to handle post messages correctly if using the standard SDK patterns for SSE
    res.status(501).json({ message: "Not implemented yet for simple SSE" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
