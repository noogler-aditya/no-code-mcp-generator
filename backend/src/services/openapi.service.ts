import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';
import yaml from 'js-yaml';
import type { OpenApiSpec } from '../types/openapi.js';

export class OpenApiService {
    static async parseAndValidate(filePath: string): Promise<OpenApiSpec> {
        try {
            // Security: Read file content manually to avoid SwaggerParser doing LFI
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            let spec: any;

            try {
                // Try JSON first
                spec = JSON.parse(fileContent);
            } catch (jsonErr) {
                // Fallback to YAML
                try {
                    spec = yaml.load(fileContent);
                } catch (yamlErr) {
                    throw new Error('File is neither valid JSON nor YAML');
                }
            }

            // Security: Disable external $ref resolution to prevent SSRF
            // We pass the OBJECT, so 'file' refs are irrelevant (relative to CWD if any), 
            // but we explicitly disable external HTTP refs.
            const options = {
                resolve: {
                    external: false, // Do not fetch http/https urls
                }
            };

            const api = await SwaggerParser.validate(spec, options);
            return api as unknown as OpenApiSpec;
        } catch (err: any) {
            throw new Error(`Invalid OpenAPI Spec: ${err.message}`);
        }
    }
}
