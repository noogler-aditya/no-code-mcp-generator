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

    // Safety Valve: Rate Limit Check
    const isDestructive = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
    const rateLimitCheck = isDestructive ? `
      if (!rateLimiter.check("${tool.name}")) {
        return {
          content: [{ type: "text", text: "Rate limit exceeded for this tool." }],
          isError: true,
        };
      }
    ` : '';

    if (method === 'GET' || method === 'DELETE') {
      // Replace path params in URL
      const pathWithArgs = apiPath.replace(/{([^}]+)}/g, '${args.$1}');

      axiosCall = `
      ${rateLimitCheck}
      try {
        const response = await axios.${method.toLowerCase()}(\`\${API_BASE_URL}${pathWithArgs}\`, {
            params: args,
            headers: API_KEY ? { Authorization: \`Bearer \${API_KEY}\` } : {}
        });
        return {
          content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: \`Error: \${error.message}\` }],
          isError: true,
        };
      }
`;
    } else {
      const pathWithArgs = apiPath.replace(/{([^}]+)}/g, '${args.$1}');
      axiosCall = `
      ${rateLimitCheck}
      try {
        const response = await axios.${method.toLowerCase()}(\`\${API_BASE_URL}${pathWithArgs}\`, args, {
            headers: API_KEY ? { Authorization: \`Bearer \${API_KEY}\` } : {}
        });
        return {
          content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: \`Error: \${error.message}\` }],
          isError: true,
        };
      }
`;
    }

    return `
  server.tool(
    "${tool.name}",
    "${tool.description.split('\n')[0]}",
    ${shape},
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
      if (prop.type === 'integer' || prop.type === 'number') zodType = 'z.number()';
      if (prop.type === 'boolean') zodType = 'z.boolean()';

      if (!required.includes(key)) {
        zodType += '.optional()';
      }
      zodShape += `      ${key}: ${zodType}.describe("${prop.description || ''}"),\n`;
    }
    zodShape += '    }';
    return zodShape;
  }
}
