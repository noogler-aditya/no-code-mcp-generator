"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group relative">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-white/5"
          >
            M
          </motion.div>
          <span className="font-outfit font-semibold text-lg tracking-tight text-white/90 group-hover:text-white transition-colors">
            MCP Gen
          </span>
        </Link>

        {/* Navigation - Centered & Clean */}
        <nav className="hidden md:flex items-center gap-1">
          {["Features", "How it Works", "Docs"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/5 group"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Actions Area */}
        <div className="flex items-center gap-4">
          <motion.a
            href="https://github.com/modelcontextprotocol"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all"
          >
            <Github className="w-4 h-4" />
            <span>Star on GitHub</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full overflow-hidden shadow-lg shadow-white/10 hover:shadow-white/20 transition-all"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span className="relative flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
