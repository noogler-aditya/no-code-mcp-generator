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
        "http://localhost:3001/api/generator/upload",
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
    <div className="min-h-screen bg-[#050505] text-foreground flex flex-col font-inter selection:bg-blue-500/30">
      <Header />

      <main>
        <HeroSection>
          {!result ? (
            <div className="glass-panel p-2 rounded-3xl bg-black/40 border border-white/10 shadow-2xl shadow-blue-900/10 backdrop-blur-xl">
              <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent">
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
                            w-full flex items-center justify-center gap-3 py-4 text-lg font-semibold rounded-xl transition-all duration-300
                            ${
                              !file || loading
                                ? "bg-white/5 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 hover:scale-[1.02]"
                            }
                          `}
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing Spec...</span>
                      </div>
                    ) : (
                      <span>Generate Agent Server</span>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
              </div>
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
