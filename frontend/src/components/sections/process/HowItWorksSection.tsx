export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-24 px-6 md:px-8 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-8 leading-[1.1] tracking-tight">
                            From JSON to <br />
                            <span className="text-blue-500">Running Server</span>
                            <br /> in 3 Steps
                        </h2>
                        <p className="text-zinc-400 text-lg mb-12 leading-relaxed max-w-lg">
                            Our engine parses your OpenAPI schema, maps endpoints to MCP tools, and generates a scaffolded project ready for deployment.
                        </p>

                        <div className="space-y-10">
                            <Step
                                number="01"
                                title="Upload Spec"
                                desc="Drag and drop your swagger.json or openapi.yaml file."
                            />
                            <Step
                                number="02"
                                title="Generate Code"
                                desc="We automatically type major endpoints and create tool definitions."
                            />
                            <Step
                                number="03"
                                title="Connect Agent"
                                desc="Run the server locally and connect it to Claude or custom agents."
                            />
                        </div>
                    </div>

                    <div className="relative mt-12 lg:mt-0">
                        {/* Code Preview Mockup */}
                        <div className="rounded-2xl border border-white/[0.08] bg-[#0F0F11]/80 shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-md">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-white/[0.02]">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                </div>
                                <div className="ml-4 text-xs text-white/30 font-mono tracking-wide">src/server.ts</div>
                            </div>
                            <div className="p-6 md:p-8 overflow-x-auto">
                                <pre className="font-mono text-xs md:text-sm leading-relaxed text-gray-300">
                                    <code>
                                        <span className="text-purple-400">import</span> {'{ McpServer }'} <span className="text-purple-400">from</span> <span className="text-green-400">&quot;@modelcontextprotocol/sdk&quot;</span>;{'\n\n'}

                                        <span className="text-gray-500 italic">{'// Generated Tool Definition'}</span>{'\n'}
                                        <span className="text-blue-400">server</span>.tool({'\n'}
                                        {'  '}<span className="text-green-400">&quot;get_user_data&quot;</span>,{'\n'}
                                        {'  '}<span className="text-yellow-300">{'{ userId: z.string() }'}</span>,{'\n'}
                                        {'  '}<span className="text-purple-400">async</span> ({'{ userId }'}) ={'>'} {'{'}{'\n'}
                                        {'    '}<span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> db.find(userId);{'\n'}
                                        {'    '}<span className="text-purple-400">return</span> {'{ content: [{ type: "text", text: JSON.stringify(data) }] }'};{'\n'}
                                        {'  '}{'}'}{'\n'}
                                        );
                                    </code>
                                </pre>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-8 -right-8 bg-blue-600/10 backdrop-blur-xl border border-blue-500/20 p-6 rounded-2xl animate-bounce-slow hidden md:block">
                            <div className="text-blue-400 font-bold text-3xl mb-1">100%</div>
                            <div className="text-blue-200/50 text-xs font-medium uppercase tracking-wider">Type Coverage</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="flex gap-6 group">
            <div className="font-outfit font-bold text-3xl text-white/10 group-hover:text-blue-500/20 transition-colors duration-300">{number}</div>
            <div className="pt-1">
                <h4 className="text-lg font-semibold font-outfit text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
