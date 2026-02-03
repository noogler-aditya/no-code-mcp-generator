"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, hoverLift, press } from "@/lib/motion";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          className="rounded-3xl border border-line bg-ink px-10 py-14 text-paper shadow-lift"
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-paper/60">Ready when you are</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Secure MCP servers, generated in minutes.
              </h2>
              <p className="mt-4 max-w-xl text-sm text-paper/70">
                Give your agents a reliable interface to every API with built-in safety.
              </p>
            </div>
            <motion.a
              href="#get-started"
              whileHover={hoverLift}
              whileTap={press}
              className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink"
            >
              Start building
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
