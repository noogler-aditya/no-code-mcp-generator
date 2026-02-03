"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/motion";

export default function Testimonials() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Teams trust us</p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Built for engineering and security leaders.
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                whileHover={hoverLift}
                className="rounded-3xl border border-line bg-white/70 p-6 shadow-soft"
              >
                <Quote className="h-5 w-5 text-muted" />
                <p className="mt-4 text-sm text-ink">{item.quote}</p>
                <div className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">
                  {item.name} · {item.role}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
