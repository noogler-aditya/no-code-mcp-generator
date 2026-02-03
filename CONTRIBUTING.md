# Contributing

Thanks for considering a contribution. This project is open to PRs for features, fixes, and documentation improvements.

**Prerequisites**
- Node.js 20+
- npm

**Setup**
1. Clone the repo
```bash
git clone https://github.com/noogler-aditya/no-code-mcp-generator.git
cd no-code-mcp-generator
```
2. Install dependencies
```bash
cd frontend && npm install
cd ../backend && npm install
```

**Run locally**
- Frontend
```bash
cd frontend
npm run dev
```
- Backend
```bash
cd backend
npm run dev
```

**Before submitting a PR**
- `npm run lint` in `frontend/`
- `npm run build` in `frontend/`
- `npm run build` in `backend/`

**What to include in PRs**
- Clear description of the change
- Any screenshots for UI changes
- Notes on breaking changes if applicable

**Code style**
- TypeScript strict mode
- Prefer explicit types at boundaries
- Keep UI consistent with existing design system
