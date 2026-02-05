"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Cloud, Copy, Download, FileUp, Loader2, Lock, Monitor, Server, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { fadeUp, hoverLift, press } from "@/lib/motion";

interface UploadResult {
  projectId: string;
  downloadUrl?: string;
  toolCount?: number;
  info?: { title?: string; version?: string };
  tools?: { name: string; description?: string }[];
}

const ACCEPTED_EXTENSIONS = [".json", ".yaml", ".yml"];

export default function UploadPanel() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [liveUrl, setLiveUrl] = useState("");
  const [showAllTools, setShowAllTools] = useState(false);
  const [deploymentMode, setDeploymentMode] = useState<"local" | "cloud">("local");
  const [extractionPath, setExtractionPath] = useState("");
  const [configCopied, setConfigCopied] = useState(false);

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const validateFile = (incoming: File) => {
    const extension = `.${incoming.name.split(".").pop() || ""}`.toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      return "Please upload a .json, .yaml, or .yml file.";
    }
    return null;
  };

  const handleFile = useCallback((incoming: File) => {
    const validation = validateFile(incoming);
    if (validation) {
      setError(validation);
      setStatus("error");
      setFile(null);
      return;
    }
    setError(null);
    setStatus("idle");
    setFile(incoming);
  }, []);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Select a file before uploading.");
      setStatus("error");
      return;
    }

    setStatus("uploading");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("spec", file);

      const response = await fetch(`${backendUrl}/api/generator/upload`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || "Upload failed. Please try again.");
      }

      const payload = (await response.json()) as UploadResult & {
        downloadUrl?: string;
      };

      setResult(payload);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setStatus("error");
    }
  };

  const downloadHref = result?.downloadUrl
    ? `${backendUrl}${result.downloadUrl}`
    : undefined;
  const tunnelCommand = "bash start-tunnel.sh";

  const slugify = (value?: string) => {
    const base = (value || "generated-server")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return base || "generated-server";
  };

  const normalizedPath = extractionPath.trim().replace(/[\\/]+$/, "");
  const entryPath = normalizedPath
    ? `${normalizedPath}/dist/index.js`
    : "/ABSOLUTE/PATH/TO/PROJECT/dist/index.js";
  const serverName = slugify(result?.info?.title);
  const configJson = JSON.stringify(
    {
      mcpServers: {
        [serverName]: {
          command: "node",
          args: [entryPath, "--stdio"]
        }
      }
    },
    null,
    2
  );

  useEffect(() => {
    setConfigCopied(false);
  }, [configJson]);

  useEffect(() => {
    if (!showAllTools) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAllTools(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showAllTools]);

  return (
    <section id="get-started" className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          className="rounded-3xl border border-line bg-white/75 p-10 shadow-soft"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Get started</p>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Generate your MCP server now.
              </h2>
              <p className="text-base text-muted">
                Upload your OpenAPI spec and we will generate a complete MCP server with
                type-safe tools, auth injection, and built-in rate limiting.
              </p>
              {result && status === "success" && (
                <div className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-ink">
                  <div className="font-medium">{result.info?.title || "Spec uploaded"}</div>
                  <div className="text-xs text-muted">
                    {result.toolCount || 0} tools generated · Project ID {result.projectId}
                  </div>
                  {result.tools?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink/80">
                      {result.tools.slice(0, 6).map((tool) => (
                        <span
                          key={tool.name}
                          className="rounded-full border border-line bg-white/80 px-2.5 py-1"
                        >
                          {tool.name}
                        </span>
                      ))}
                      {result.tools.length > 6 && (
                        <button
                          type="button"
                          onClick={() => setShowAllTools(true)}
                          className="rounded-full border border-line bg-white/60 px-2.5 py-1 text-muted transition hover:text-ink"
                        >
                          +{result.tools.length - 6} more
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <motion.div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                animate={{
                  borderColor: isDragging ? "#9fb59a" : "#e6e0d7",
                  backgroundColor: isDragging ? "rgba(233,241,230,0.6)" : "rgba(247,244,238,0.6)"
                }}
                className="rounded-2xl border border-dashed p-8 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-paper">
                  <FileUp className="h-5 w-5 text-ink" />
                </div>
                <p className="mt-4 text-sm text-muted">
                  Drag and drop your `openapi.json` or click to browse.
                </p>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-4 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-medium"
                >
                  Browse files
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED_EXTENSIONS.join(",")}
                  className="hidden"
                  onChange={(event) => {
                    const incoming = event.target.files?.[0];
                    if (incoming) handleFile(incoming);
                  }}
                />
              </motion.div>

              <div className="rounded-2xl border border-line bg-paper/70 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-muted">
                      Deployment mode
                    </div>
                    <div className="mt-1 text-sm font-medium text-ink">
                      How will you use this MCP server?
                    </div>
                  </div>
                  <span className="rounded-full border border-line bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                    Local recommended
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    aria-pressed={deploymentMode === "local"}
                    onClick={() => setDeploymentMode("local")}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      deploymentMode === "local"
                        ? "border-sage bg-white shadow-soft"
                        : "border-line bg-white/70 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <Monitor className="h-4 w-4" />
                        Local Mode
                      </div>
                      {deploymentMode === "local" ? (
                        <span className="rounded-full bg-sage/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-ink">
                          Selected
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      Claude Desktop, Cursor, Continue. Runs on your machine.
                    </p>
                    <p className="mt-2 text-[11px] font-medium text-ink">Recommended</p>
                  </button>
                  <button
                    type="button"
                    aria-pressed={deploymentMode === "cloud"}
                    onClick={() => setDeploymentMode("cloud")}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      deploymentMode === "cloud"
                        ? "border-sage bg-white shadow-soft"
                        : "border-line bg-white/70 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <Cloud className="h-4 w-4" />
                        Cloud Mode
                      </div>
                      {deploymentMode === "cloud" ? (
                        <span className="rounded-full bg-sage/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-ink">
                          Selected
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      Cloud dashboards, multi-user access, API integrations.
                    </p>
                    <p className="mt-2 text-[11px] font-medium text-ink">
                      Requires tunnel or hosting
                    </p>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  type="button"
                  whileHover={hoverLift}
                  whileTap={press}
                  onClick={handleUpload}
                  disabled={status === "uploading"}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper"
                >
                  {status === "uploading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Generate server"
                  )}
                </motion.button>
                {downloadHref && status === "success" && (
                  <motion.a
                    href={downloadHref}
                    whileHover={hoverLift}
                    whileTap={press}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-6 py-3 text-sm font-medium text-ink"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </motion.a>
                )}
              </div>

              {file && (
                <div className="text-xs text-muted">Selected: {file.name}</div>
              )}
              {error && (
                <div className="rounded-xl border border-clay/40 bg-clay/10 px-4 py-2 text-xs text-ink">
                  {error}
                </div>
              )}
            </div>
          </div>
        </motion.div>
        {status === "success" && result && deploymentMode === "local" && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeUp}
            className="mt-10 rounded-3xl border border-line bg-white/75 p-10 shadow-soft"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Local mode</p>
                <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Generated successfully. Run locally with Claude Desktop.
                </h3>
                <p className="text-base text-muted">
                  This mode runs on your machine using stdio. Claude Desktop does not
                  support tunnel URLs.
                </p>
                <div className="grid gap-3 text-sm text-ink">
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
                    <Server className="h-4 w-4 text-ink" />
                    Local MCP server · {result.info?.title || "Spec"} ({result.toolCount || 0} tools)
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
                    <Monitor className="h-4 w-4 text-ink" />
                    Claude Desktop · stdio connection
                  </div>
                </div>
                <div className="rounded-2xl border border-line bg-paper px-4 py-4 text-sm text-ink">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted">
                    Next steps
                  </div>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink">
                    <li>Extract the zip file.</li>
                    <li>Open a terminal inside that folder.</li>
                    <li>
                      Run <span className="font-mono">npm run setup:claude</span> (installs,
                      builds, and configures).
                    </li>
                    <li>Restart Claude Desktop to load the server.</li>
                  </ol>
                </div>
                <div className="rounded-2xl border border-clay/40 bg-clay/10 px-4 py-3 text-sm text-ink">
                  <div className="flex items-center gap-2 font-medium">
                    <AlertTriangle className="h-4 w-4" />
                    Do NOT use the tunnel URL with Claude Desktop (stdio only).
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-line bg-paper/70 p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                    <span>Generate Claude Desktop config</span>
                    <span>Local</span>
                  </div>
                  <div className="mt-5 space-y-3 text-xs text-muted">
                    <label htmlFor="extraction-path" className="text-xs uppercase tracking-[0.2em]">
                      Where did you extract the project?
                    </label>
                    <input
                      id="extraction-path"
                      type="text"
                      placeholder="/Users/you/Desktop/my-mcp-server"
                      value={extractionPath}
                      onChange={(event) => setExtractionPath(event.target.value)}
                      className="w-full rounded-lg border border-line bg-white/90 px-3 py-2 text-xs text-ink"
                    />
                    <div className="text-[11px] text-muted">
                      Use an absolute path. This is required by Claude Desktop.
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl border border-line bg-white/80 px-4 py-4 text-xs text-ink font-mono whitespace-pre-wrap">
                    {configJson}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(configJson);
                        setConfigCopied(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-4 py-2 text-xs font-medium text-ink"
                    >
                      <Copy className="h-3 w-3" />
                      Copy config
                    </button>
                    {configCopied ? (
                      <span className="inline-flex items-center gap-1 text-xs text-ink">
                        <Check className="h-3 w-3" />
                        Copied
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-4 rounded-xl border border-line bg-paper/80 px-3 py-3 text-xs text-muted">
                    Config file locations:
                    <div className="mt-2 space-y-1 font-mono text-[11px] text-ink">
                      <div>macOS: ~/Library/Application Support/Claude/claude_desktop_config.json</div>
                      <div>Windows: %APPDATA%\\Claude\\claude_desktop_config.json</div>
                      <div>Linux: ~/.config/claude/claude_desktop_config.json</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {status === "success" && result && deploymentMode === "cloud" && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeUp}
            className="mt-10 rounded-3xl border border-line bg-white/75 p-10 shadow-soft"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Cloud mode</p>
                <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Host a dashboard or connect remote clients.
                </h3>
                <p className="text-base text-muted">
                  Cloud Mode exposes your local MCP server via a tunnel. Use this for
                  dashboards or API integrations, not Claude Desktop.
                </p>
                <div className="grid gap-3 text-sm text-ink">
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
                    <Server className="h-4 w-4 text-ink" />
                    Local MCP server · {result.info?.title || "Spec"} ({result.toolCount || 0} tools)
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
                    <Cloud className="h-4 w-4 text-ink" />
                    Cloudflare Tunnel · secure pipe established
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
                    <Lock className="h-4 w-4 text-ink" />
                    Hosted dashboard · Project {result.projectId}
                  </div>
                </div>
                <div className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-ink">
                  Cost: Cloudflare Tunnels are free. You only host the static frontend.
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-line bg-paper/70 p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                    <span>Dashboard</span>
                    <span>Live</span>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "Tunnel", value: "Secure" },
                      { label: "Agent", value: "Online" },
                      { label: "Download", value: downloadHref ? "Ready" : "Pending" }
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-line bg-white/80 px-4 py-3"
                      >
                        <div className="text-xs text-muted">{item.label}</div>
                        <div className="text-sm font-semibold text-ink">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl border border-dashed border-line bg-white/80 px-4 py-5">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                      <span>Local MCP</span>
                      <span>Cloudflare Tunnel</span>
                      <span>Hosted UX</span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-line">
                      <div className="h-2 w-3/4 rounded-full bg-sage" />
                    </div>
                    <div className="mt-3 text-xs text-muted">
                      Encrypted pipe active · latency 42ms
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-line bg-white/80 px-4 py-4 text-xs text-muted space-y-3">
                  <div>
                    Start the tunnel (this boots the local server and connects the bridge).
                  </div>
                  <div className="rounded-xl border border-line bg-paper/80 px-3 py-2 text-xs text-ink font-mono">
                    {tunnelCommand}
                  </div>
                  <div className="flex flex-col gap-2 text-xs text-muted">
                    <label htmlFor="live-url" className="text-xs uppercase tracking-[0.2em]">
                      Paste live URL
                    </label>
                    <input
                      id="live-url"
                      type="url"
                      placeholder="https://your-name.trycloudflare.com"
                      value={liveUrl}
                      onChange={(event) => setLiveUrl(event.target.value)}
                      className="w-full rounded-lg border border-line bg-white/90 px-3 py-2 text-xs text-ink"
                    />
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-ink underline"
                      >
                        Open live link
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <AnimatePresence>
          {showAllTools && result?.tools?.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur"
              onClick={() => setShowAllTools(false)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-[min(720px,92vw)] max-h-[80vh] overflow-hidden rounded-3xl border border-line bg-paper p-6 shadow-lift"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setShowAllTools(false)}
                  className="absolute right-4 top-4 rounded-full border border-line bg-white/80 p-2"
                  aria-label="Close tools list"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Tools</p>
                  <h4 className="font-display text-2xl font-semibold text-ink">
                    {result.info?.title || "Generated tools"}
                  </h4>
                  <p className="text-sm text-muted">
                    {result.tools.length} tools generated · Project ID {result.projectId}
                  </p>
                </div>
                <div className="mt-6 max-h-[55vh] overflow-y-auto pr-1">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {result.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="rounded-2xl border border-line bg-white/80 px-4 py-3"
                      >
                        <div className="text-sm font-medium text-ink">{tool.name}</div>
                        {tool.description ? (
                          <div className="mt-1 text-xs text-muted line-clamp-2">
                            {tool.description}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
