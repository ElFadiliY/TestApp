import {
  Sparkles,
  BarChart3,
  Palette,
  Layers,
  Zap,
  Globe,
  Image,
  RefreshCw,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Creative Generation",
    description:
      "Generate hundreds of ad variations in seconds. Our AI understands your brand and creates visuals that convert.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: BarChart3,
    title: "Creative Scoring",
    description:
      "Each creative gets a conversion score based on ML analysis of millions of high-performing ads.",
    color: "text-secondary bg-secondary/10",
  },
  {
    icon: Palette,
    title: "Brand Consistency",
    description:
      "Upload your brand kit and every creative stays on-brand with your colors, fonts, and visual identity.",
    color: "text-accent bg-accent/10",
  },
  {
    icon: Layers,
    title: "Multi-Platform Formats",
    description:
      "One click to generate creatives for Facebook, Instagram, Google, LinkedIn, TikTok, and more.",
    color: "text-purple-600 bg-purple-100",
  },
  {
    icon: Zap,
    title: "Instant Variations",
    description:
      "Generate unlimited variations of your best creatives. A/B test at scale without designer bottlenecks.",
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Auto-translate and localize your ad copy for 30+ languages while maintaining cultural relevance.",
    color: "text-green-600 bg-green-100",
  },
  {
    icon: Image,
    title: "AI Background Removal",
    description:
      "Remove and replace backgrounds automatically. Create professional product shots in seconds.",
    color: "text-rose-600 bg-rose-100",
  },
  {
    icon: RefreshCw,
    title: "Smart Iteration",
    description:
      "AI learns from your top performers to continuously improve creative quality and conversion rates.",
    color: "text-teal-600 bg-teal-100",
  },
  {
    icon: Shield,
    title: "Brand Safety",
    description:
      "Built-in compliance checks ensure every creative meets platform guidelines and brand standards.",
    color: "text-indigo-600 bg-indigo-100",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Create{" "}
            <span className="gradient-text">Winning Ads</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            From generation to optimization, our AI handles the entire creative
            workflow so your team can focus on strategy.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-white p-8 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div
                className={`inline-flex rounded-xl p-3 ${feature.color}`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
