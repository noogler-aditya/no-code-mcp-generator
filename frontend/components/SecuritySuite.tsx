"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, TimerReset } from "lucide-react";
import { SECURITY_SUITE } from "@/lib/constants";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/motion";

const icons = [ShieldCheck, TimerReset, Lock];

export default function SecuritySuite() {
  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid gap-10 lg:grid-cols-[1fr_1.1fr]"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Enterprise security</p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Built to satisfy security teams from day one.
            </h2>
            <p className="text-base text-muted">
              Your agents get safe defaults: no hardcoded secrets, enforced limits, and clear
              auditing surfaces.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {SECURITY_SUITE.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={hoverLift}
                  className="rounded-3xl border border-line bg-white/70 p-6 shadow-soft"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper">
                      <Icon className="h-5 w-5 text-ink" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                      <p className="text-sm text-muted">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
