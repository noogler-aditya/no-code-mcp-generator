import { Zap, Shield, Code2, Cpu } from 'lucide-react';


export function FeaturesSection() {
    return (
        <section id="features" className="py-24 px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6 tracking-tight text-balance">Built for Modern Engineering</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed text-balance">
                        Stop writing boilerplate tool definitions. Let us handle the heavy lifting while you focus on building great agents.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
                    {/* Large Card - Spans 2 cols */}
                    <div className="md:col-span-2 p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.04] transition-all duration-300 group relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-500/15 transition-all" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold font-outfit mb-3 text-white">Instant Generation</h3>
                            <p className="text-zinc-400 leading-relaxed max-w-lg text-sm md:text-base">
                                Upload your spec and get a fully typed, runnable server in milliseconds. We handle complex nested schemas, authentication types, and parameter mapping automatically.
                            </p>
                        </div>
                    </div>

                    {/* Tall Card - Spans 1 col, 2 rows */}
                    <div className="md:row-span-2 p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.04] transition-all duration-300 group relative overflow-hidden flex flex-col">
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 group-hover:bg-purple-500/15 transition-all" />

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold font-outfit mb-3 text-white">MCP Standard</h3>
                            <p className="text-zinc-400 leading-relaxed mb-6 text-sm md:text-base flex-grow">
                                Fully compliant with the Model Context Protocol. Your generated servers are instantly compatible with:
                            </p>
                            <ul className="space-y-4 text-zinc-500 text-sm font-medium">
                                <li className="flex items-center gap-3">
                                    <span className="flex h-2 w-2 rounded-full bg-purple-400 ring-4 ring-purple-400/10"></span>
                                    Claude Desktop
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="flex h-2 w-2 rounded-full bg-purple-400 ring-4 ring-purple-400/10"></span>
                                    Cursor IDE
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="flex h-2 w-2 rounded-full bg-purple-400 ring-4 ring-purple-400/10"></span>
                                    Custom Agents
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Small Card 1 */}
                    <div className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden flex flex-col justify-center">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-2 text-white">Secure by Default</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Built-in validation ensures secure exposure of internal APIs.
                        </p>
                    </div>

                    {/* Small Card 2 */}
                    <div className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden flex flex-col justify-center">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 text-orange-400">
                            <Code2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-2 text-white">Type-Safe</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            100% TypeScript with Zod schemas for runtime safety.
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}
