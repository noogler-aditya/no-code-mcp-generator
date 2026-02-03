import type { OpenApiSpec, OpenApiOperation, McpToolDefinition } from '../types/openapi.js';

export class ToolGeneratorService {
    static generateTools(spec: OpenApiSpec): McpToolDefinition[] {
        const tools: McpToolDefinition[] = [];

        for (const [path, methods] of Object.entries(spec.paths)) {
            for (const [method, operation] of Object.entries(methods)) {
                if (method === 'parameters' || method === 'servers') continue; // Skip non-operation keys

                const tool = this.mapOperationToTool(path, method, operation as OpenApiOperation);
                tools.push(tool);
            }
        }

        return tools;
    }

    private static mapOperationToTool(path: string, method: string, operation: OpenApiOperation): McpToolDefinition {
        const operationId = operation.operationId || `${method}_${path.replace(/\//g, '_').replace(/[{}]/g, '')}`;
        const name = this.sanitizeToolName(operationId);

        // Construct description
        let description = operation.summary || operation.description || `Execute ${method.toUpperCase()} request to ${path}`;
        description += `\nAPI Endpoint: ${method.toUpperCase()} ${path}`;

        // Build input schema
        const properties: any = {};
        const required: string[] = [];
        const parameterMetadata: Record<string, { location: 'path' | 'query' | 'header' | 'cookie' | 'body' }> = {};

        // Handle parameters (path, query, etc.)
        if (operation.parameters) {
            for (const param of operation.parameters) {
                if (param.name) {
                    properties[param.name] = {
                        type: param.schema?.type || 'string',
                        description: param.description || `Parameter ${param.name}`,
                    };
                    if (param.required) {
                        required.push(param.name);
                    }
                    // Capture metadata
                    parameterMetadata[param.name] = { location: param.in };
                }
            }
        }

        // Handle Request Body
        if (operation.requestBody && operation.requestBody.content) {
            const jsonContent = operation.requestBody.content['application/json'];
            if (jsonContent && jsonContent.schema && jsonContent.schema.properties) {
                // Flatten body properties into the tool arguments for simplicity
                for (const [propName, propSchema] of Object.entries(jsonContent.schema.properties) as any) {
                    properties[propName] = {
                        type: propSchema.type || 'string',
                        description: propSchema.description || `Body property ${propName}`
                    };

                    parameterMetadata[propName] = { location: 'body' };

                    // TODO: Handle required body params deeply if needed
                    if (jsonContent.schema.required && jsonContent.schema.required.includes(propName)) {
                        required.push(propName);
                    }
                }
            }
        }

        const toolDefinition: McpToolDefinition = {
            name,
            description,
            method,
            path,
            inputSchema: {
                type: 'object',
                properties,
            },
            parameterMetadata
        };

        if (required.length > 0) {
            toolDefinition.inputSchema.required = required;
        }

        return toolDefinition;
    }

    private static sanitizeToolName(name: string): string {
        // Ensure name matches Context Protocol regex: ^[a-zA-Z0-9_-]{1,64}$
        return name.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 64);
    }
}
