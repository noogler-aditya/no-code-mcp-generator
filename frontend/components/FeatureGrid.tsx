"use client";

import { motion } from "framer-motion";
import { Cloud, Sparkles, Wand2, ShieldCheck } from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/motion";

const icons = [Sparkles, Wand2, ShieldCheck, Cloud];

export default function FeatureGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="space-y-10"
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Capabilities</p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Everything you need to ship MCP servers securely.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {FEATURES.map((feature, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  whileHover={hoverLift}
                  className="rounded-3xl border border-line bg-white/70 p-6 shadow-soft"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper">
                    <Icon className="h-5 w-5 text-ink" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
