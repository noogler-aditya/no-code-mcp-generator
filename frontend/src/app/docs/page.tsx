"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Book,
    Zap,
    Code2,
    Settings,
    Terminal,
    FileJson,
    ArrowLeft,
    Copy,
    Check,
    ChevronRight,
    ExternalLink,
    Menu,
    X
} from "lucide-react";

// Sidebar navigation structure
const sidebarSections = [
    {
        title: "Getting Started",
        items: [
            { id: "introduction", label: "Introduction", icon: Book },
            { id: "quick-start", label: "Quick Start", icon: Zap },
            { id: "installation", label: "Installation", icon: Terminal },
        ],
    },
    {
        title: "Core Concepts",
        items: [
            { id: "openapi-specs", label: "OpenAPI Specs", icon: FileJson },
            { id: "mcp-protocol", label: "MCP Protocol", icon: Code2 },
            { id: "tool-generation", label: "Tool Generation", icon: Settings },
        ],
    },
];

function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 rounded-xl overflow-hidden shadow-lg border border-slate-700/50">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700/50">
                <span className="text-xs font-medium text-slate-400 font-mono">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <pre className="p-5 bg-slate-950 overflow-x-auto">
                <code className="text-sm text-slate-300 font-mono leading-relaxed">{code}</code>
            </pre>
        </div>
    );
}

function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: React.ReactNode }) {
    const config = {
        info: { bg: "bg-blue-500/10", border: "border-blue-500/30", icon: "💡", text: "text-blue-200" },
        warning: { bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "⚠️", text: "text-amber-200" },
        tip: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "✨", text: "text-emerald-200" },
    };
    const style = config[type];

    return (
        <div className={`my-8 p-5 rounded-xl ${style.bg} border ${style.border}`}>
            <p className={`text-sm font-medium leading-relaxed ${style.text}`}>
                <span className="mr-2">{style.icon}</span>
                {children}
            </p>
        </div>
    );
}

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState("introduction");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div
            className="min-h-screen"
            style={{
                background: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >
            {/* Header */}
            <header
                className="fixed top-0 left-0 right-0 h-16 z-50 border-b border-white/10"
                style={{ background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(12px)" }}
            >
                <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        <Link
                            href="/"
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Home</span>
                        </Link>

                        <div className="h-5 w-px bg-white/10 hidden sm:block" />

                        <div className="hidden sm:flex items-center gap-3">
                            <div
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-white font-bold text-sm"
                                style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                            >
                                M
                            </div>
                            <span className="font-semibold text-white text-lg tracking-tight">Docs</span>
                        </div>
                    </div>

                    <a
                        href="https://github.com/modelcontextprotocol"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        GitHub
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </header>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Layout Container */}
            <div className="flex pt-16">
                {/* Sidebar */}
                <aside
                    className={`
            fixed lg:sticky top-16 left-0 z-40 
            w-72 h-[calc(100vh-4rem)] 
            border-r border-white/10 
            overflow-y-auto 
            transition-transform duration-300 ease-out
            lg:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
                    style={{ background: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(12px)" }}
                >
                    <nav className="p-6 space-y-8">
                        {sidebarSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = activeSection === item.id;
                                        return (
                                            <li key={item.id}>
                                                <button
                                                    onClick={() => {
                                                        setActiveSection(item.id);
                                                        setSidebarOpen(false);
                                                    }}
                                                    className={`
                            w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all
                            ${isActive
                                                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                                        }
                          `}
                                                >
                                                    <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : ""}`} />
                                                    {item.label}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 lg:ml-0">
                    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12">
                        <AnimatePresence mode="wait">
                            <motion.article
                                key={activeSection}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="prose prose-invert max-w-none"
                            >
                                {activeSection === "introduction" && (
                                    <>
                                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                            Introduction
                                        </h1>
                                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                                            MCP Generator transforms your OpenAPI specifications into production-ready
                                            Model Context Protocol servers, enabling AI agents to interact with your APIs seamlessly.
                                        </p>

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-4 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">1</span>
                                            What is MCP?
                                        </h2>
                                        <p className="text-slate-300 leading-relaxed mb-6">
                                            The <strong className="text-white">Model Context Protocol (MCP)</strong> is an open standard that enables AI models
                                            like Claude to securely interact with external tools and data sources. It provides a
                                            structured way for AI agents to call APIs, read files, and perform actions in the real world.
                                        </p>

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-4 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">2</span>
                                            Why MCP Generator?
                                        </h2>
                                        <ul className="space-y-4 mb-6">
                                            {[
                                                { title: "Zero Boilerplate", desc: "Upload your OpenAPI spec, download a working server" },
                                                { title: "Type-Safe", desc: "Full TypeScript with Zod validation" },
                                                { title: "Production Ready", desc: "Works with Claude Desktop, Cursor, and custom agents" },
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                                    <ChevronRight className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <strong className="text-white block mb-1">{item.title}</strong>
                                                        <span className="text-slate-400 text-sm">{item.desc}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <Callout type="tip">
                                            New to MCP? Check out the official Model Context Protocol documentation to learn the fundamentals.
                                        </Callout>
                                    </>
                                )}

                                {activeSection === "quick-start" && (
                                    <>
                                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                            Quick Start
                                        </h1>
                                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                                            Get your first MCP server running in under 5 minutes.
                                        </p>

                                        <div className="space-y-10">
                                            <div>
                                                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">1</span>
                                                    Upload Your Spec
                                                </h2>
                                                <p className="text-slate-300 ml-11">
                                                    Navigate to the homepage and upload your OpenAPI specification (JSON or YAML format).
                                                </p>
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">2</span>
                                                    Download the Server
                                                </h2>
                                                <p className="text-slate-300 ml-11">
                                                    Click &quot;Generate Server&quot; and download the generated project as a ZIP file.
                                                </p>
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">3</span>
                                                    Install & Run
                                                </h2>
                                                <p className="text-slate-300 ml-11 mb-4">Extract the ZIP and run:</p>
                                                <CodeBlock
                                                    language="bash"
                                                    code={`cd my-mcp-server
npm install
npm start`}
                                                />
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">4</span>
                                                    Connect to Claude
                                                </h2>
                                                <p className="text-slate-300 ml-11 mb-4">Add to your Claude Desktop config:</p>
                                                <CodeBlock
                                                    language="json"
                                                    code={`{
  "mcpServers": {
    "my-api": {
      "command": "node",
      "args": ["path/to/my-mcp-server/dist/index.js"]
    }
  }
}`}
                                                />
                                            </div>
                                        </div>

                                        <Callout type="info">
                                            Restart Claude Desktop after updating the configuration for changes to take effect.
                                        </Callout>
                                    </>
                                )}

                                {activeSection === "installation" && (
                                    <>
                                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                            Installation
                                        </h1>
                                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                                            Requirements and setup instructions for your generated MCP server.
                                        </p>

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Prerequisites</h2>
                                        <div className="grid gap-3 mb-8">
                                            {["Node.js 18+ (LTS recommended)", "npm or yarn package manager", "Claude Desktop or compatible MCP client"].map((req, i) => (
                                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                                    <span className="text-slate-300">{req}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Install Dependencies</h2>
                                        <CodeBlock language="bash" code="npm install" />

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Environment Variables</h2>
                                        <p className="text-slate-300 mb-4">
                                            Create a <code className="px-2 py-1 rounded bg-slate-800 text-blue-300 text-sm font-mono">.env</code> file:
                                        </p>
                                        <CodeBlock
                                            language="bash"
                                            code={`API_BASE_URL=https://api.example.com
API_KEY=your-api-key-here`}
                                        />

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Build & Start</h2>
                                        <CodeBlock
                                            language="bash"
                                            code={`npm run build
npm start`}
                                        />
                                    </>
                                )}

                                {activeSection === "openapi-specs" && (
                                    <>
                                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                            OpenAPI Specifications
                                        </h1>
                                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                                            Learn how your OpenAPI spec is transformed into MCP tools.
                                        </p>

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Supported Formats</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                            {["OpenAPI 3.0.x", "OpenAPI 3.1.x", "Swagger 2.0"].map((format, i) => (
                                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                                    <span className="text-white font-medium">{format}</span>
                                                    <span className="block text-slate-500 text-sm mt-1">JSON or YAML</span>
                                                </div>
                                            ))}
                                        </div>

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Endpoint Mapping</h2>
                                        <p className="text-slate-300 mb-4">Each endpoint becomes an MCP tool:</p>
                                        <CodeBlock
                                            language="yaml"
                                            code={`paths:
  /users/{id}:
    get:
      operationId: getUser
      summary: Get user by ID`}
                                        />
                                        <p className="text-slate-300 mb-4">Becomes:</p>
                                        <CodeBlock
                                            language="typescript"
                                            code={`server.tool("getUser", "Get user by ID", 
  { id: z.string() },
  async ({ id }) => fetch(\`/users/\${id}\`)
);`}
                                        />
                                    </>
                                )}

                                {activeSection === "mcp-protocol" && (
                                    <>
                                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                            MCP Protocol
                                        </h1>
                                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                                            Understanding the Model Context Protocol.
                                        </p>

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">How It Works</h2>
                                        <div className="space-y-3 mb-8">
                                            {[
                                                "AI model discovers available tools from MCP server",
                                                "Model sends tool call request with parameters",
                                                "MCP server validates and executes the action",
                                                "Results returned in structured format",
                                            ].map((step, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-slate-300">{step}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Callout type="info">
                                            MCP servers communicate via stdio, making them compatible with any client that supports the protocol.
                                        </Callout>

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Compatible Clients</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {["Claude Desktop", "Cursor IDE", "Custom Clients"].map((client, i) => (
                                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-white font-medium">
                                                    {client}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {activeSection === "tool-generation" && (
                                    <>
                                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                            Tool Generation
                                        </h1>
                                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                                            How MCP Generator creates type-safe tools from your API.
                                        </p>

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Type Safety with Zod</h2>
                                        <p className="text-slate-300 mb-4">All tools use Zod schemas for runtime validation:</p>
                                        <CodeBlock
                                            language="typescript"
                                            code={`import { z } from "zod";

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["admin", "user"]).optional(),
});

server.tool("createUser", CreateUserSchema, 
  async (params) => {
    // params is fully typed!
    return api.createUser(params);
  }
);`}
                                        />

                                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Error Handling</h2>
                                        <p className="text-slate-300 mb-4">Built-in validation errors:</p>
                                        <CodeBlock
                                            language="json"
                                            code={`{
  "isError": true,
  "content": [{
    "type": "text",
    "text": "Validation failed: email must be valid"
  }]
}`}
                                        />

                                        <Callout type="warning">
                                            Always validate your OpenAPI spec before uploading to ensure accurate tool generation.
                                        </Callout>
                                    </>
                                )}
                            </motion.article>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}
