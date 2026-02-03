import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useProcessFlow } from "@/hooks/useProcessFlow";
import { StepCard } from "./StepCard";
import { CodeMockup } from "./CodeMockup";

export function HowItWorksSection() {
  const { steps } = useProcessFlow();

  return (
    <Section
      id="how-it-works"
      className="bg-gradient-to-b from-[#050505] to-black"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none opacity-50" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-8 leading-[1.1] tracking-tight text-white">
              From JSON to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Running Server
              </span>
              <br /> in 3 Steps
            </h2>
            <p className="text-zinc-400 text-lg mb-12 leading-relaxed max-w-lg">
              Our engine parses your OpenAPI schema, maps endpoints to MCP
              tools, and generates a scaffolded project ready for deployment.
            </p>

            <div className="space-y-6">
              <ol className="list-none m-0 p-0">
                {steps.map((step) => (
                  <li key={step.number}>
                    <StepCard {...step} />
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          <CodeMockup />
        </div>
      </Container>
    </Section>
  );
}
