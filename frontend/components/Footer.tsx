export default function Footer() {
  return (
    <footer className="border-t border-line bg-white/70">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="text-sm font-semibold text-ink">No-Code MCP Generator</div>
          <p className="mt-2 text-sm text-muted">
            Enterprise-grade MCP servers from OpenAPI specs. Secure by default and ready for
            production agent workflows.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Product
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm text-ink">
            <a href="#process">Process</a>
            <a href="#how-it-works">How it works</a>
            <a href="#get-started">Get started</a>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Resources
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm text-ink">
            <a href="#">Docs</a>
            <a href="#">Security</a>
            <a href="#">Status</a>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Company
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm text-ink">
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 No-Code MCP Generator. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
