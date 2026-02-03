"use client";

import { motion } from "framer-motion";
import { Download, FileUp, Loader2 } from "lucide-react";
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
      </div>
    </section>
  );
}
