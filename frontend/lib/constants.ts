export const FEATURES = [
  {
    title: "Instant MCP generation",
    description:
      "Upload your OpenAPI spec and download a fully typed MCP server in seconds."
  },
  {
    title: "Type-safe tools",
    description:
      "Zod schemas and strict validation keep every tool invocation predictable."
  },
  {
    title: "Production-ready defaults",
    description:
      "Rate limiting, auth injection, and sensible logging included out of the box."
  },
  {
    title: "Hybrid deployment",
    description:
      "Local-first for Claude Desktop, with optional tunnels for cloud dashboards."
  }
];

export const SECURITY_SUITE = [
  {
    title: "Auth injection",
    description:
      "Automatically detects security schemes and injects API keys safely."
  },
  {
    title: "Safety valve",
    description:
      "Rate limiting blocks destructive loops across POST/PUT/DELETE."
  },
  {
    title: "Audit ready",
    description:
      "Generated servers follow strict linting and predictable structure."
  }
];

export const FAQS = [
  {
    question: "Do you support private APIs?",
    answer:
      "Yes. Your OpenAPI spec stays local and the generated server runs on your infrastructure."
  },
  {
    question: "How is authentication handled?",
    answer:
      "We detect security schemes and provide a secure secrets injection endpoint."
  },
  {
    question: "Can I customize the generated server?",
    answer:
      "Absolutely. The project is a full TypeScript codebase you can extend anytime."
  }
];

export const TESTIMONIALS = [
  {
    name: "Sana Patel",
    role: "Platform Lead",
    quote:
      "We shipped an MCP integration in a day instead of a sprint. The safety valve saved us from accidental loops."
  },
  {
    name: "Jonas Weber",
    role: "Security Architect",
    quote:
      "Auth injection plus rate limiting made this instantly enterprise-friendly."
  }
];
