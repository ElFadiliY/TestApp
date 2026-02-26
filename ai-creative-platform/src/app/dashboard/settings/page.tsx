"use client";

import { useState } from "react";
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Key,
  Globe,
  Palette,
  Save,
  Check,
} from "lucide-react";
import { clsx } from "clsx";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API Keys", icon: Key },
  { id: "security", label: "Security", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Manage your account, billing, and preferences.
        </p>
      </div>

      <div className="flex gap-6">
        <div className="hidden w-52 shrink-0 space-y-1 lg:block">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-surface-hover hover:text-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <div className="flex gap-2 overflow-x-auto lg:hidden mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-surface text-muted"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "profile" && (
            <div className="rounded-xl border border-border bg-white p-6 space-y-6">
              <h2 className="text-lg font-semibold">Profile Information</h2>

              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white">
                  JD
                </div>
                <div>
                  <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface-hover transition-colors">
                    Change Avatar
                  </button>
                  <p className="mt-1 text-xs text-muted">
                    JPG, PNG, or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="john@company.com"
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Company</label>
                <input
                  type="text"
                  defaultValue="Acme Inc."
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Timezone</label>
                <select className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none">
                  <option>UTC-08:00 Pacific Time</option>
                  <option>UTC-05:00 Eastern Time</option>
                  <option>UTC+00:00 GMT</option>
                  <option>UTC+01:00 Central European Time</option>
                </select>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg gradient-bg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all"
              >
                {saved ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-white p-6">
                <h2 className="text-lg font-semibold">Current Plan</h2>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 p-6">
                  <div>
                    <div className="text-sm font-medium text-muted">
                      You&apos;re on the
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      Professional Plan
                    </div>
                    <div className="mt-1 text-sm text-muted">
                      500 AI creatives / month &bull; Renews Mar 15, 2026
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">$79</div>
                    <div className="text-sm text-muted">/month</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-6">
                <h2 className="text-lg font-semibold">Usage This Month</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>AI Creatives</span>
                      <span className="font-medium">
                        34 / 500 used
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-bg"
                        style={{ width: "6.8%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Brand Profiles</span>
                      <span className="font-medium">3 / Unlimited</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: "10%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-6">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <div className="mt-4 flex items-center gap-4 rounded-lg border border-border p-4">
                  <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-surface text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      Visa ending in 4242
                    </div>
                    <div className="text-xs text-muted">Expires 12/2027</div>
                  </div>
                  <button className="ml-auto text-sm font-medium text-primary hover:underline">
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="rounded-xl border border-border bg-white p-6 space-y-6">
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
              {[
                {
                  title: "Creative Generation Complete",
                  desc: "Get notified when your AI creatives are ready",
                  defaultChecked: true,
                },
                {
                  title: "Weekly Performance Report",
                  desc: "Weekly summary of your creative performance",
                  defaultChecked: true,
                },
                {
                  title: "Usage Alerts",
                  desc: "Notify when approaching monthly limits",
                  defaultChecked: true,
                },
                {
                  title: "New Templates",
                  desc: "Get notified about new template releases",
                  defaultChecked: false,
                },
                {
                  title: "Product Updates",
                  desc: "Feature announcements and platform updates",
                  defaultChecked: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-muted">{item.desc}</div>
                  </div>
                  <label className="relative inline-flex cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={item.defaultChecked}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-surface-hover peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              ))}

              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg gradient-bg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all"
              >
                {saved ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === "api" && (
            <div className="rounded-xl border border-border bg-white p-6 space-y-6">
              <h2 className="text-lg font-semibold">API Keys</h2>
              <p className="text-sm text-muted">
                Use API keys to integrate AdGenAI with your existing tools and
                workflows.
              </p>

              <div className="rounded-lg border border-border p-4 bg-surface/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Production Key</div>
                    <div className="mt-1 font-mono text-xs text-muted">
                      sk-prod-****************************a1b2
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface-hover transition-colors">
                      Copy
                    </button>
                    <button className="rounded-lg border border-danger/30 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/5 transition-colors">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface-hover transition-colors">
                <Key className="h-4 w-4" />
                Generate New Key
              </button>

              <div className="rounded-lg bg-surface p-4">
                <h3 className="text-sm font-semibold">Quick Start</h3>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-foreground p-4 text-xs text-white">
{`curl -X POST https://api.adgenai.com/v1/generate \\
  -H "Authorization: Bearer sk-prod-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "brand_id": "brand-1",
    "template_id": "tmpl-1",
    "count": 4
  }'`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-white p-6 space-y-4">
                <h2 className="text-lg font-semibold">Change Password</h2>
                <div>
                  <label className="block text-sm font-medium">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <button className="rounded-lg gradient-bg px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all">
                  Update Password
                </button>
              </div>

              <div className="rounded-xl border border-border bg-white p-6 space-y-4">
                <h2 className="text-lg font-semibold">
                  Two-Factor Authentication
                </h2>
                <p className="text-sm text-muted">
                  Add an extra layer of security to your account.
                </p>
                <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface-hover transition-colors">
                  Enable 2FA
                </button>
              </div>

              <div className="rounded-xl border border-danger/20 bg-danger/5 p-6">
                <h2 className="text-lg font-semibold text-danger">
                  Danger Zone
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Permanently delete your account and all associated data.
                </p>
                <button className="mt-4 rounded-lg border border-danger px-4 py-2 text-sm font-medium text-danger hover:bg-danger hover:text-white transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
