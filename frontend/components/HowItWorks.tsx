"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Upload, Wand2 } from "lucide-react";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/motion";

const steps = [
  {
    title: "Upload your spec",
    description: "Drag in JSON or YAML, we validate and parse instantly.",
    icon: Upload
  },
  {
    title: "Generate MCP tools",
    description: "We map endpoints to typed tools with auth injection.",
    icon: Wand2
  },
  {
    title: "Deploy with confidence",
    description: "Download the server and run locally or via tunnel.",
    icon: CheckCircle2
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24" id="how-it-works">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="space-y-10"
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">How it works</p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Three steps to a production MCP server.
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  whileHover={hoverLift}
                  className="rounded-3xl border border-line bg-white/70 p-6 shadow-soft"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper">
                    <Icon className="h-5 w-5 text-ink" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
