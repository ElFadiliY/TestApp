"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Globe,
  Type,
  ExternalLink,
  X,
} from "lucide-react";
import { brands as initialBrands } from "@/lib/mock-data";
import type { Brand } from "@/lib/types";

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const [formData, setFormData] = useState<Omit<Brand, "id">>({
    name: "",
    primaryColor: "#6366f1",
    secondaryColor: "#06b6d4",
    accentColor: "#f97316",
    fonts: ["Inter"],
    description: "",
    website: "",
  });

  const openNewForm = () => {
    setEditingBrand(null);
    setFormData({
      name: "",
      primaryColor: "#6366f1",
      secondaryColor: "#06b6d4",
      accentColor: "#f97316",
      fonts: ["Inter"],
      description: "",
      website: "",
    });
    setShowForm(true);
  };

  const openEditForm = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      primaryColor: brand.primaryColor,
      secondaryColor: brand.secondaryColor,
      accentColor: brand.accentColor,
      fonts: brand.fonts,
      description: brand.description,
      website: brand.website || "",
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editingBrand) {
      setBrands(
        brands.map((b) =>
          b.id === editingBrand.id ? { ...b, ...formData } : b
        )
      );
    } else {
      setBrands([
        ...brands,
        { id: `brand-${Date.now()}`, ...formData },
      ]);
    }
    setShowForm(false);
    setEditingBrand(null);
  };

  const handleDelete = (id: string) => {
    setBrands(brands.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brand Profiles</h1>
          <p className="mt-1 text-sm text-muted">
            Manage your brand identities. Every generated creative will stay
            on-brand.
          </p>
        </div>
        <button
          onClick={openNewForm}
          className="flex items-center gap-2 rounded-lg gradient-bg px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Brand
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg"
          >
            <div
              className="h-24 relative"
              style={{
                background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.secondaryColor})`,
              }}
            >
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditForm(brand)}
                  className="rounded-lg bg-white/90 p-1.5 hover:bg-white transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="rounded-lg bg-white/90 p-1.5 text-danger hover:bg-white transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="p-6 -mt-8">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg border-4 border-white"
                style={{ backgroundColor: brand.primaryColor }}
              >
                {brand.name.charAt(0)}
              </div>

              <h3 className="mt-4 text-lg font-semibold">{brand.name}</h3>
              <p className="mt-1 text-sm text-muted">{brand.description}</p>

              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Globe className="h-3 w-3" />
                  {brand.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}

              <div className="mt-4">
                <div className="text-xs font-medium text-muted mb-2">
                  Brand Colors
                </div>
                <div className="flex gap-2">
                  {[
                    { color: brand.primaryColor, label: "Primary" },
                    { color: brand.secondaryColor, label: "Secondary" },
                    { color: brand.accentColor, label: "Accent" },
                  ].map((c) => (
                    <div key={c.label} className="text-center">
                      <div
                        className="h-8 w-8 rounded-lg shadow-sm border border-border"
                        style={{ backgroundColor: c.color }}
                      />
                      <div className="mt-1 text-[10px] text-muted">
                        {c.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-medium text-muted mb-2">Fonts</div>
                <div className="flex flex-wrap gap-1.5">
                  {brand.fonts.map((font) => (
                    <span
                      key={font}
                      className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium"
                    >
                      <Type className="h-3 w-3 text-muted" />
                      {font}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingBrand ? "Edit Brand" : "New Brand"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-1.5 text-muted hover:bg-surface-hover"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium">Brand Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. My Brand"
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of the brand..."
                  rows={2}
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="https://..."
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand Colors
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      key: "primaryColor" as const,
                      label: "Primary",
                      value: formData.primaryColor,
                    },
                    {
                      key: "secondaryColor" as const,
                      label: "Secondary",
                      value: formData.secondaryColor,
                    },
                    {
                      key: "accentColor" as const,
                      label: "Accent",
                      value: formData.accentColor,
                    },
                  ].map((c) => (
                    <div key={c.key}>
                      <label className="text-xs text-muted">{c.label}</label>
                      <div className="mt-1 flex items-center gap-2">
                        <input
                          type="color"
                          value={c.value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [c.key]: e.target.value,
                            })
                          }
                          className="h-9 w-9 rounded-lg border border-border cursor-pointer"
                        />
                        <input
                          type="text"
                          value={c.value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [c.key]: e.target.value,
                            })
                          }
                          className="flex-1 rounded-lg border border-border px-3 py-1.5 text-xs font-mono focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Brand Preview
                </label>
                <div
                  className="mt-2 rounded-xl p-4"
                  style={{
                    background: `linear-gradient(135deg, ${formData.primaryColor}20, ${formData.secondaryColor}20)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: formData.primaryColor }}
                    >
                      {formData.name.charAt(0) || "?"}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {formData.name || "Brand Name"}
                      </div>
                      <div className="text-xs text-muted">
                        {formData.description || "Brand description"}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div
                      className="rounded-lg px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: formData.primaryColor }}
                    >
                      Primary Button
                    </div>
                    <div
                      className="rounded-lg px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: formData.accentColor }}
                    >
                      Accent Button
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-hover transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formData.name}
                  className="flex-1 rounded-lg gradient-bg px-4 py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {editingBrand ? "Save Changes" : "Create Brand"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
