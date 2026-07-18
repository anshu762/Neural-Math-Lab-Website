// src/pages/ModuleDetailPage.jsx
import { useMemo } from "react";
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
  ChevronRight,
  Layers,
  Sparkles,
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

export default function ModuleDetailPage() {
  const { moduleSlug } = useParams();
  const navigate = useNavigate();

  const modules = curriculumIndex?.modules ?? [];

  const { indexMeta, moduleData } = useMemo(() => {
    const meta = modules.find((m) => m.slug === moduleSlug) || null;
    const data = moduleSlug ? moduleDetailsBySlug[moduleSlug] || null : null;
    return { indexMeta: meta, moduleData: data };
  }, [modules, moduleSlug]);

  // Build units list (sorted by order)
  const units = useMemo(() => {
    if (!moduleData || !Array.isArray(moduleData.units)) return [];
    return moduleData.units
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [moduleData]);

  const moduleTitle = moduleData?.title || indexMeta?.title || "Module";
  const moduleOrder =
    moduleData?.order ?? indexMeta?.order ?? getFallbackOrder(modules, moduleSlug);
  const moduleTheme = moduleData?.theme;
  const moduleDescription =
    moduleData?.description ||
    "A complete module made up of concept‑driven units.";

  const hasData = !!indexMeta && !!moduleData;

  return (
    <div className="space-y-8">
      {/* Back link */}
      <button
        type="button"
        onClick={() => navigate("/modules")}
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to all modules
      </button>

      {/* Hero / module summary */}
      <section className="space-y-6">
        <Card className="relative overflow-hidden border-border/70 bg-background/80 shadow-lg shadow-teal-500/10 backdrop-blur-xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="border-teal-500/40 bg-teal-500/10 text-xs font-semibold tracking-tight text-teal-800 dark:text-teal-200"
              >
                <Layers className="mr-1 h-3 w-3" />
                Module {moduleOrder ?? "—"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Part of the Neural Math Lab sequence
              </span>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl leading-tight sm:text-3xl">
                {moduleTitle}
              </CardTitle>
              {moduleTheme && (
                <CardDescription className="max-w-2xl text-sm leading-relaxed sm:text-base">
                  {moduleTheme}
                </CardDescription>
              )}
              {!moduleTheme && (
                <CardDescription className="max-w-2xl text-sm leading-relaxed sm:text-base">
                  {moduleDescription}
                </CardDescription>
              )}
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 border-t border-border/60 pt-4 text-xs text-muted-foreground sm:grid-cols-3">
            <HeroFact
              icon={BookOpen}
              label="Units in this module"
              text={
                units.length > 0
                  ? `${units.length} unit${units.length === 1 ? "" : "s"}, each with a full lab sequence.`
                  : "Units will appear here as you connect the curriculum files."
              }
            />
            <HeroFact
              icon={Brain}
              label="Consistent structure"
              text="Every unit uses Big Idea, Hook, Building the Idea, Worked Examples, Misconception Alert, Try It Yourself, and Why This Matters Later."
            />
            <HeroFact
              icon={Sparkles}
              label="Neural‑inspired flow"
              text="The units are ordered carefully so the neural load builds gradually from concrete to abstract."
            />
          </CardContent>
        </Card>

        {!hasData && (
          <p className="text-xs text-destructive">
            This module could not be found. Check your{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              curriculum-index.json
            </code>{" "}
            and module JSON files.
          </p>
        )}
      </section>

      {/* Units list */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
              Units in this module
            </h2>
            <p className="text-xs text-muted-foreground">
              Open a unit to see the full lesson flow: Big Idea, Hook, Building
              the Idea, Worked Examples, Misconception Alert, Try It Yourself,
              and Why This Matters Later.
            </p>
          </div>
        </div>

        {units.length === 0 && (
          <Card>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              No units were found for this module. Make sure the corresponding{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                module-X.json
              </code>{" "}
              file has a <code>units</code> array.
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {units.map((unit) => (
            <Card
              key={unit.slug}
              className="group flex flex-col border-border/70 bg-background/80 transition-transform duration-200 hover:-translate-y-1 hover:border-teal-500/60 hover:shadow-lg hover:shadow-teal-500/10"
            >
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className="w-fit border-teal-500/60 bg-teal-500/5 text-[11px]"
                  >
                    <BookOpen className="mr-1 h-3 w-3" />
                    Unit {unit.order ?? "—"}
                  </Badge>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    Lab sequence
                  </span>
                </div>
                <CardTitle className="text-sm sm:text-base">
                  {unit.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2 pt-0 text-[11px] text-muted-foreground">
                {unit.bigIdea && (
                  <p className="line-clamp-3 leading-snug">
                    <span className="font-semibold text-foreground">
                      Big Idea:{" "}
                    </span>
                    {unit.bigIdea}
                  </p>
                )}
                {unit.hook && (
                  <p className="line-clamp-2 leading-snug">
                    <span className="font-semibold text-foreground">
                      Hook:{" "}
                    </span>
                    {unit.hook}
                  </p>
                )}
              </CardContent>

              <div className="mt-auto flex items-center justify-between border-t border-border/60 px-6 py-3 text-[11px]">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full px-3 text-xs"
                  onClick={() => {
                    if (moduleSlug && unit.slug) {
                      navigate(`/modules/${moduleSlug}/units/${unit.slug}`);
                    }
                  }}
                >
                  Open unit page
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
                <span className="text-muted-foreground">
                  Full section layout on next page
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

/* --- Helpers --- */

function HeroFact({ icon: Icon, label, text }) {
  return (
    <div className="flex gap-2 rounded-xl border border-border/60 bg-background/70 p-3 shadow-sm shadow-slate-900/5">
      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/10 text-teal-500">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="space-y-0.5">
        <div className="text-[11px] font-semibold text-foreground">{label}</div>
        <p className="text-[11px] leading-snug text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

function getFallbackOrder(modules, slug) {
  if (!slug) return null;
  const index = modules.findIndex((m) => m.slug === slug);
  return index >= 0 ? index + 1 : null;
}