import { motion } from "framer-motion";

export function CodeMockup() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mt-12 lg:mt-0 group"
        >
            {/* Code Preview Mockup */}
            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/5 transition-shadow duration-500 group-hover:shadow-blue-900/20">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--surface-border)] bg-[var(--surface-1)]">
                    <div className="flex gap-2" aria-hidden="true">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm" />
                    </div>
                    <div className="ml-4 text-xs text-zinc-500 font-mono tracking-wide">
                        src/server.ts
                    </div>
                </div>
                <div className="p-6 md:p-8 overflow-x-auto bg-black/40">
                    <pre className="font-mono text-xs md:text-sm leading-relaxed text-gray-300">
                        <code>
                            <span className="text-purple-400">import</span>{" "}
                            {"{ McpServer }"}{" "}
                            <span className="text-purple-400">from</span>{" "}
                            <span className="text-green-400">
                                &quot;@modelcontextprotocol/sdk&quot;
                            </span>
                            ;{"\n\n"}
                            <span className="text-zinc-500 italic">
                                {"// Generated Tool Definition"}
                            </span>
                            {"\n"}
                            <span className="text-blue-400">server</span>.tool({"\n"}
                            {"  "}
                            <span className="text-green-400">
                                &quot;get_user_data&quot;
                            </span>
                            ,{"\n"}
                            {"  "}
                            <span className="text-yellow-300">
                                {"{ userId: z.string() }"}
                            </span>
                            ,{"\n"}
                            {"  "}
                            <span className="text-purple-400">async</span> (
                            {"{ userId }"}) ={">"} {"{"}
                            {"\n"}
                            {"    "}
                            <span className="text-purple-400">const</span> data ={" "}
                            <span className="text-purple-400">await</span>{" "}
                            db.find(userId);{"\n"}
                            {"    "}
                            <span className="text-purple-400">return</span>{" "}
                            {
                                '{ content: [{ type: "text", text: JSON.stringify(data) }] }'
                            }
                            ;{"\n"}
                            {"  "}
                            {"}"}
                            {"\n"}
                            );
                        </code>
                    </pre>
                </div>
            </div>

            {/* Floating Badge */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-8 bg-[var(--surface-elevated)] border border-blue-500/20 p-6 rounded-2xl shadow-xl shadow-blue-900/10 hidden md:block backdrop-blur-sm"
            >
                <div className="text-blue-400 font-bold text-3xl mb-1">100%</div>
                <div className="text-blue-200/50 text-xs font-medium uppercase tracking-wider">
                    Type Coverage
                </div>
            </motion.div>
        </motion.div>
    );
}
