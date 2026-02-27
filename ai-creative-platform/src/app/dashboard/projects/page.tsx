"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  FolderOpen,
  Clock,
  ArrowRight,
  Search,
  X,
  Pencil,
  Trash2,
  Layers,
} from "lucide-react";
import { clsx } from "clsx";
import { projects as initialProjects, brands } from "@/lib/mock-data";
import type { Project } from "@/lib/types";

const statusConfig = {
  active: { label: "Active", class: "bg-success/10 text-success" },
  paused: { label: "Paused", class: "bg-yellow-100 text-yellow-700" },
  completed: { label: "Completed", class: "bg-surface text-muted" },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    brandId: brands[0]?.id || "",
    description: "",
  });

  const filtered = projects.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const openNewForm = () => {
    setEditingProject(null);
    setFormData({ name: "", brandId: brands[0]?.id || "", description: "" });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? { ...p, ...formData, updatedAt: new Date().toISOString() }
            : p
        )
      );
    } else {
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        ...formData,
        creativeCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active",
      };
      setProjects([newProject, ...projects]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="mt-1 text-sm text-muted">
            Organize your ad campaigns into projects for better management.
          </p>
        </div>
        <button
          onClick={openNewForm}
          className="flex items-center gap-2 rounded-lg gradient-bg px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all"
        >
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-border bg-white py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex gap-2">
          {["all", "active", "paused", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                statusFilter === status
                  ? "bg-primary text-white"
                  : "bg-surface text-muted hover:bg-surface-hover"
              )}
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => {
          const brand = brands.find((b) => b.id === project.brandId);
          const status = statusConfig[project.status];
          return (
            <div
              key={project.id}
              className="group rounded-xl border border-border bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: brand?.primaryColor || "#6366f1" }}
                  >
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <span
                      className={clsx(
                        "inline-block rounded-full px-2 py-0.5 text-xs font-medium mt-0.5",
                        status.class
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setFormData({
                        name: project.name,
                        brandId: project.brandId,
                        description: project.description,
                      });
                      setShowForm(true);
                    }}
                    className="rounded-lg p-1.5 text-muted hover:bg-surface-hover"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="rounded-lg p-1.5 text-danger hover:bg-danger/5"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-sm text-muted line-clamp-2">
                {project.description}
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: brand?.primaryColor }}
                  />
                  {brand?.name}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  {project.creativeCount} creatives
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </span>
                <Link
                  href="/dashboard/creatives"
                  className="flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  View Creatives
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-border bg-white p-12 text-center">
          <FolderOpen className="mx-auto h-12 w-12 text-muted" />
          <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
          <p className="mt-2 text-sm text-muted">
            Create a new project to organize your ad campaigns.
          </p>
          <button
            onClick={openNewForm}
            className="mt-4 inline-flex items-center gap-2 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl mx-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingProject ? "Edit Project" : "New Project"}
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
                <label className="block text-sm font-medium">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Q1 Launch Campaign"
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Brand</label>
                <select
                  value={formData.brandId}
                  onChange={(e) =>
                    setFormData({ ...formData, brandId: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the campaign goals..."
                  rows={3}
                  className="mt-1.5 w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
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
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
