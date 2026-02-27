import Link from "next/link";
import {
  ArrowRight,
  Play,
  Star,
  Zap,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Powered by Advanced AI Models</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
            Generate{" "}
            <span className="gradient-text">High-Converting</span>{" "}
            Ad Creatives in Seconds
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            AI-powered platform that creates stunning ad visuals and copy for
            every platform. Boost your ROAS by up to 14x with creatives
            optimized by machine learning.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard/generate"
              className="group flex items-center gap-2 rounded-xl gradient-bg px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              Generate Your First Ad
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground hover:bg-surface-hover transition-colors">
              <Play className="h-5 w-5 text-primary" />
              Watch Demo
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-2 text-sm font-medium text-muted">
                4.9/5 from 2,000+ reviews
              </span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <Zap className="h-4 w-4 text-secondary" />
              10M+ creatives generated
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <TrendingUp className="h-4 w-4 text-success" />
              14x average ROAS improvement
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="rounded-2xl border border-border bg-white p-2 shadow-2xl shadow-primary/10">
            <div className="rounded-xl bg-gradient-to-br from-surface to-white p-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  {
                    label: "Facebook Ad",
                    color: "from-blue-500 to-blue-600",
                    size: "1200×628",
                  },
                  {
                    label: "Instagram Post",
                    color: "from-pink-500 to-purple-600",
                    size: "1080×1080",
                  },
                  {
                    label: "Google Display",
                    color: "from-green-500 to-emerald-600",
                    size: "728×90",
                  },
                  {
                    label: "LinkedIn Ad",
                    color: "from-cyan-500 to-blue-600",
                    size: "1200×627",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <div
                      className={`aspect-square rounded-xl bg-gradient-to-br ${item.color} p-4 flex flex-col justify-between text-white transition-transform group-hover:scale-[1.02]`}
                    >
                      <div>
                        <div className="text-xs font-medium opacity-80">
                          {item.size}
                        </div>
                        <div className="mt-1 text-sm font-bold">
                          {item.label}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-3/4 rounded-full bg-white/30" />
                        <div className="h-2 w-1/2 rounded-full bg-white/20" />
                        <div className="mt-3 inline-block rounded-md bg-white/25 px-3 py-1 text-xs font-semibold">
                          Shop Now
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 opacity-0 transition-all group-hover:bg-black/10 group-hover:opacity-100">
                      <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg">
                        AI Generated
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-6 py-2 shadow-lg border border-border">
            <span className="text-sm font-medium text-muted">
              Generated in <span className="text-primary font-bold">3.2s</span>{" "}
              with AI Score{" "}
              <span className="text-success font-bold">94/100</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
