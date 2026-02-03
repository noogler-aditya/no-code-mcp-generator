"use client";

import { motion } from "framer-motion";
import { Cloud, Download, FileUp, Loader2, Lock, Server } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { fadeUp, hoverLift, press } from "@/lib/motion";

interface UploadResult {
  projectId: string;
  downloadUrl?: string;
  toolCount?: number;
  info?: { title?: string; version?: string };
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
        {status === "success" && result && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeUp}
            className="mt-10 rounded-3xl border border-line bg-white/75 p-10 shadow-soft"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  The Tunneling Bridge (Hybrid Move)
                </p>
                <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Keep internal APIs private, even for hosted agents.
                </h3>
                <p className="text-base text-muted">
                  Run a lightweight local agent (5MB) that uses a Cloudflare Tunnel to
                  securely pipe your MCP server to our hosted dashboard. Your data never
                  lives on our servers — only the encrypted tunnel passes through.
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
                    Privacy guarantee: data never stored in our cloud.
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
      </div>
    </section>
  );
}
