"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ShieldCheck } from "lucide-react";
import { fadeUp, staggerContainer, hoverLift, press } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-24 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2 text-sm text-muted shadow-soft">
              <ShieldCheck className="h-4 w-4 text-sage" />
              Secure MCP generation for enterprise AI agents
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Turn any OpenAPI spec into a secure MCP server in minutes.
            </h1>
            <p className="max-w-xl text-lg text-muted">
              No-Code MCP Generator gives your agents type-safe tools, auth injection, and rate
              limiting with a single upload. Built for teams that care about safety and speed.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href="#get-started"
                whileHover={hoverLift}
                whileTap={press}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper shadow-soft"
              >
                Get Started
                <ArrowDownRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#process"
                whileHover={hoverLift}
                whileTap={press}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-6 py-3 text-sm font-medium text-ink"
              >
                See the process
              </motion.a>
            </div>
            <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-muted">
              <span>Auth injection</span>
              <span>Rate limiting</span>
              <span>Hybrid tunnels</span>
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="relative rounded-3xl border border-line bg-white/70 p-8 shadow-soft"
          >
            <div className="space-y-6">
              <div className="text-sm text-muted">Generated MCP Server Preview</div>
              <div className="rounded-2xl border border-line bg-paper/80 p-6 font-mono text-xs text-ink">
                <p className="text-muted">POST /tools</p>
                <p className="mt-3">• schema: z.object()</p>
                <p>• auth: bearer injected</p>
                <p>• rateLimiter: 5 req/hour</p>
                <p className="mt-3 text-muted">status: ready</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Spec coverage", value: "98%" },
                  { label: "Latency budget", value: "< 200ms" }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-line bg-white/80 px-4 py-3"
                  >
                    <div className="text-xs text-muted">{item.label}</div>
                    <div className="text-lg font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
