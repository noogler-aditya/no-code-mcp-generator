"use client";

import { motion } from "framer-motion";

interface StepCardProps {
    number: string;
    title: string;
    desc: string;
    delay: number;
    isLast?: boolean;
}

export function StepCard({ number, title, desc, delay, isLast = false }: StepCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className="relative pl-12 pb-12 last:pb-0 group"
        >
            {/* Connecting Line - Darker for visibility */}
            {!isLast && (
                <div className="absolute left-[19px] top-[40px] bottom-0 w-px bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors" />
            )}

            {/* Number Badge */}
            <div className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center bg-white border border-slate-200 shadow-sm text-slate-700 font-mono text-sm font-bold z-10 transition-all duration-300 group-hover:border-black group-hover:text-black group-hover:scale-110">
                {number}
            </div>

            {/* Content */}
            <div className="pt-2">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {title}
                </h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}
