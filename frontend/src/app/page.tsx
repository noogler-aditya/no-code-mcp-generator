"use client";

import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/sections/hero/HeroSection";
import { FeaturesSection } from "../components/sections/features/FeaturesSection";
import { HowItWorksSection } from "../components/sections/process/HowItWorksSection";
import { FileUpload } from "../components/features/FileUpload";
import { ResultsDisplay } from "../components/features/ResultsDisplay";

interface ResultType {
  downloadUrl: string;
  info: {
    title: string;
    version: string;
  };
  toolCount: number;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("spec", file);

    try {
      const response = await fetch(
        "/api/generator/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-white flex flex-col font-sans selection:bg-[var(--primary-500)]/30">
      <Header />

      <main className="flex-1">
        <HeroSection>
          {!result ? (
            <div className="bg-[var(--surface-0)] border border-[var(--border-default)] p-4 md:p-6 lg:p-8">
              <FileUpload
                onFileSelect={setFile}
                selectedFile={file}
                onClear={() => setFile(null)}
              />

              <div className="mt-8">
                <button
                  onClick={handleSubmit}
                  disabled={!file || loading}
                  className={`
                    w-full flex items-center justify-center gap-3 py-4 text-sm font-semibold uppercase tracking-wide transition-all duration-300
                    ${!file || loading
                      ? "bg-[var(--surface-2)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-subtle)]"
                      : "btn-brand hover:shadow-[var(--shadow-glow-mixed)]"
                    }
                  `}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <span>Generate Server</span>
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <ResultsDisplay
              result={result}
              onReset={() => {
                setResult(null);
                setFile(null);
              }}
            />
          )}
        </HeroSection>

        <FeaturesSection />

        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
}
