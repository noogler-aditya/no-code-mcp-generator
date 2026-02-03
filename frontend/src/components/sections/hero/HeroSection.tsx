"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <Section className="flex flex-col items-center justify-center min-h-[90vh]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[20%] left-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <Container className="relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8 hover:bg-white/[0.05] transition-colors cursor-default">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-sm font-medium text-blue-100/80">
              Support for Swagger 2.0 & OpenAPI 3.0
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold font-outfit tracking-tight mb-8 leading-[0.95] text-balance">
            Legacy API to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient">
              Intelligent Agent
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed font-light text-balance">
            Instantly transform your existing OpenAPI documentation into a
            production-ready{" "}
            <strong className="text-zinc-200 font-medium">
              Model Context Protocol (MCP)
            </strong>{" "}
            server. No code required.
          </p>
        </motion.div>

        {/* File Upload Component Injection Point */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full max-w-2xl mx-auto"
        >
          {children}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 pt-10 border-t border-white/5"
        >
          <p className="text-sm text-white/30 uppercase tracking-widest mb-6">
            Trusted by developers at
          </p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-30">
            {/* Simple text placeholders for logos to keep it clean */}
            <span className="text-xl font-bold">ACME Corp</span>
            <span className="text-xl font-bold">GlobalTech</span>
            <span className="text-xl font-bold">DevSystems</span>
            <span className="text-xl font-bold">AI Foundry</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
