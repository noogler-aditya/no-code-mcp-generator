"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Bot, Database, Plug } from "lucide-react";
import { useRef } from "react";

const nodes = [
  {
    title: "Legacy API",
    description: "Bring your existing OpenAPI or Swagger spec.",
    icon: Database
  },
  {
    title: "MCP",
    description: "We convert endpoints into typed MCP tools.",
    icon: Plug
  },
  {
    title: "Hosted Agent",
    description: "Deploy or tunnel instantly with safety controls.",
    icon: Bot
  }
];

export default function ProcessFlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const node1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0.35, 0.9, 1]);
  const node1Scale = useTransform(scrollYProgress, [0, 0.1, 0.2], [0.9, 1.05, 1]);
  const node2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.55], [0.35, 0.9, 1]);
  const node2Scale = useTransform(scrollYProgress, [0.3, 0.45, 0.55], [0.9, 1.05, 1]);
  const node3Opacity = useTransform(scrollYProgress, [0.6, 0.8, 0.9], [0.35, 0.9, 1]);
  const node3Scale = useTransform(scrollYProgress, [0.6, 0.8, 0.9], [0.9, 1.05, 1]);

  const nodeStyles = [
    {
      opacity: node1Opacity,
      scale: node1Scale
    },
    {
      opacity: node2Opacity,
      scale: node2Scale
    },
    {
      opacity: node3Opacity,
      scale: node3Scale
    }
  ];

  return (
    <section id="process" className="relative py-24" ref={ref}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Live process</p>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Watch the flow update as you scroll.
            </h2>
            <p className="text-base text-muted">
              Our generator translates legacy APIs into secure MCP servers that run locally or
              through hosted tunnels. Each step lights up as the pipeline completes.
            </p>
          </div>

          <div className="relative min-h-[140vh]">
            <div className="sticky top-24">
              <div className="relative rounded-3xl border border-line bg-white/70 px-8 py-12 shadow-soft">
                <div className="absolute left-10 top-12 h-[calc(100%-96px)] w-px bg-line" />
                <motion.div
                  className="absolute left-10 top-12 w-px bg-sage"
                  style={{ height: prefersReduced ? "100%" : lineHeight }}
                />

                <div className="space-y-12">
                  {nodes.map((node, index) => {
                    const Icon = node.icon;
                    const style = prefersReduced
                      ? { opacity: 1, scale: 1 }
                      : { opacity: nodeStyles[index].opacity, scale: nodeStyles[index].scale };
                    return (
                      <motion.div
                        key={node.title}
                        style={style}
                        className="flex items-start gap-6"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper shadow-soft">
                          <Icon className="h-5 w-5 text-ink" />
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-ink">{node.title}</div>
                          <p className="text-sm text-muted">{node.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
