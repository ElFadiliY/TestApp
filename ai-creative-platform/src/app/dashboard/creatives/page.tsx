"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Trash2,
  Copy,
  MoreHorizontal,
  Star,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import { clsx } from "clsx";
import { creatives, brands, templates, getPlatformLabel } from "@/lib/mock-data";
import type { Platform } from "@/lib/types";

const platformOptions: { value: Platform | "all"; label: string }[] = [
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

type SortBy = "newest" | "oldest" | "score-high" | "score-low";

export default function CreativesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  let filtered = creatives.filter((c) => {
    if (platformFilter !== "all" && c.platform !== platformFilter) return false;
    if (brandFilter !== "all" && c.brandId !== brandFilter) return false;
    if (
      searchQuery &&
      !c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.headline.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "score-high":
        return b.score - a.score;
      case "score-low":
        return a.score - b.score;
      default:
        return 0;
    }
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((c) => c.id)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Creatives Library</h1>
          <p className="mt-1 text-sm text-muted">
            {filtered.length} creatives &bull; Manage and download your generated
            ad creatives.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creatives..."
              className="w-full rounded-lg border border-border bg-white py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value as Platform | "all")}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            {platformOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="score-high">Highest Score</option>
            <option value="score-low">Lowest Score</option>
          </select>

          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={clsx(
                "p-2 transition-colors",
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "bg-white text-muted hover:bg-surface-hover"
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={clsx(
                "p-2 transition-colors",
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "bg-white text-muted hover:bg-surface-hover"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/20 px-4 py-3">
          <span className="text-sm font-medium text-primary">
            {selectedIds.size} selected
          </span>
          <button className="flex items-center gap-1.5 rounded-lg bg-white border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface-hover transition-colors">
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-white border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface-hover transition-colors">
            <Copy className="h-3.5 w-3.5" />
            Duplicate
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-white border border-danger/30 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/5 transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="ml-auto text-xs text-muted hover:text-foreground"
          >
            Clear selection
          </button>
        </div>
      )}

      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((creative) => {
            const brand = brands.find((b) => b.id === creative.brandId);
            const isSelected = selectedIds.has(creative.id);
            return (
              <div
                key={creative.id}
                className={clsx(
                  "group overflow-hidden rounded-xl border bg-white transition-all hover:shadow-md cursor-pointer",
                  isSelected
                    ? "border-primary shadow-md shadow-primary/10"
                    : "border-border"
                )}
                onClick={() => toggleSelect(creative.id)}
              >
                <div
                  className="aspect-square p-4 flex flex-col justify-between relative"
                  style={{
                    background: `linear-gradient(135deg, ${brand?.primaryColor}18, ${brand?.secondaryColor}22)`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium shadow-sm">
                      {getPlatformLabel(creative.platform)}
                    </span>
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-xs font-bold",
                        creative.score >= 85
                          ? "bg-success/20 text-success"
                          : creative.score >= 70
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                      )}
                    >
                      {creative.score}
                    </span>
                  </div>

                  <div>
                    <div
                      className="h-1.5 w-3/4 rounded-full mb-1.5"
                      style={{ backgroundColor: `${brand?.primaryColor}30` }}
                    />
                    <div
                      className="h-1.5 w-1/2 rounded-full mb-3"
                      style={{ backgroundColor: `${brand?.primaryColor}20` }}
                    />
                    <div
                      className="text-sm font-bold leading-tight"
                      style={{ color: brand?.primaryColor }}
                    >
                      {creative.headline}
                    </div>
                    <div
                      className="mt-2 inline-block rounded-md px-2 py-0.5 text-xs font-semibold text-white"
                      style={{ backgroundColor: brand?.primaryColor }}
                    >
                      {creative.ctaText}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="rounded-md bg-white p-1.5 shadow-md hover:bg-surface-hover"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="rounded-md bg-white p-1.5 shadow-md hover:bg-surface-hover"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 left-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-border">
                  <div className="text-xs font-medium truncate">
                    {creative.name}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(creative.createdAt).toLocaleDateString()}
                    </span>
                    <span>&bull;</span>
                    <span>{brand?.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filtered.length && filtered.length > 0}
                    onChange={selectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                  Creative
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                  <button className="flex items-center gap-1">
                    Score
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((creative) => {
                const brand = brands.find((b) => b.id === creative.brandId);
                const isSelected = selectedIds.has(creative.id);
                return (
                  <tr
                    key={creative.id}
                    className={clsx(
                      "border-b border-border last:border-0 hover:bg-surface/50 transition-colors",
                      isSelected && "bg-primary/5"
                    )}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(creative.id)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: brand?.primaryColor }}
                        >
                          Ad
                        </div>
                        <div>
                          <div className="text-sm font-medium truncate max-w-[200px]">
                            {creative.name}
                          </div>
                          <div className="text-xs text-muted truncate max-w-[200px]">
                            {creative.headline}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium">
                        {getPlatformLabel(creative.platform)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{brand?.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold",
                          creative.score >= 85
                            ? "bg-success/10 text-success"
                            : creative.score >= 70
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                        )}
                      >
                        <Star className="h-3 w-3" />
                        {creative.score}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">
                      {new Date(creative.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-1.5 text-muted hover:bg-surface-hover transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-1.5 text-muted hover:bg-surface-hover transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
