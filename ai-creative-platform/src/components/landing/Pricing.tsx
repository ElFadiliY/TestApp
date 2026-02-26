import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses and freelancers",
    features: [
      "50 AI creatives / month",
      "5 brand profiles",
      "All platform formats",
      "Creative scoring",
      "Standard templates",
      "PNG & JPG export",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For growing teams and agencies",
    features: [
      "500 AI creatives / month",
      "Unlimited brand profiles",
      "All platform formats",
      "Advanced creative scoring",
      "Premium templates",
      "PNG, JPG, SVG & PSD export",
      "Background removal",
      "Multi-language support",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$249",
    period: "/month",
    description: "For large teams with custom needs",
    features: [
      "Unlimited AI creatives",
      "Unlimited brand profiles",
      "All platform formats",
      "AI conversion prediction",
      "Custom templates",
      "All export formats",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "SSO & team management",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Plans That Scale{" "}
            <span className="gradient-text">With You</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition-all ${
                plan.highlighted
                  ? "border-primary bg-white shadow-xl shadow-primary/10 scale-105"
                  : "border-border bg-white hover:shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 rounded-full gradient-bg px-4 py-1 text-xs font-semibold text-white">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted">{plan.period}</span>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard/generate"
                className={`mt-8 block rounded-xl px-6 py-3 text-center text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "gradient-bg text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
                    : "border border-border text-foreground hover:bg-surface-hover"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
