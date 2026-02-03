import type { McpToolDefinition, OpenApiSpec, OpenApiOperation } from '../types/openapi.js';

export class CodeGeneratorService {
  static generateToolsFile(tools: McpToolDefinition[], spec: OpenApiSpec): string {
    let code = `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";\n`;
    code += `import axios from "axios";\n`;
    code += `import { z } from "zod";\n\n`;

    code += `const API_BASE_URL = "${spec.servers?.[0]?.url || 'http://localhost:8080'}";\n`;

    // Authorization Injection (The "Shovel")
    code += `const API_KEY = process.env.API_KEY; // Security Scheme detected\n\n`;

    // Rate Limiter (The "Safety Valve")
    code += `
class RateLimiter {
  private history: Map<string, number[]> = new Map();
  private maxRequests: number = 5; // Default safety limit
  private windowMs: number = 60 * 60 * 1000; // 1 hour

  check(toolName: string): boolean {
    const now = Date.now();
    const timestamps = this.history.get(toolName) || [];
    const validTimestamps = timestamps.filter(t => now - t < this.windowMs);
    
    if (validTimestamps.length >= this.maxRequests) {
      return false;
    }
    
    validTimestamps.push(now);
    this.history.set(toolName, validTimestamps);
    return true;
  }
}

const rateLimiter = new RateLimiter();
\n`;

    code += `export function registerTools(server: McpServer) {\n`;

    for (const tool of tools) {
      code += this.generateToolRegisterCode(tool);
    }

    code += `}\n`;
    return code;
  }

  private static generateToolRegisterCode(tool: McpToolDefinition): string {
    const shape = this.generateZodShape(tool.inputSchema.properties, tool.inputSchema.required);

    const method = tool.method.toUpperCase();
    const apiPath = tool.path;

    // Extract params from path
    let axiosCall = '';

    // 1. Organize parameters by type (Query, Body, Header, Path) based on metadata
    // Default to 'query' for GET/DELETE and 'body' for others if metadata is missing (backward compat)
    const defaultLocation = (method === 'GET' || method === 'DELETE') ? 'query' : 'body';

    let paramCollectionCode = `
      const queryParams: Record<string, any> = {};
      const bodyParams: Record<string, any> = {};
      const headerParams: Record<string, any> = {};
      let apiPath = "${apiPath}";
    `;

    // We scan the input properties and route them to the right bucket
    // If we have metadata, use it. If not, fallback to defaultLocation.
    const props = tool.inputSchema.properties || {};
    const meta = tool.parameterMetadata || {};

    for (const propName of Object.keys(props)) {
      // Safe access to args
      const argAccess = `args["${propName}"]`;
      const location = meta[propName]?.location || defaultLocation;

      if (location === 'path') {
        // Replace {param} in path
        paramCollectionCode += `
      apiPath = apiPath.replace("{${propName}}", String(${argAccess}));\n`;
      } else if (location === 'query') {
        paramCollectionCode += `
      if (${argAccess} !== undefined) queryParams["${propName}"] = ${argAccess};\n`;
      } else if (location === 'header') {
        paramCollectionCode += `
      if (${argAccess} !== undefined) headerParams["${propName}"] = ${argAccess};\n`;
      } else if (location === 'body') {
        paramCollectionCode += `
      if (${argAccess} !== undefined) bodyParams["${propName}"] = ${argAccess};\n`;
      } else if (location === 'cookie') {
        // Cookies usually go in headers, simplifiction:
        paramCollectionCode += `
      if (${argAccess} !== undefined) headerParams["Cookie"] = (headerParams["Cookie"] || "") + \`; ${propName}=\${${argAccess}}\`;\n`;
      }
    }

    // Safety Valve
    const isDestructive = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
    const rateLimitCheck = isDestructive ? `
      if (!rateLimiter.check("${tool.name}")) {
        return {
          content: [{ type: "text", text: "Rate limit exceeded for this tool." }],
          isError: true,
        };
      }
    ` : '';

    axiosCall = `
      ${rateLimitCheck}
      ${paramCollectionCode}

      try {
        const response = await axios({
            method: "${method}",
            url: \`\${API_BASE_URL}\${apiPath}\`,
            headers: {
                ...headerParams,
                ...(API_KEY ? { Authorization: \`Bearer \${API_KEY}\` } : {})
            },
            params: queryParams,
            data: Object.keys(bodyParams).length > 0 ? bodyParams : undefined
        });

        return {
          content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: \`Error: \${error.response?.data ? JSON.stringify(error.response.data) : error.message}\` }],
          isError: true,
        };
      }
    `;

    const safeDescription = ((tool.description || '').split('\n')[0] ?? '').replace(/"/g, '\\"');

    return `
  server.tool(
    "${tool.name}",
    "${safeDescription}",
    z.object(${shape}),
    async (args) => {
      ${axiosCall}
    }
  );\n`;
  }

  private static generateZodShape(properties: any, required: string[] = []): string {
    if (!properties || Object.keys(properties).length === 0) {
      return '{}'; // No args
    }

    let zodShape = '{\n';
    for (const [key, prop] of Object.entries(properties) as any) {
      let zodType = 'z.string()';
      if (prop.type === 'integer' || prop.type === 'number') zodType = 'z.coerce.number()'; // Coerce for query params
      if (prop.type === 'boolean') zodType = 'z.coerce.boolean()';

      if (!required.includes(key)) {
        zodType += '.optional()';
      }
      const safeDesc = (prop.description || '').replace(/"/g, '\\"');
      zodShape += `      ${key}: ${zodType}.describe("${safeDesc}"),\n`;
    }
    zodShape += '    }';
    return zodShape;
  }
}
