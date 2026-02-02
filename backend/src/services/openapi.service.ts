import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenApiSpec } from '../types/openapi.js';

export class OpenApiService {
    static async parseAndValidate(filePath: string): Promise<OpenApiSpec> {
        try {
            const api = await SwaggerParser.validate(filePath);
            return api as unknown as OpenApiSpec;
        } catch (err: any) {
            throw new Error(`Invalid OpenAPI Spec: ${err.message}`);
        }
    }
}
