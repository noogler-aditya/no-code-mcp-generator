"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { hoverLift, press } from "@/lib/motion";

const navItems = [
  { label: "Process", href: "#process" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Get Started", href: "#get-started" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <div className="text-sm font-semibold text-ink">No-Code MCP Generator</div>
          <div className="text-xs text-muted">Enterprise-grade MCP servers from OpenAPI.</div>
        </div>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted sm:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <motion.a
          href="#get-started"
          whileHover={hoverLift}
          whileTap={press}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 text-xs font-medium text-ink"
        >
          Start
          <ArrowUpRight className="h-3.5 w-3.5" />
        </motion.a>
      </div>
    </header>
  );
}
