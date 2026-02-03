export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold font-outfit mb-4">
              MCP Generator
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering developers to bridge the gap between legacy APIs and
              modern AI agents. Built on the Model Context Protocol standard.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-gray-500">
          <p>© 2024 MCP Generator. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
