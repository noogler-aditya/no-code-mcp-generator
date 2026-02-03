import type { Metadata } from "next";
import { Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: false
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: false
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "No-Code MCP Generator",
    template: "%s | No-Code MCP Generator"
  },
  description:
    "Generate secure, production-ready MCP servers from any OpenAPI spec. Built for enterprise AI agents with auth injection and rate limiting.",
  applicationName: "No-Code MCP Generator",
  authors: [{ name: "Aditya" }],
  generator: "Next.js",
  keywords: [
    "secure MCP server",
    "OpenAPI to MCP",
    "auth injection",
    "rate-limited AI tools",
    "enterprise AI agent integration",
    "MCP generator",
    "AI agent tools"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "No-Code MCP Generator",
    description:
      "Turn any OpenAPI spec into a secure MCP server with auth injection and rate limiting.",
    url: "/",
    siteName: "No-Code MCP Generator",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "No-Code MCP Generator",
    description:
      "Secure, production-ready MCP servers from OpenAPI specs."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper text-ink">
        <div className="relative">
          <div className="noise" aria-hidden="true" />
          {children}
        </div>
      </body>
    </html>
  );
}
