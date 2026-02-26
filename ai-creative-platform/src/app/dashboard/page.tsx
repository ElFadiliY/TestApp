"use client";

import Link from "next/link";
import {
  Image,
  FolderOpen,
  Palette,
  TrendingUp,
  Sparkles,
  ArrowRight,
  BarChart3,
  Zap,
  Clock,
} from "lucide-react";
import { dashboardStats, creatives, projects, brands } from "@/lib/mock-data";
import { getPlatformLabel } from "@/lib/mock-data";

const statCards = [
  {
    label: "Total Creatives",
    value: dashboardStats.totalCreatives,
    icon: Image,
    color: "text-primary bg-primary/10",
    change: "+12%",
    changePositive: true,
  },
  {
    label: "Active Projects",
    value: dashboardStats.totalProjects,
    icon: FolderOpen,
    color: "text-accent bg-accent/10",
    change: "+3",
    changePositive: true,
  },
  {
    label: "Average AI Score",
    value: `${dashboardStats.avgScore}/100`,
    icon: BarChart3,
    color: "text-success bg-success/10",
    change: "+5pts",
    changePositive: true,
  },
  {
    label: "This Month",
    value: dashboardStats.creativesThisMonth,
    icon: TrendingUp,
    color: "text-secondary bg-secondary/10",
    change: "+28%",
    changePositive: true,
  },
];

export default function DashboardPage() {
  const recentCreatives = creatives.slice(0, 6);
  const activeProjects = projects.filter((p) => p.status === "active").slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, John</h1>
          <p className="mt-1 text-sm text-muted">
            Here&apos;s what&apos;s happening with your ad creatives.
          </p>
        </div>
        <Link
          href="/dashboard/generate"
          className="flex items-center gap-2 rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          Generate Creatives
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-white p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2.5 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-success">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Quick Start: Generate Your First Ad</h3>
              <p className="text-sm text-muted">
                Select a brand, pick a template, and let AI create stunning ads
                in seconds.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/generate"
            className="flex items-center gap-2 rounded-lg border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Creatives</h2>
            <Link
              href="/dashboard/creatives"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentCreatives.map((creative) => {
              const brand = brands.find((b) => b.id === creative.brandId);
              return (
                <div
                  key={creative.id}
                  className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-md"
                >
                  <div
                    className="aspect-square p-4 flex flex-col justify-between"
                    style={{
                      background: `linear-gradient(135deg, ${brand?.primaryColor}22, ${brand?.secondaryColor}22)`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium">
                        {getPlatformLabel(creative.platform)}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                          creative.score >= 85
                            ? "bg-success/20 text-success"
                            : creative.score >= 70
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {creative.score}
                      </span>
                    </div>
                    <div>
                      <div
                        className="h-2 w-3/4 rounded-full mb-1.5"
                        style={{ backgroundColor: `${brand?.primaryColor}40` }}
                      />
                      <div
                        className="h-2 w-1/2 rounded-full mb-3"
                        style={{ backgroundColor: `${brand?.primaryColor}30` }}
                      />
                      <div className="text-xs font-bold" style={{ color: brand?.primaryColor }}>
                        {creative.headline}
                      </div>
                      <div
                        className="mt-2 inline-block rounded-md px-2 py-0.5 text-xs font-semibold text-white"
                        style={{ backgroundColor: brand?.primaryColor }}
                      >
                        {creative.ctaText}
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-medium truncate">
                      {creative.name}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                      <Clock className="h-3 w-3" />
                      {new Date(creative.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Projects</h2>
            <Link
              href="/dashboard/projects"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {activeProjects.map((project) => {
              const brand = brands.find((b) => b.id === project.brandId);
              return (
                <div
                  key={project.id}
                  className="rounded-xl border border-border bg-white p-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: brand?.primaryColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {project.name}
                      </div>
                      <div className="text-xs text-muted mt-0.5">
                        {brand?.name}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted">
                        <span>{project.creativeCount} creatives</span>
                        <span>
                          Updated{" "}
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Brands</h2>
            <div className="mt-4 space-y-3">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:shadow-md"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{brand.name}</div>
                    <div className="text-xs text-muted">{brand.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
