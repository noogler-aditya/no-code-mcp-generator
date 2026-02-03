import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { OpenApiService } from '../services/openapi.service.js';
import { ToolGeneratorService } from '../services/tool-generator.service.js';
import { ProjectService } from '../services/project.service.js';

const router = Router();

// Security: Constrain uploads to prevent DoS and disk fill
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit: 5MB
    },
    fileFilter: (req, file, cb) => {
        // Simple extension check. For deeper security, check magic bytes, but JSON/YAML is text.
        if (!file.originalname.match(/\.(json|yaml|yml)$/i)) {
            return cb(new Error('Only .json, .yaml, or .yml files are allowed!'));
        }
        cb(null, true);
    }
});

// Create uploads dir if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

router.post('/upload', (req, res, next) => {
    // Wrap in closure to handle multer errors
    upload.single('spec')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Upload error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}, async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return; // Explicitly return
    }

    const filePath = req.file.path;

    try {
        // 1. Validate and Parse
        const spec = await OpenApiService.parseAndValidate(filePath);

        // 2. Generate Tools
        const tools = ToolGeneratorService.generateTools(spec);

        // 3. Generate Project Code & Zip
        const { projectId, downloadUrl } = await ProjectService.generateProject(spec, tools);

        // Cleanup upload
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        res.json({
            message: 'Spec parsed and project generated successfully',
            projectId,
            info: spec.info,
            toolCount: tools.length,
            downloadUrl,
            tools
        });

    } catch (error: any) {
        // Cleanup on error
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/download/:id', (req, res) => {
    const projectId = req.params.id;

    // Security: Prevent path traversal by validating UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(projectId)) {
        return res.status(400).json({ error: 'Invalid Project ID' });
    }

    const zipPath = path.resolve('public/generated', `${projectId}.zip`);

    if (fs.existsSync(zipPath)) {
        res.download(zipPath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

export default router;
