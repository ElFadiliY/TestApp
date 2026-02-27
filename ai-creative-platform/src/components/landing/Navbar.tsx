"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              AdGen<span className="text-primary">AI</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#templates"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Templates
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/dashboard"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-hover transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/dashboard/generate"
              className="rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              Start Free Trial
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-hover"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            <a
              href="#features"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-hover"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-hover"
            >
              How It Works
            </a>
            <a
              href="#templates"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-hover"
            >
              Templates
            </a>
            <a
              href="#pricing"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-hover"
            >
              Pricing
            </a>
            <div className="border-t border-border pt-3 mt-3 flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-center text-foreground hover:bg-surface-hover"
              >
                Log In
              </Link>
              <Link
                href="/dashboard/generate"
                className="rounded-lg gradient-bg px-3 py-2 text-sm font-semibold text-center text-white"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
