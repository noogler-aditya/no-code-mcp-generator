"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Product", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Docs", href: "#" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border-b border-slate-200/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 flex items-center justify-center bg-slate-900 text-white rounded-lg transition-all duration-200 group-hover:bg-black group-hover:scale-105">
              <span className="font-bold text-base font-mono">M</span>
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">
              MCP Generator
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://github.com/modelcontextprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <div className="w-px h-5 bg-slate-200" />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold py-2.5 px-5 rounded-lg hover:bg-black transition-all duration-200 shadow-sm hover:shadow-md"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/50"
      >
        <div className="px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-3 px-4 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-semibold py-3 px-5 rounded-lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
