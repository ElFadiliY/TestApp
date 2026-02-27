import {
  Brand,
  Template,
  Creative,
  Project,
  DashboardStats,
} from "./types";

export const brands: Brand[] = [
  {
    id: "brand-1",
    name: "TechFlow",
    primaryColor: "#6366f1",
    secondaryColor: "#06b6d4",
    accentColor: "#f97316",
    fonts: ["Inter", "Space Grotesk"],
    description: "Modern SaaS productivity platform",
    website: "https://techflow.io",
  },
  {
    id: "brand-2",
    name: "GreenLeaf",
    primaryColor: "#22c55e",
    secondaryColor: "#15803d",
    accentColor: "#fbbf24",
    fonts: ["Poppins", "Lora"],
    description: "Organic food & wellness brand",
    website: "https://greenleaf.co",
  },
  {
    id: "brand-3",
    name: "VelocityFit",
    primaryColor: "#ef4444",
    secondaryColor: "#1e293b",
    accentColor: "#eab308",
    fonts: ["Montserrat", "Roboto"],
    description: "Premium fitness & athletic wear",
    website: "https://velocityfit.com",
  },
];

export const templates: Template[] = [
  {
    id: "tmpl-1",
    name: "Facebook Feed Ad",
    category: "social-media",
    platform: "facebook",
    width: 1200,
    height: 628,
    thumbnail: "/templates/fb-feed.svg",
    isPremium: false,
  },
  {
    id: "tmpl-2",
    name: "Instagram Post",
    category: "social-media",
    platform: "instagram",
    width: 1080,
    height: 1080,
    thumbnail: "/templates/ig-post.svg",
    isPremium: false,
  },
  {
    id: "tmpl-3",
    name: "Instagram Story",
    category: "story",
    platform: "instagram",
    width: 1080,
    height: 1920,
    thumbnail: "/templates/ig-story.svg",
    isPremium: false,
  },
  {
    id: "tmpl-4",
    name: "Google Display Banner",
    category: "display",
    platform: "google",
    width: 728,
    height: 90,
    thumbnail: "/templates/google-display.svg",
    isPremium: false,
  },
  {
    id: "tmpl-5",
    name: "LinkedIn Sponsored",
    category: "social-media",
    platform: "linkedin",
    width: 1200,
    height: 627,
    thumbnail: "/templates/linkedin.svg",
    isPremium: true,
  },
  {
    id: "tmpl-6",
    name: "Twitter/X Post",
    category: "social-media",
    platform: "twitter",
    width: 1600,
    height: 900,
    thumbnail: "/templates/twitter.svg",
    isPremium: false,
  },
  {
    id: "tmpl-7",
    name: "YouTube Thumbnail",
    category: "video-thumbnail",
    platform: "youtube",
    width: 1280,
    height: 720,
    thumbnail: "/templates/youtube.svg",
    isPremium: true,
  },
  {
    id: "tmpl-8",
    name: "Pinterest Pin",
    category: "social-media",
    platform: "pinterest",
    width: 1000,
    height: 1500,
    thumbnail: "/templates/pinterest.svg",
    isPremium: false,
  },
  {
    id: "tmpl-9",
    name: "TikTok Ad",
    category: "story",
    platform: "tiktok",
    width: 1080,
    height: 1920,
    thumbnail: "/templates/tiktok.svg",
    isPremium: true,
  },
  {
    id: "tmpl-10",
    name: "Email Header",
    category: "email",
    platform: "google",
    width: 600,
    height: 200,
    thumbnail: "/templates/email.svg",
    isPremium: false,
  },
  {
    id: "tmpl-11",
    name: "Facebook Story",
    category: "story",
    platform: "facebook",
    width: 1080,
    height: 1920,
    thumbnail: "/templates/fb-story.svg",
    isPremium: false,
  },
  {
    id: "tmpl-12",
    name: "Google Responsive",
    category: "display",
    platform: "google",
    width: 300,
    height: 250,
    thumbnail: "/templates/google-responsive.svg",
    isPremium: true,
  },
];

const headlinePool = [
  "Transform Your Workflow Today",
  "Unlock Your Full Potential",
  "The Future of Productivity",
  "Built for Modern Teams",
  "Scale Without Limits",
  "Fresh, Organic, Delivered",
  "Nature's Best, Your Health",
  "Fuel Your Performance",
  "Push Beyond Your Limits",
  "Train Harder, Recover Faster",
];

const ctaPool = [
  "Get Started Free",
  "Try It Now",
  "Shop Now",
  "Learn More",
  "Sign Up Today",
  "Claim Your Offer",
  "Start Free Trial",
  "Book a Demo",
];

export const creatives: Creative[] = Array.from({ length: 24 }, (_, i) => {
  const brand = brands[i % 3];
  const template = templates[i % templates.length];
  return {
    id: `creative-${i + 1}`,
    name: `${brand.name} - ${template.platform} Ad ${Math.floor(i / 3) + 1}`,
    brandId: brand.id,
    templateId: template.id,
    platform: template.platform,
    width: template.width,
    height: template.height,
    headline: headlinePool[i % headlinePool.length],
    description: `Compelling ad copy for ${brand.name} targeting engaged audiences.`,
    ctaText: ctaPool[i % ctaPool.length],
    imageUrl: `/creatives/creative-${(i % 6) + 1}.svg`,
    score: Math.floor(Math.random() * 30) + 70,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 86400000
    ).toISOString(),
    status: "ready",
  };
});

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Q1 Product Launch",
    brandId: "brand-1",
    description: "Launch campaign for TechFlow 2.0 features",
    creativeCount: 12,
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-02-20T00:00:00Z",
    status: "active",
  },
  {
    id: "proj-2",
    name: "Spring Collection",
    brandId: "brand-2",
    description: "Spring menu launch and seasonal promotions",
    creativeCount: 8,
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-02-18T00:00:00Z",
    status: "active",
  },
  {
    id: "proj-3",
    name: "Marathon Training Series",
    brandId: "brand-3",
    description: "Targeted campaign for marathon runners",
    creativeCount: 15,
    createdAt: "2025-12-10T00:00:00Z",
    updatedAt: "2026-02-22T00:00:00Z",
    status: "active",
  },
  {
    id: "proj-4",
    name: "Holiday Promo 2025",
    brandId: "brand-1",
    description: "End of year holiday sale campaign",
    creativeCount: 20,
    createdAt: "2025-11-01T00:00:00Z",
    updatedAt: "2025-12-31T00:00:00Z",
    status: "completed",
  },
  {
    id: "proj-5",
    name: "Brand Awareness Push",
    brandId: "brand-2",
    description: "Brand awareness across social channels",
    creativeCount: 6,
    createdAt: "2026-02-10T00:00:00Z",
    updatedAt: "2026-02-24T00:00:00Z",
    status: "active",
  },
];

export const dashboardStats: DashboardStats = {
  totalCreatives: 247,
  totalProjects: 12,
  totalBrands: 3,
  avgScore: 82,
  creativesThisMonth: 34,
  topPlatform: "instagram",
};

export function getPlatformLabel(platform: string): string {
  const labels: Record<string, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    google: "Google Ads",
    linkedin: "LinkedIn",
    twitter: "X / Twitter",
    tiktok: "TikTok",
    youtube: "YouTube",
    pinterest: "Pinterest",
  };
  return labels[platform] || platform;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "social-media": "Social Media",
    display: "Display Ads",
    email: "Email",
    banner: "Banner",
    story: "Story / Vertical",
    "video-thumbnail": "Video Thumbnail",
  };
  return labels[category] || category;
}
