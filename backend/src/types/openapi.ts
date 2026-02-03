export interface OpenApiSpec {
    openapi: string;
    info: {
        title: string;
        version: string;
        description?: string;
    };
    servers?: { url: string; description?: string }[];
    paths: {
        [key: string]: {
            [method: string]: OpenApiOperation;
        };
    };
    components?: {
        schemas?: {
            [key: string]: any;
        };
        securitySchemes?: {
            [key: string]: {
                type: string;
                name?: string;
                in?: string;
                scheme?: string;
                bearerFormat?: string;
            };
        };
    };
    security?: { [key: string]: string[] }[];
}

export interface OpenApiOperation {
    operationId?: string;
    summary?: string;
    description?: string;
    parameters?: OpenApiParameter[];
    requestBody?: {
        content: {
            [contentType: string]: {
                schema: any;
            };
        };
    };
    responses: {
        [statusCode: string]: {
            description: string;
            content?: {
                [contentType: string]: {
                    schema: any;
                };
            };
        };
    };
    security?: { [key: string]: string[] }[];
}

export interface OpenApiParameter {
    name: string;
    in: 'query' | 'header' | 'path' | 'cookie';
    description?: string;
    required?: boolean;
    schema?: any;
}

export interface McpToolDefinition {
    name: string;
    description: string;
    method: string;
    path: string;
    inputSchema: {
        type: 'object';
        properties: {
            [key: string]: any;
        };
        required?: string[];
    };
    parameterMetadata?: {
        [key: string]: {
            location: 'path' | 'query' | 'header' | 'cookie' | 'body';
        };
    };
}
