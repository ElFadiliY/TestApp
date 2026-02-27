"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Wand2,
  Image,
  Palette,
  FolderOpen,
  LayoutGrid,
  Settings,
  Sparkles,
  ChevronsLeft,
  ChevronsRight,
  HelpCircle,
  Crown,
} from "lucide-react";
import { useState } from "react";

const mainLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/generate", label: "Generate", icon: Wand2 },
  { href: "/dashboard/creatives", label: "Creatives", icon: Image },
  { href: "/dashboard/templates", label: "Templates", icon: LayoutGrid },
  { href: "/dashboard/brands", label: "Brands", icon: Palette },
  { href: "/dashboard/projects", label: "Projects", icon: FolderOpen },
];

const bottomLinks = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "#", label: "Help & Support", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "flex h-screen flex-col border-r border-border bg-white transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-bg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold">
              AdGen<span className="text-primary">AI</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-lg p-1 text-muted hover:bg-surface-hover lg:block"
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {mainLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-surface-hover hover:text-foreground"
                )}
                title={collapsed ? link.label : undefined}
              >
                <link.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
                {!collapsed && link.href === "/dashboard/generate" && (
                  <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-border p-3">
        {!collapsed && (
          <div className="mb-3 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 p-4">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold">Upgrade to Pro</span>
            </div>
            <p className="mt-1 text-xs text-muted">
              Get unlimited creatives and premium templates.
            </p>
            <Link
              href="#"
              className="mt-3 block rounded-lg gradient-bg px-3 py-1.5 text-center text-xs font-semibold text-white"
            >
              Upgrade Now
            </Link>
          </div>
        )}
        <div className="space-y-1">
          {bottomLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
              title={collapsed ? link.label : undefined}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
