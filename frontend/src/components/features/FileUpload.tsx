"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileJson, X } from "lucide-react";

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
                    relative group cursor-pointer border-2 border-dashed rounded-2xl p-12
                    flex flex-col items-center justify-center text-center transition-all duration-300
                    ${
                      isDragging
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
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

            <div
              className={`
                    p-4 rounded-full mb-6 transition-colors duration-300
                    ${isDragging ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10"}
                `}
            >
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-medium text-white mb-2">
              {isDragging ? "Drop file here" : "Upload API Specification"}
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Drag and drop your OpenAPI/Swagger JSON or YAML file here, or
              click to browse.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <FileJson className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-white">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
