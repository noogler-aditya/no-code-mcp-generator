"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Code2, Cpu } from "lucide-react";
import { Container } from "@/components/ui/Container";

const features = [
  {
    icon: Zap,
    color: "var(--brand-cyan)",
    title: "Instant Generation",
    desc: "Upload your spec and get a fully typed, runnable server in milliseconds. We handle complex schema mapping automatically."
  },
  {
    icon: Shield,
    color: "var(--brand-blue)",
    title: "Type-Safe & Secure",
    desc: "Built-in Zod validation means your agents can't hallucinate invalid parameters. 100% TypeScript safety."
  },
  {
    icon: Cpu,
    color: "var(--brand-pink)",
    title: "MCP Standard",
    desc: "Fully compliant with the Model Context Protocol. Works instantly with Claude Desktop, Cursor, and custom agents."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <Container>
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-1 mb-6 text-slate-900"
          >
            Built for the <span className="text-slate-900 underline decoration-4 decoration-blue-500/30 underline-offset-4">Agentic Future</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-700 font-medium"
          >
            We handle the heavy lifting while you focus on building great agents.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="bg-white/60 backdrop-blur-xl border border-white/40 p-8 hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div
                className="mb-6 w-12 h-12 flex items-center justify-center bg-white border border-white/50 shadow-sm rounded-sm"
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>

              <h3 className="heading-3 mb-4 text-slate-900">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
