"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useProcessFlow } from "@/hooks/useProcessFlow";
import { StepCard } from "./StepCard";
import { CodeMockup } from "./CodeMockup";

export function HowItWorksSection() {
  const { steps } = useProcessFlow();

  return (
    <section id="how-it-works" className="py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Steps */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="heading-1 mb-6 text-slate-900">
                From Spec to <br />
                <span className="text-slate-900">Production Server</span>
              </h2>
              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                Our engine intelligently maps your API endpoints to MCP tools, preserving descriptions and type safety.
              </p>
            </motion.div>

            <div className="space-y-0">
              {steps.map((step, index) => (
                <StepCard
                  key={step.number}
                  {...step}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Right: Visualization */}
          <div className="order-1 lg:order-2">
            <CodeMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
