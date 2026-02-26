"use client";

import { useState } from "react";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Wand2,
  Check,
  Loader2,
  Download,
  RefreshCw,
  Copy,
  Star,
  ArrowRight,
} from "lucide-react";
import { clsx } from "clsx";
import { brands, templates, getPlatformLabel, getCategoryLabel } from "@/lib/mock-data";
import type { Brand, Template, Platform } from "@/lib/types";

const steps = [
  { id: 1, label: "Brand" },
  { id: 2, label: "Platform & Template" },
  { id: 3, label: "Creative Brief" },
  { id: 4, label: "Generate" },
];

const tones = [
  "Professional",
  "Friendly",
  "Bold",
  "Playful",
  "Urgent",
  "Inspirational",
  "Minimalist",
  "Luxury",
];

const audiences = [
  "Young Professionals (25-35)",
  "Small Business Owners",
  "Tech Enthusiasts",
  "Parents & Families",
  "Health & Fitness",
  "Students (18-24)",
  "Enterprise Decision Makers",
  "Creative Professionals",
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

interface GeneratedCreative {
  id: number;
  headline: string;
  description: string;
  cta: string;
  score: number;
  primaryColor: string;
  secondaryColor: string;
  platform: string;
}

export default function GeneratePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [ctaText, setCtaText] = useState("Learn More");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [selectedAudience, setSelectedAudience] = useState(audiences[0]);
  const [creativeCount, setCreativeCount] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCreatives, setGeneratedCreatives] = useState<GeneratedCreative[]>([]);

  const filteredTemplates =
    platformFilter === "all"
      ? templates
      : templates.filter((t) => t.platform === platformFilter);

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedBrand !== null;
      case 2:
        return selectedTemplate !== null;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const headlineOptions = [
    "Transform Your Business Today",
    "Unlock Premium Features",
    "Join 10,000+ Happy Customers",
    "Limited Time Offer - Act Now",
    "The Smart Way to Grow",
    "Experience the Difference",
  ];

  const descriptionOptions = [
    "Discover how our AI-powered solution can help you achieve more in less time.",
    "Start your journey today and see results within the first week.",
    "Trusted by industry leaders worldwide. See why they choose us.",
    "Get exclusive access to premium features at an unbeatable price.",
  ];

  const ctaOptions = [
    "Learn More",
    "Get Started",
    "Shop Now",
    "Sign Up Free",
    "Try It Free",
    "Book a Demo",
    "Claim Offer",
    "Download Now",
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedCreatives([]);

    await new Promise((r) => setTimeout(r, 2500));

    const results: GeneratedCreative[] = Array.from(
      { length: creativeCount },
      (_, i) => ({
        id: i + 1,
        headline:
          headline || headlineOptions[i % headlineOptions.length],
        description:
          description || descriptionOptions[i % descriptionOptions.length],
        cta: ctaText,
        score: Math.floor(Math.random() * 25) + 75,
        primaryColor: selectedBrand?.primaryColor || "#6366f1",
        secondaryColor: selectedBrand?.secondaryColor || "#06b6d4",
        platform: selectedTemplate?.platform || "facebook",
      })
    );

    setGeneratedCreatives(results);
    setIsGenerating(false);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Generate Ad Creatives</h1>
        <p className="mt-1 text-sm text-muted">
          Create AI-powered ad creatives in just a few steps.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <button
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              className={clsx(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                currentStep === step.id
                  ? "gradient-bg text-white shadow-md"
                  : step.id < currentStep
                  ? "bg-success/10 text-success"
                  : "bg-surface text-muted"
              )}
            >
              {step.id < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">
                  {step.id}
                </span>
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted" />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-white p-8">
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-semibold">Select Your Brand</h2>
            <p className="mt-1 text-sm text-muted">
              Choose the brand profile for your ad creatives.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand)}
                  className={clsx(
                    "rounded-xl border-2 p-6 text-left transition-all hover:shadow-md",
                    selectedBrand?.id === brand.id
                      ? "border-primary shadow-md shadow-primary/10"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                      style={{ backgroundColor: brand.primaryColor }}
                    >
                      {brand.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{brand.name}</div>
                      <div className="text-xs text-muted">{brand.description}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {[brand.primaryColor, brand.secondaryColor, brand.accentColor].map(
                      (color) => (
                        <div
                          key={color}
                          className="h-6 w-6 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      )
                    )}
                  </div>
                  {selectedBrand?.id === brand.id && (
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                      <Check className="h-3 w-3" />
                      Selected
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold">Choose Platform & Template</h2>
            <p className="mt-1 text-sm text-muted">
              Select the ad platform and template format.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {platformFilters.map((pf) => (
                <button
                  key={pf.value}
                  onClick={() => setPlatformFilter(pf.value)}
                  className={clsx(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    platformFilter === pf.value
                      ? "bg-primary text-white"
                      : "bg-surface text-muted hover:bg-surface-hover"
                  )}
                >
                  {pf.label}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={clsx(
                    "rounded-xl border-2 p-4 text-left transition-all hover:shadow-md",
                    selectedTemplate?.id === template.id
                      ? "border-primary shadow-md shadow-primary/10"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-surface to-surface-hover">
                    <div className="text-center">
                      <div className="text-xs text-muted">
                        {template.width} &times; {template.height}
                      </div>
                      <div className="mt-1 text-sm font-medium">
                        {template.name}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{template.name}</div>
                      <div className="text-xs text-muted">
                        {getPlatformLabel(template.platform)} &bull;{" "}
                        {getCategoryLabel(template.category)}
                      </div>
                    </div>
                    {template.isPremium && (
                      <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
                        PRO
                      </span>
                    )}
                  </div>
                  {selectedTemplate?.id === template.id && (
                    <div className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                      <Check className="h-3 w-3" />
                      Selected
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-semibold">Creative Brief</h2>
            <p className="mt-1 text-sm text-muted">
              Provide details for your ad creative. Leave fields empty for AI
              auto-generation.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium">
                  Headline{" "}
                  <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="AI will generate a compelling headline..."
                  className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {headlineOptions.slice(0, 3).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setHeadline(opt)}
                      className="rounded-full bg-surface px-3 py-1 text-xs text-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Description{" "}
                  <span className="text-muted font-normal">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="AI will write persuasive ad copy..."
                  rows={3}
                  className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Call to Action
                </label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {ctaOptions.map((cta) => (
                    <button
                      key={cta}
                      onClick={() => setCtaText(cta)}
                      className={clsx(
                        "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                        ctaText === cta
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      {cta}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium">Tone</label>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {tones.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setSelectedTone(tone)}
                        className={clsx(
                          "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                          selectedTone === tone
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/30"
                        )}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Target Audience
                  </label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {audiences.map((aud) => (
                      <option key={aud} value={aud}>
                        {aud}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Number of Variations
                </label>
                <div className="mt-1.5 flex items-center gap-4">
                  {[2, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCreativeCount(num)}
                      className={clsx(
                        "flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
                        creativeCount === num
                          ? "border-primary bg-primary text-white"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            {!isGenerating && generatedCreatives.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 animate-pulse-glow">
                  <Wand2 className="h-10 w-10 text-primary" />
                </div>
                <h2 className="mt-6 text-xl font-semibold">
                  Ready to Generate
                </h2>
                <p className="mt-2 text-sm text-muted max-w-md mx-auto">
                  Your AI creative brief is ready. Click generate to create{" "}
                  {creativeCount} unique ad variations for{" "}
                  {selectedBrand?.name || "your brand"}.
                </p>

                <div className="mt-6 rounded-xl bg-surface p-4 max-w-md mx-auto text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Brand:</span>
                      <span className="font-medium">{selectedBrand?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Template:</span>
                      <span className="font-medium">{selectedTemplate?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Tone:</span>
                      <span className="font-medium">{selectedTone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Audience:</span>
                      <span className="font-medium">{selectedAudience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Variations:</span>
                      <span className="font-medium">{creativeCount}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl gradient-bg px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all"
                >
                  <Sparkles className="h-5 w-5" />
                  Generate {creativeCount} Creatives
                </button>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-16">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl gradient-bg animate-pulse-glow">
                  <Loader2 className="h-10 w-10 text-white animate-spin" />
                </div>
                <h2 className="mt-6 text-xl font-semibold">
                  AI is Creating Your Ads...
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Generating {creativeCount} unique variations. This usually
                  takes a few seconds.
                </p>
                <div className="mt-6 mx-auto max-w-xs">
                  <div className="h-2 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full gradient-bg animate-[shimmer_1.5s_infinite]" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
            )}

            {!isGenerating && generatedCreatives.length > 0 && (
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Generated Creatives
                    </h2>
                    <p className="mt-0.5 text-sm text-muted">
                      {generatedCreatives.length} variations created. Pick your
                      favorites.
                    </p>
                  </div>
                  <button
                    onClick={handleGenerate}
                    className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface-hover transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </button>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {generatedCreatives.map((creative) => (
                    <div
                      key={creative.id}
                      className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg"
                    >
                      <div
                        className="aspect-[4/3] p-6 flex flex-col justify-between relative"
                        style={{
                          background: `linear-gradient(135deg, ${creative.primaryColor}15, ${creative.secondaryColor}25)`,
                        }}
                      >
                        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="rounded-lg bg-white p-2 shadow-md hover:bg-surface-hover transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg bg-white p-2 shadow-md hover:bg-surface-hover transition-colors">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>

                        <div
                          className="h-2 w-2/3 rounded-full"
                          style={{ backgroundColor: `${creative.primaryColor}30` }}
                        />

                        <div className="space-y-3">
                          <div
                            className="h-2 w-full rounded-full"
                            style={{ backgroundColor: `${creative.primaryColor}20` }}
                          />
                          <div
                            className="h-2 w-4/5 rounded-full"
                            style={{ backgroundColor: `${creative.primaryColor}15` }}
                          />
                          <h3
                            className="text-lg font-bold leading-tight"
                            style={{ color: creative.primaryColor }}
                          >
                            {creative.headline}
                          </h3>
                          <p className="text-xs text-muted line-clamp-2">
                            {creative.description}
                          </p>
                          <div
                            className="inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white"
                            style={{ backgroundColor: creative.primaryColor }}
                          >
                            {creative.cta}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={clsx(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
                                creative.score >= 85
                                  ? "bg-success/10 text-success"
                                  : creative.score >= 75
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-600"
                              )}
                            >
                              <Star className="h-3 w-3" />
                              Score: {creative.score}/100
                            </span>
                            <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                              {getPlatformLabel(creative.platform)}
                            </span>
                          </div>
                          <button className="rounded-lg gradient-bg px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:shadow-md transition-all">
                            Use This
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                    <Download className="h-4 w-4" />
                    Download All Creatives
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {currentStep < 4 && (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 rounded-lg gradient-bg px-6 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next Step
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
