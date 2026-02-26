export interface Brand {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fonts: string[];
  description: string;
  website?: string;
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  platform: Platform;
  width: number;
  height: number;
  thumbnail: string;
  isPremium: boolean;
}

export type TemplateCategory =
  | "social-media"
  | "display"
  | "email"
  | "banner"
  | "story"
  | "video-thumbnail";

export type Platform =
  | "facebook"
  | "instagram"
  | "google"
  | "linkedin"
  | "twitter"
  | "tiktok"
  | "youtube"
  | "pinterest";

export interface Creative {
  id: string;
  name: string;
  brandId: string;
  templateId: string;
  platform: Platform;
  width: number;
  height: number;
  headline: string;
  description: string;
  ctaText: string;
  imageUrl: string;
  score: number;
  createdAt: string;
  status: "generating" | "ready" | "archived";
}

export interface Project {
  id: string;
  name: string;
  brandId: string;
  description: string;
  creativeCount: number;
  createdAt: string;
  updatedAt: string;
  status: "active" | "paused" | "completed";
}

export interface GenerationRequest {
  brandId: string;
  templateId: string;
  platform: Platform;
  headline?: string;
  description?: string;
  ctaText?: string;
  targetAudience: string;
  tone: string;
  count: number;
}

export interface DashboardStats {
  totalCreatives: number;
  totalProjects: number;
  totalBrands: number;
  avgScore: number;
  creativesThisMonth: number;
  topPlatform: Platform;
}
