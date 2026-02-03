"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQS } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-4xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          className="space-y-8"
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">FAQ</p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Answers before you ask.
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className="rounded-2xl border border-line bg-white/70"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-ink">{item.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted transition-transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden px-6"
                      >
                        <p className="pb-4 text-sm text-muted">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
