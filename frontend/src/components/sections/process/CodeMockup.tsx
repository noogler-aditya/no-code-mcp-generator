"use client";

import { motion } from "framer-motion";

export function CodeMockup() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
        >
            {/* 
        Background Glow using the specific gradient colors 
        Cyan -> Blue -> Pink
      */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[var(--brand-cyan)]/20 via-[var(--brand-blue)]/20 to-[var(--brand-pink)]/20 blur-2xl opacity-40" />

            <div className="relative rounded-lg border border-[var(--border-default)] bg-[#0d0d0f] shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-default)] bg-[#1a1a1c]">
                    <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="ml-2 text-xs font-mono text-[var(--text-muted)]">src/server.ts</span>
                </div>

                {/* Code */}
                <div className="p-6 overflow-x-auto font-mono text-sm">
                    <pre className="text-[var(--text-secondary)]">
                        <code>
                            <span className="text-[#c792ea]">import</span> <span className="text-[#ffd700]">{`{ McpServer }`}</span> <span className="text-[#c792ea]">from</span> <span className="text-[#89ddff]">{`"@modelcontextprotocol/sdk"`}</span>;<br /><br />
                            <span className="text-[#546e7a] italic">{`// Generated from OpenAPI spec`}</span><br />
                            <span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">server</span> = <span className="text-[#c792ea]">new</span> <span className="text-[#ffcb6b]">McpServer</span>({`{`}<br />
                            &nbsp;&nbsp;<span className="text-[#f07178]">name</span>: <span className="text-[#c3e88d]">"weather-agent"</span>,<br />
                            &nbsp;&nbsp;<span className="text-[#f07178]">version</span>: <span className="text-[#c3e88d]">"1.0.0"</span><br />
                            {`}`});<br /><br />
                            <span className="text-[#82aaff]">server</span>.<span className="text-[#82aaff]">tool</span>(<br />
                            &nbsp;&nbsp;<span className="text-[#c3e88d]">"get_forecast"</span>,<br />
                            &nbsp;&nbsp;<span className="text-[#c792ea]">async</span> ({`{ city }`}) {`=>`} {`{`}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">data</span> = <span className="text-[#c792ea]">await</span> <span className="text-[#82aaff]">api</span>.<span className="text-[#82aaff]">fetch</span>(city);<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c792ea]">return</span> <span className="text-[#82aaff]">format</span>(data);<br />
                            &nbsp;&nbsp;{`}`}<br />
                            );
                        </code>
                    </pre>
                </div>
            </div>

            {/* Floating Status Badge */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-5 -right-5 bg-[var(--surface-1)] border border-[var(--border-default)] px-4 py-2 flex items-center gap-2 shadow-xl"
            >
                <span className="w-2 h-2 rounded-full bg-[var(--brand-cyan)] animate-pulse" />
                <span className="text-sm font-medium text-white">Full Type Safety</span>
            </motion.div>
        </motion.div>
    );
}
