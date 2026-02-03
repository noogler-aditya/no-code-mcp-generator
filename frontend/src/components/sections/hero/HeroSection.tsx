"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative min-h-screen pt-48 pb-20 flex flex-col items-center justify-center">

      {/* 
        Body has the background gradient. 
        We just need to ensure content sits nicely on top.
      */}

      <Container className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto text-center mt-12 md:mt-0 flex flex-col items-center">

          {/* Main Headline - Golden Ratio Scale (approx 1.618x steps) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold mb-10 text-slate-900 tracking-tight leading-[1.1] max-w-4xl"
          >
            Transform your APIs into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
              intelligent agents
            </span>
          </motion.h1>

          {/* Subheadline - Golden Ratio Line Width (~65ch) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
          >
            Upload your OpenAPI specification and instantly generate a production-ready{" "}
            <strong>Model Context Protocol</strong> server.
            <br className="hidden md:block" /> No manual coding required.
          </motion.p>

          {/* Interactive Area (File Upload) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-xl mx-auto mb-20 shadow-2xl shadow-cyan-900/10 rounded-lg"
          >
            {children}
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
