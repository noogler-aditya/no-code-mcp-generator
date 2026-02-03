"use client";

import {
  CheckCircle,
  Download,
  ExternalLink,
  Box,
  Terminal,
  Share2,
} from "lucide-react";

interface ResultType {
  downloadUrl: string;
  info: {
    title: string;
    version: string;
  };
  toolCount: number;
}

interface ResultsDisplayProps {
  result: ResultType;
  onReset: () => void;
}

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const downloadUrl = result.downloadUrl
    ? `http://localhost:3001${result.downloadUrl}`
    : "#";

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-500/10 text-green-400 mb-4 ring-1 ring-green-500/20">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Generation Complete!
        </h2>
        <p className="text-gray-400">
          Your MCP server is ready for deployment.
        </p>
      </div>

      {/* Project Info Card */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden mb-8">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {result.info.title}
              </h3>
              <p className="text-sm text-gray-400">
                Version {result.info.version}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/20">
              MCPv1.0
            </span>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-black/20 border border-white/5">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Total Tools
            </span>
            <p className="text-3xl font-bold text-white mt-1">
              {result.toolCount}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-black/20 border border-white/5">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Project Type
            </span>
            <p className="text-lg font-bold text-white mt-1 flex items-center gap-2">
              <Box className="w-4 h-4 text-purple-400" />
              TypeScript
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex gap-4">
          <a
            href={downloadUrl}
            className="flex-1 btn-primary flex items-center justify-center gap-2 text-center"
          >
            <Download className="w-4 h-4" />
            Download Project
          </a>

          <button
            onClick={onReset}
            className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-white font-medium"
          >
            Create New
          </button>
        </div>
      </div>

      {/* Next Steps */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Deployment Pipeline
        </h3>
        <div className="space-y-4">
          <StepItem
            icon={<Terminal className="w-4 h-4 text-orange-400" />}
            title="1. Install & Run"
            code="npm install && npm start"
          />
          <StepItem
            icon={<Share2 className="w-4 h-4 text-blue-400" />}
            title="2. Start Secure Tunnel"
            code="./start-tunnel.sh"
          />
          <StepItem
            icon={<ExternalLink className="w-4 h-4 text-purple-400" />}
            title="3. Connect to Dashboard"
            code="https://app.mcp-generator.com/connect"
            isLink={true}
          />
        </div>
      </div>
    </div>
  );
}

function StepItem({
  icon,
  title,
  code,
  isLink = false,
}: {
  icon: React.ReactNode;
  title: string;
  code: string;
  isLink?: boolean;
}) {
  if (isLink) {
    return (
      <a
        href={code}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
      >
        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white mb-1">{title}</p>
          <p className="text-xs text-blue-400 group-hover:underline">
            Launch Dashboard &rarr;
          </p>
        </div>
      </a>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
      <div className="p-2 rounded-lg bg-white/5">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white mb-1">{title}</p>
        <code className="text-xs font-mono text-gray-400 bg-black/30 px-2 py-1 rounded border border-white/5">
          {code}
        </code>
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="text-xs text-gray-500 hover:text-white transition-colors"
      >
        Copy
      </button>
    </div>
  );
}
