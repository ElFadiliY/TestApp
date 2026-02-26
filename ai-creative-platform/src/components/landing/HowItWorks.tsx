import { Upload, Wand2, BarChart, Download } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Upload,
    title: "Set Up Your Brand",
    description:
      "Upload your logo, brand colors, fonts, and product images. Our AI learns your brand identity in seconds.",
    color: "from-primary to-primary-dark",
  },
  {
    step: 2,
    icon: Wand2,
    title: "Choose & Generate",
    description:
      "Select your ad platform, template, and target audience. AI generates dozens of unique creatives instantly.",
    color: "from-accent to-cyan-600",
  },
  {
    step: 3,
    icon: BarChart,
    title: "Review & Score",
    description:
      "Each creative gets an AI conversion score. Review, edit, and pick the winners for your campaign.",
    color: "from-secondary to-orange-600",
  },
  {
    step: 4,
    icon: Download,
    title: "Export & Launch",
    description:
      "Download print-ready files or push directly to your ad platforms. Track performance and iterate.",
    color: "from-success to-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From Brief to{" "}
            <span className="gradient-text">Brilliant Ads</span> in 4 Steps
          </h2>
          <p className="mt-4 text-lg text-muted">
            No design skills needed. Our AI handles everything from concept to
            final creative.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-border lg:block" />
          <div className="space-y-12 lg:space-y-0">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className={`relative flex flex-col items-center gap-8 lg:flex-row ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 lg:pr-16">
                  <div
                    className={`rounded-2xl bg-gradient-to-br ${item.color} p-8 text-white ${
                      i % 2 === 1 ? "lg:ml-16" : "lg:mr-16"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-white/80">{item.description}</p>
                  </div>
                </div>

                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-lg border-4 border-primary/20">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
