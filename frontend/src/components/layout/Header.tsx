import Link from 'next/link';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-bold text-lg">
                        M
                    </div>
                    <span className="font-outfit font-semibold text-lg tracking-tight text-white group-hover:text-white/90 transition-colors">
                        MCP Generator
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
                    {['Features', 'How it Works', 'Docs', 'Pricing'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com/modelcontextprotocol"
                        target="_blank"
                        className="hidden md:block text-sm font-medium text-white/50 hover:text-white transition-colors"
                    >
                        GitHub
                    </Link>
                    <button className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}
