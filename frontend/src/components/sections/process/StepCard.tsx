import { motion } from "framer-motion";

interface StepCardProps {
    number: string;
    title: string;
    desc: string;
    delay: number;
}

export function StepCard({ number, title, desc, delay }: StepCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex gap-6 group hover:translate-x-2 transition-transform duration-300 ease-out p-4 -ml-4 rounded-xl hover:bg-white/[0.02]"
        >
            <div
                className="font-outfit font-bold text-3xl text-white/10 group-hover:text-blue-500/40 transition-colors duration-300"
                aria-hidden="true"
            >
                {number}
            </div>
            <div className="pt-1">
                <h3 className="text-lg font-semibold font-outfit text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs group-hover:text-zinc-400 transition-colors">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}
