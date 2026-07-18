// src/pages/UnitPage.jsx
import { useMemo, useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Lightbulb,
  Beaker,
  AlertTriangle,
  PencilLine,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import curriculumIndex from "../../seed-content/curriculum-index.json";
import module1 from "../../seed-content/modules/module-1.json";
import module2 from "../../seed-content/modules/module-2.json";
import module3 from "../../seed-content/modules/module-3.json";
import module4 from "../../seed-content/modules/module-4.json";
import module5 from "../../seed-content/modules/module-5.json";
import module6 from "../../seed-content/modules/module-6.json";
import module7 from "../../seed-content/modules/module-7.json";
import module8 from "../../seed-content/modules/module-8.json";

const moduleDetailsBySlug = {
  "module-1": module1,
  "module-2": module2,
  "module-3": module3,
  "module-4": module4,
  "module-5": module5,
  "module-6": module6,
  "module-7": module7,
  "module-8": module8,
};

const SECTION_CONFIG = [
  {
    id: "big-idea",
    label: "Big Idea",
    key: "bigIdea",
    icon: Brain,
    accentClass: "border-teal-500/60 bg-teal-500/5",
  },
  {
    id: "hook",
    label: "Hook",
    key: "hook",
    icon: Lightbulb,
    accentClass: "border-amber-500/60 bg-amber-500/5",
  },
  {
    id: "building-the-idea",
    label: "Building the Idea",
    key: "buildingTheIdea",
    icon: Beaker,
    accentClass: "border-sky-500/60 bg-sky-500/5",
  },
  {
    id: "worked-examples",
    label: "Worked Examples",
    key: "workedExamples",
    icon: BookOpen,
    accentClass: "border-indigo-500/60 bg-indigo-500/5",
  },
  {
    id: "misconception-alert",
    label: "Misconception Alert",
    key: "misconceptionAlert",
    icon: AlertTriangle,
    accentClass: "border-rose-500/60 bg-rose-500/5",
  },
  {
    id: "try-it-yourself",
    label: "Try It Yourself",
    key: "tryItYourself",
    icon: PencilLine,
    accentClass: "border-emerald-500/60 bg-emerald-500/5",
  },
  {
    id: "why-this-matters-later",
    label: "Why This Matters Later",
    key: "whyThisMattersLater",
    icon: Sparkles,
    accentClass: "border-purple-500/60 bg-purple-500/5",
  },
];

export default function UnitPage() {
  const { moduleSlug, unitSlug } = useParams();
  const navigate = useNavigate();
  

  const modules = curriculumIndex?.modules ?? [];

  const { moduleMeta, moduleData, unit } = useMemo(() => {
    const meta = modules.find((m) => m.slug === moduleSlug) || null;
    const data = moduleSlug ? moduleDetailsBySlug[moduleSlug] || null : null;

    let foundUnit = null;
    if (data && Array.isArray(data.units)) {
      foundUnit =
        data.units.find((u) => u.slug === unitSlug) ||
        data.units.find((u) => String(u.order) === String(unitSlug)) ||
        null;
    }

    return { moduleMeta: meta, moduleData: data, unit: foundUnit };
  }, [modules, moduleSlug, unitSlug]);

  const unitTitle = unit?.title || "Unit";
  const unitOrder = unit?.order ?? null;
  const moduleTitle = moduleData?.title || moduleMeta?.title || "Module";

  // refs for sections to enable scroll + active highlight
  const sectionRefs = useRef(
    SECTION_CONFIG.reduce((acc, section) => {
      acc[section.id] = null;
      return acc;
    }, {})
  );
  const [activeSectionId, setActiveSectionId] = useState(SECTION_CONFIG[0].id);

  // Intersection observer to update active section on scroll
  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) {
        const id = visible[0].target.getAttribute("data-section-id");
        if (id) setActiveSectionId(id);
      }
    },
    {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.1,
    }
  );

  const elements = Object.values(sectionRefs.current).filter(Boolean);
  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const missingUnit = !unit || !moduleData;

  return (
    <div className="space-y-8">
      {/* Breadcrumb / back links */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <button
          type="button"
          onClick={() => navigate("/modules")}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          All modules
        </button>
        <span>/</span>
        {moduleSlug && (
          <button
            type="button"
            onClick={() => navigate(`/modules/${moduleSlug}`)}
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <span>{moduleTitle}</span>
          </button>
        )}
        <span>/</span>
        <span className="text-foreground">{unitTitle}</span>
      </div>

      {/* Header */}
      <section>
        <Card className="relative overflow-hidden border-border/70 bg-background/80 shadow-lg shadow-teal-500/10 backdrop-blur-xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {unitOrder != null && (
                <Badge
                  variant="secondary"
                  className="border-teal-500/40 bg-teal-500/10 text-xs font-semibold tracking-tight text-teal-800 dark:text-teal-200"
                >
                  <BookOpen className="mr-1 h-3 w-3" />
                  Unit {unitOrder}
                </Badge>
              )}
              {moduleTitle && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                  In {moduleTitle}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl leading-tight sm:text-3xl">
                {unitTitle}
              </CardTitle>
              {unit?.bigIdea && (
                <CardDescription className="max-w-2xl text-sm leading-relaxed sm:text-base">
                  {unit.bigIdea}
                </CardDescription>
              )}
            </div>
          </CardHeader>
        </Card>

        {missingUnit && (
          <p className="mt-3 text-xs text-destructive">
            This unit could not be found. Check the{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              module-X.json
            </code>{" "}
            file for a matching <code>slug</code> and <code>order</code>.
          </p>
        )}
      </section>

      {/* Layout: sticky section nav + content */}
      {!missingUnit && (
        <section className="grid gap-6 lg:grid-cols-[0.32fr_0.68fr]">
          {/* Sticky section nav */}
          <aside className="lg:sticky lg:top-28">
            <Card className="border-border/70 bg-background/80">
              <CardHeader className="pb-3">
                <p className="text-xs font-semibold tracking-tight text-foreground">
                  Lesson sections
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Jump to any part of the unit flow. The structure is identical
                  across all units.
                </p>
              </CardHeader>
              <CardContent className="space-y-1.5 pt-0">
                {SECTION_CONFIG.map((section) => {
                  const Icon = section.icon;
                  const hasContent = !!unit[section.key];
                  if (!hasContent) return null;

                  const isActive = activeSectionId === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`flex w-full items-center justify-between rounded-full border px-3 py-1.5 text-left text-[11px] transition-colors ${
                        isActive
                          ? "border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-200"
                          : "border-border/70 bg-background hover:border-teal-500/60"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                          <Icon className="h-3 w-3" />
                        </span>
                        <span className="font-medium">{section.label}</span>
                      </span>
                      <ArrowRight className="h-3 w-3 opacity-60" />
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </aside>

          {/* Main content sections */}
          <div className="space-y-6">
            {SECTION_CONFIG.map((section) => {
              const Icon = section.icon;
              const value = unit[section.key];
              if (value == null) return null;

              const isArray = Array.isArray(value);

              return (
  <Card
    key={section.id}
    className={`border ${section.accentClass} bg-background/90 shadow-sm shadow-slate-900/5`}
  >
    <div
      ref={(el) => {
        sectionRefs.current[section.id] = el;
      }}
      data-section-id={section.id}
    >
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Icon className="h-4 w-4" />
          </span>
          <div className="space-y-0.5">
            <CardTitle className="text-sm sm:text-base">
              {section.label}
            </CardTitle>
            <CardDescription className="text-[11px]">
              {getSectionSubtitle(section.id)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {isArray ? (
          <ul className="space-y-2 text-[13px]">
            {value.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-2 rounded-lg bg-muted/50 p-2"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13px] whitespace-pre-line">{value}</p>
        )}
      </CardContent>
    </div>
  </Card>
);
            })}
          </div>
        </section>
      )}
    </div>
  );
}

/* --- helper: subtitles per section --- */

function getSectionSubtitle(id) {
  switch (id) {
    case "big-idea":
      return "The conceptual heartbeat of the unit.";
    case "hook":
      return "A concrete, curious starting point that makes the math feel real.";
    case "building-the-idea":
      return "Hands‑on work and discussion that grow the idea step by step.";
    case "worked-examples":
      return "Fully modeled problems that show what strong explanations look like.";
    case "misconception-alert":
      return "The most common wrong turn, named and fixed directly.";
    case "try-it-yourself":
      return "Carefully chosen practice to test and deepen understanding.";
    case "why-this-matters-later":
      return "A glimpse of where this idea will show up in later modules.";
    default:
      return "";
  }
}