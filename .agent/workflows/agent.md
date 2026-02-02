---
description: No-Code MCP Server Generator
---

## Purpose
Build a platform that converts an OpenAPI/Swagger specification
into a working MCP-compatible server so AI agents can interact with
existing software systems.

The platform automatically generates and deploys secure MCP servers exposing
legacy systems as AI-accessible tools.

Goal:
Turn old enterprise systems into AI-ready infrastructure with minimal setup.

---

## Core Capability
Input → Tool Conversion → MCP Server → Agent Access

System flow:
1. User uploads an OpenAPI/Swagger file.
2. System parses endpoints.
3. Endpoints are converted into MCP tools.
4. MCP server is deployed.
5. AI agents call the tools.

---

## MVP Scope 

The MVP supports ONLY:
- OpenAPI/Swagger ingestion
- Automatic tool generation
- MCP server deployment
- authentication
- Cloud deployment


---

## High-Level Architecture

User Input
    ↓
OpenAPI Parser
    ↓
Tool Generator
    ↓
MCP Tool Wrapper
    ↓
MCP Server Runtime
    ↓
Agent Access

---

## System Components

### 1. Input Layer
Accepts:
- OpenAPI / Swagger JSON or YAML files

Responsibilities:
- Validate API schema
- Extract endpoints
- Extract parameters
- Extract request/response models

Output:
Normalized internal API model.

---

### 2. API Normalizer
Converts endpoints into standardized operations.

Tasks:
- Map endpoints → operations
- Map parameters → tool inputs
- Normalize request/response schemas

Output:
Unified tool structure.

---

### 3. Tool Generator
Creates callable tool functions.

Responsibilities:
- Map API calls
- Format request payloads
- Handle responses
- Manage errors

Example:

getUser(id)
createOrder(data)



---

### 4. MCP Tool Wrapper
Wraps operations into MCP-compatible tools.

Responsibilities:
- Tool metadata generation
- Schema exposure
- Validation layer

Output:
Tools available via MCP.

---

### 5. MCP Server Runtime
Hosts tools for agent access.

Responsibilities:
- Tool execution
- Authentication
- Logging
- Error handling

Deployment:
- Cloud hosted container

---

### 6. Security Layer 
Provides basic safety.

Features:
- API key authentication
- Credential storage
- Access logs

---

### 7. Agent Access Layer
Allows agents to discover and use tools.

Compatible agents:
- GPT-based agents
- Claude agents
- Local agent frameworks

---

## Technology Stack 

### Frontend 
-  Next.js
-  Typescript

### Backend
- Node.js + Express
- MCP server implementation
- Docker containers
- OpenAPI parsing libraries

### Database
-  PostgreSQL
-  Redis cache

### Deployment
- Docker containers
- Free-tier cloud hosting

### Development Tools
- GitHub
- Docker
- VS Code or agentic IDE

---

## Workflow Example

User uploads Swagger spec.

System:
1. Parses API.
2. Generates tools.
3. Wraps tools for MCP.
4. Deploys server.
5. Agents call tools.

---

## MVP Development Phases

Phase 1
- MCP server skeleton
- Tool execution layer

Phase 2
- OpenAPI ingestion
- Tool generation

Phase 3
- Deployment & authentication

Phase 4
- Demo & pilot testing

---

---

## CI/CD Pipeline (Enterprise Development Workflow)

To ensure safe and reliable development, the platform must use a
Continuous Integration and Continuous Deployment (CI/CD) workflow.

Every code change must be automatically tested and validated before
deployment.

Goal:
Prevent broken code from reaching production and maintain system stability.

---

## CI/CD Workflow Overview

Developer pushes code or opens a Pull Request.

Pipeline automatically performs:

Code Push / Pull Request
        ↓
Lint & Syntax Check
        ↓
Type Check
        ↓
Unit Tests
        ↓
Integration Tests
        ↓
Coverage Verification
        ↓
Security Scan
        ↓
Build & Deployment



---

## Risks & Mitigation

Risk: Bad API specs
Mitigation: Validation and fallback errors

Risk: Incorrect tool mapping
Mitigation: Manual mapping override

Risk: Security exposure
Mitigation: Default private deployment

---

## Success Criteria
System should:
- Convert OpenAPI to MCP tools
- Allow agents to call tools
- Deploy within minutes
- Require no coding by user

---

## Long-Term Vision
Any software system can become AI-accessible without rewriting code.

---

## End Goal
Provide the simplest path from legacy APIs to AI-ready tools.