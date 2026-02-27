import Link from "next/link";
import { ArrowRight } from "lucide-react";

const platformTemplates = [
  {
    name: "Facebook Ads",
    count: 45,
    gradient: "from-blue-500 to-blue-600",
    formats: ["Feed", "Story", "Carousel", "Video"],
  },
  {
    name: "Instagram",
    count: 52,
    gradient: "from-pink-500 to-purple-600",
    formats: ["Post", "Story", "Reel", "Carousel"],
  },
  {
    name: "Google Ads",
    count: 38,
    gradient: "from-green-500 to-emerald-600",
    formats: ["Display", "Responsive", "Banner", "Square"],
  },
  {
    name: "LinkedIn",
    count: 24,
    gradient: "from-cyan-500 to-blue-600",
    formats: ["Sponsored", "InMail", "Carousel", "Story"],
  },
  {
    name: "TikTok",
    count: 30,
    gradient: "from-gray-800 to-gray-900",
    formats: ["In-Feed", "TopView", "Spark Ad", "Brand"],
  },
  {
    name: "YouTube",
    count: 28,
    gradient: "from-red-500 to-red-600",
    formats: ["Thumbnail", "Banner", "Display", "Bumper"],
  },
];

export default function TemplatesPreview() {
  return (
    <section id="templates" className="py-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Templates
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            200+ Templates for{" "}
            <span className="gradient-text">Every Platform</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Pre-built templates optimized for every ad platform, format, and
            industry.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platformTemplates.map((platform) => (
            <div
              key={platform.name}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`bg-gradient-to-br ${platform.gradient} p-6 text-white`}
              >
                <h3 className="text-lg font-bold">{platform.name}</h3>
                <p className="mt-1 text-sm text-white/70">
                  {platform.count} templates
                </p>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {platform.formats.map((format) => (
                    <span
                      key={format}
                      className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
                    >
                      {format}
                    </span>
                  ))}
                </div>
                <Link
                  href="/dashboard/templates"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Browse templates
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
