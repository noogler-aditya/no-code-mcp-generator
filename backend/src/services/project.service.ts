import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { OpenApiSpec, McpToolDefinition } from '../types/openapi.js';
import { CodeGeneratorService } from './code-generator.service.js';
import { ZipService } from './zip.service.js';

const TEMPLATE_DIR = path.resolve('templates/mcp-server');
const GENERATED_DIR = path.resolve('public/generated');

if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
}

export class ProjectService {
    static async generateProject(spec: OpenApiSpec, tools: McpToolDefinition[]): Promise<{ downloadUrl: string, projectId: string }> {
        // Trigger generic cleanup
        await this.cleanOldProjects();

        // Validation: Verify template exists
        if (!fs.existsSync(TEMPLATE_DIR)) {
            throw new Error(`Template directory not found at ${TEMPLATE_DIR}. Please report this issue.`);
        }

        const projectId = uuidv4();
        const projectDir = path.join(GENERATED_DIR, projectId);

        // 1. Copy Template
        await this.copyRecursive(TEMPLATE_DIR, projectDir);

        // 2. Generate tools.ts
        const toolsCode = CodeGeneratorService.generateToolsFile(tools, spec);
        await fsp.writeFile(path.join(projectDir, 'src', 'tools.ts'), toolsCode);

        // 3. Zip Project
        const zipPath = path.join(GENERATED_DIR, `${projectId}.zip`);
        await ZipService.zipDirectory(projectDir, zipPath);

        // 4. Cleanup Folder (keep zip)
        await fsp.rm(projectDir, { recursive: true, force: true });

        return {
            projectId,
            downloadUrl: `/api/generator/download/${projectId}`
        };
    }

    // Cleanup files older than 1 hour
    private static async cleanOldProjects() {
        try {
            const files = await fsp.readdir(GENERATED_DIR);
            const now = Date.now();
            const ttlHours = Number(process.env.GENERATED_TTL_HOURS || 1);
            const ttlMs = ttlHours * 60 * 60 * 1000;

            for (const file of files) {
                const filePath = path.join(GENERATED_DIR, file);
                const stats = await fsp.stat(filePath);
                if (now - stats.mtimeMs > ttlMs) {
                    await fsp.rm(filePath, { recursive: true, force: true });
                }
            }
        } catch (e) {
            console.error("Cleanup failed", e);
        }
    }

    private static async copyRecursive(src: string, dest: string) {
        if (!fs.existsSync(dest)) {
            await fsp.mkdir(dest, { recursive: true });
        }

        const entries = await fsp.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await this.copyRecursive(srcPath, destPath);
            } else {
                await fsp.copyFile(srcPath, destPath);
            }
        }
    }
}
