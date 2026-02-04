import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import crypto from 'crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3001;
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

app.set('trust proxy', 1);
app.disable('x-powered-by');

const frontendUrls = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (frontendUrls.length === 0 || frontendUrls.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key', 'X-Request-Id'],
}));
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(express.json({ limit: process.env.JSON_LIMIT || '1mb' }));
app.use(express.urlencoded({ extended: true, limit: process.env.JSON_LIMIT || '1mb' }));
app.use(pinoHttp({ logger: logger as any }));
app.use((req, res, next) => {
    const requestId = req.get('x-request-id') || crypto.randomUUID();
    res.setHeader('x-request-id', requestId);
    (req as any).requestId = requestId;
    next();
});

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

// Readiness Check (basic)
app.get('/ready', (req, res) => {
    res.json({ status: 'ready', uptime: process.uptime() });
});

const enableMcpSse = process.env.ENABLE_MCP_SSE === 'true';
if (enableMcpSse) {
    // SSE Endpoint for MCP
    app.get('/sse', async (req, res) => {
        const transport = new SSEServerTransport("/messages", res);
        await mcp.connect(transport);
    });

    // Message Endpoint for MCP
    app.post('/messages', async (req, res) => {
        res.status(501).json({ message: "Not implemented yet for simple SSE" });
    });
}

export function startServer() {
    return app.listen(PORT, () => {
        logger.info({ port: PORT }, 'Server is running');
    });
}

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error({ err, requestId: (req as any).requestId }, 'Unhandled error');
    const status = err.statusCode || err.status || 500;
    res.status(status).json({ error: err.message || 'Internal server error' });
});

if (process.env.NODE_ENV !== 'test') {
    startServer();
}
