"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  ExternalLink,
  Box,
  Terminal,
  Share2,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl mx-auto"
    >
      {/* Success Notification */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] mb-6 ring-1 ring-[var(--brand-cyan)]/20"
        >
          <CheckCircle className="w-8 h-8" />
        </motion.div>
        <h2 className="heading-2 text-white mb-2">
          Generation Complete
        </h2>
        <p className="text-[var(--text-secondary)]">
          Your MCP server is ready for production.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-[var(--surface-1)] border border-[var(--border-default)] mb-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--surface-2)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{result.info.title}</h3>
              <p className="text-sm text-[var(--text-muted)] font-mono">v{result.info.version}</p>
            </div>
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand-cyan)] bg-[var(--brand-cyan)]/10 border border-[var(--brand-cyan)]/20">
              MCP Ready
            </span>
          </div>
        </div>

        {/* content */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--surface-0)] border border-[var(--border-subtle)]">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">Tools Generated</div>
            <div className="text-3xl font-bold text-white">{result.toolCount}</div>
          </div>
          <div className="p-4 bg-[var(--surface-0)] border border-[var(--border-subtle)]">
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">Language</div>
            <div className="flex items-center gap-2 text-white font-medium">
              <Box className="w-4 h-4 text-[var(--brand-blue)]" />
              TypeScript
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[var(--border-subtle)] flex gap-4">
          <a
            href={downloadUrl}
            className="flex-1 btn btn-brand flex justify-center items-center"
          >
            <Download className="w-4 h-4" />
            Download Project
          </a>
          <button
            onClick={onReset}
            className="px-4 py-2 border border-[var(--border-default)] hover:bg-[var(--surface-2)] text-white transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Next Steps
        </h4>
        <StepItem
          icon={<Terminal className="w-4 h-4 text-[var(--brand-orange)]" />}
          label="Install & Run"
          code="npm install && npm start"
        />
        <StepItem
          icon={<Share2 className="w-4 h-4 text-[var(--brand-cyan)]" />}
          label="Connect to Claude"
          code="npx @modelcontextprotocol/inspector"
        />
      </div>
    </motion.div>
  );
}

function StepItem({ icon, label, code }: { icon: React.ReactNode, label: string, code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-[var(--surface-1)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors group">
      <div className="w-8 h-8 flex items-center justify-center bg-[var(--surface-2)] border border-[var(--border-subtle)]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white mb-1">{label}</div>
        <div className="font-mono text-xs text-[var(--text-secondary)] truncate">{code}</div>
      </div>
      <button
        onClick={copy}
        className="p-2 text-[var(--text-muted)] hover:text-white transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-[var(--success)]" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  )
}
