"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Crown, Sparkles, Filter } from "lucide-react";
import { templates, getPlatformLabel, getCategoryLabel } from "@/lib/mock-data";
import type { Platform, TemplateCategory } from "@/lib/types";

const platformColors: Record<string, string> = {
  facebook: "from-blue-500 to-blue-600",
  instagram: "from-pink-500 to-purple-600",
  google: "from-green-500 to-emerald-600",
  linkedin: "from-cyan-500 to-blue-600",
  twitter: "from-gray-700 to-gray-900",
  youtube: "from-red-500 to-red-600",
  tiktok: "from-gray-800 to-black",
  pinterest: "from-red-600 to-red-700",
};

const categoryFilters: { value: TemplateCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "social-media", label: "Social Media" },
  { value: "display", label: "Display Ads" },
  { value: "story", label: "Story / Vertical" },
  { value: "video-thumbnail", label: "Video Thumbnail" },
  { value: "email", label: "Email" },
];

const platformFilters: { value: Platform | "all"; label: string }[] = [
  { value: "all", label: "All Platforms" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "X / Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "pinterest", label: "Pinterest" },
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<TemplateCategory | "all">("all");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");

  const filtered = templates.filter((t) => {
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    if (platformFilter !== "all" && t.platform !== platformFilter) return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Template Library</h1>
          <p className="mt-1 text-sm text-muted">
            {templates.length} templates across all platforms. Choose one to
            start generating.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-lg border border-border bg-white py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as TemplateCategory | "all")
          }
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
        >
          {categoryFilters.map((cf) => (
            <option key={cf.value} value={cf.value}>
              {cf.label}
            </option>
          ))}
        </select>

        <select
          value={platformFilter}
          onChange={(e) =>
            setPlatformFilter(e.target.value as Platform | "all")
          }
          className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
        >
          {platformFilters.map((pf) => (
            <option key={pf.value} value={pf.value}>
              {pf.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((template) => {
          const gradient =
            platformColors[template.platform] || "from-gray-500 to-gray-600";
          return (
            <div
              key={template.id}
              className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`bg-gradient-to-br ${gradient} p-6 flex flex-col items-center justify-center relative`}
              >
                <div className="text-center text-white">
                  <div className="text-3xl font-bold opacity-20">
                    {template.width}&times;{template.height}
                  </div>
                  <div className="mt-2 rounded-lg bg-white/20 px-4 py-2">
                    <div className="h-1.5 w-16 rounded-full bg-white/40 mx-auto" />
                    <div className="mt-1.5 h-1.5 w-12 rounded-full bg-white/30 mx-auto" />
                    <div className="mt-3 text-xs font-semibold">Preview</div>
                  </div>
                </div>

                {template.isPremium && (
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur px-2 py-0.5 text-xs font-semibold text-white">
                      <Crown className="h-3 w-3" />
                      PRO
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 group-hover:bg-black/20 group-hover:opacity-100 transition-all">
                  <Link
                    href="/dashboard/generate"
                    className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-lg hover:bg-surface-hover transition-colors"
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                    Use Template
                  </Link>
                </div>
              </div>

              <div className="p-4">
                <div className="font-medium text-sm">{template.name}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <span>{getPlatformLabel(template.platform)}</span>
                  <span>&bull;</span>
                  <span>{getCategoryLabel(template.category)}</span>
                </div>
                <div className="mt-1 text-xs text-muted">
                  {template.width} &times; {template.height}px
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-border bg-white p-12 text-center">
          <Filter className="mx-auto h-12 w-12 text-muted" />
          <h3 className="mt-4 text-lg font-semibold">No templates found</h3>
          <p className="mt-2 text-sm text-muted">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
}
