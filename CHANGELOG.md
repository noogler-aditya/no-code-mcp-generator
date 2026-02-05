# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- 🤖 **LLM-Powered Generation**: Generate MCP servers using natural language prompts
- 🚀 **One-Click Self-Hosted Deployment**: Deploy directly from the website with auto-provisioned infrastructure
- 🔗 **Multi-Agent Orchestration**: Connect multiple MCP servers together as a unified agent ecosystem

### In Progress
- Documentation cleanup and community files
- Backend hardening and test coverage
- Frontend SEO and enterprise UI updates

---

## [1.0.0] - 2026-02-04

### Added
- 🚀 **Core Generator Engine**
  - OpenAPI 3.0+ and Swagger 2.0 parsing
  - Automatic TypeScript code generation
  - Zod schema generation from OpenAPI schemas
  - MCP-compliant tool generation

- 🛡️ **Enterprise Security Suite**
  - "The Shovel" - Auth Injection system for dynamic API key handling
  - "Safety Valve" - Rate limiting middleware for destructive operations
  - Helmet.js security headers in generated servers

- ☁️ **Hybrid Cloud "Tunnel Bridge"**
  - `start-tunnel.sh` script for Cloudflare Tunnel integration
  - Local-to-cloud secure pipe without exposing ports

- 🎨 **Web Interface**
  - Drag & drop file upload for OpenAPI specs
  - Real-time generation feedback
  - Downloadable TypeScript project packages

- 🔧 **Developer Experience**
  - Full TypeScript codebase
  - ESLint configuration
  - GitHub Actions CI/CD pipeline
  - Dependabot for automated dependency updates

### Security
- Input validation on all uploaded files
- CORS configuration for frontend/backend communication
- Rate limiting on API endpoints

---

## [0.1.0] - 2026-01-15

### Added
- Initial project scaffolding
- Basic OpenAPI parser proof of concept
- Express.js backend setup

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 1.0.0 | 2026-02-04 | Production-ready MVP with security features |
| 0.1.0 | 2026-01-15 | Initial development release |

---

[Unreleased]: https://github.com/noogler-aditya/no-code-mcp-generator/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/noogler-aditya/no-code-mcp-generator/releases/tag/v1.0.0
[0.1.0]: https://github.com/noogler-aditya/no-code-mcp-generator/releases/tag/v0.1.0
