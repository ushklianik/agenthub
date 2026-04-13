import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AgentHub — AI Agent Marketplace",
  description: "Discover and deploy the best AI agents for your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script src="/js/reveal.js"></script>
      </head>
      <body className="min-h-full flex flex-col bg-[#0f0f1a] text-slate-200">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0f1a]/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                AgentHub
              </span>
            </Link>
            <div className="flex items-center gap-8 text-sm text-slate-400">
              <Link href="/agents" className="hover:text-white transition-colors">Browse</Link>
              <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="#" className="hover:text-white transition-colors">About</Link>
              <Link
                href="#"
                className="rounded-full bg-violet-600 px-4 py-1.5 text-white hover:bg-violet-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-500">
          <p>© 2026 AgentHub, Inc. · The marketplace for AI agents.</p>
        </footer>
      </body>
    </html>
  );
}
