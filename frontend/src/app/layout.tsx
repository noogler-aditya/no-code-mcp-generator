import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCP Server Generator",
  description: "Turn your OpenAPI specs into MCP servers in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-background text-foreground relative overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
