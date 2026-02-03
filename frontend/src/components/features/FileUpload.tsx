"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileJson, X, Sparkles, CloudUpload } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export function FileUpload({
  onFileSelect,
  selectedFile,
  onClear,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.name.endsWith(".json") ||
        file.name.endsWith(".yaml") ||
        file.name.endsWith(".yml")
      ) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative group cursor-pointer border border-dashed rounded-none transition-all duration-300
              flex flex-col items-center justify-center py-16 px-8 bg-[var(--surface-0)]
              ${isDragging
                ? "border-[var(--brand-cyan)] bg-[var(--brand-cyan)]/5"
                : "border-[var(--border-default)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-1)]"
              }
            `}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".json,.yaml,.yml"
              onChange={(e) => {
                if (e.target.files?.[0]) onFileSelect(e.target.files[0]);
              }}
            />

            {/* Icon Area */}
            <div className={`mb-6 p-4 rounded-full border transition-all duration-300 ${isDragging ? "border-[var(--brand-cyan)] text-[var(--brand-cyan)]" : "border-[var(--border-default)] text-[var(--text-secondary)] group-hover:text-white group-hover:border-white"}`}>
              {isDragging ? <CloudUpload className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
            </div>

            <h3 className="heading-3 mb-2 text-white">
              Upload API Specification
            </h3>
            <p className="text-[var(--text-secondary)] mb-6 text-center max-w-xs">
              Drag & drop your OpenAPI JSON or YAML file
            </p>

            {/* File Types */}
            <div className="flex gap-2">
              {['.json', '.yaml', '.yml'].map(ext => (
                <span key={ext} className="text-xs font-mono px-2 py-1 border border-[var(--border-default)] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                  {ext}
                </span>
              ))}
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="file-selected"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full bg-[var(--surface-1)] border border-[var(--border-default)] p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--surface-2)] flex items-center justify-center border border-[var(--border-default)]">
                <FileJson className="w-6 h-6 text-[var(--brand-cyan)]" />
              </div>
              <div>
                <p className="font-semibold text-white">{selectedFile.name}</p>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="p-2 hover:bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
