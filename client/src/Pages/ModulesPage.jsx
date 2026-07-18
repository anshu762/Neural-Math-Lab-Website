// src/pages/ModulesPage.jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Brain,
  Filter,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import curriculumIndex from "../../seed-content/curriculum-index.json";
import module1 from "../../seed-content/modules/module-1.json";
import module2 from "../../seed-content/modules/module-2.json";
import module3 from "../../seed-content/modules/module-3.json";
import module4 from "../../seed-content/modules/module-4.json";
import module5 from "../../seed-content/modules/module-5.json";
import module6 from "../../seed-content/modules/module-6.json";
import module7 from "../../seed-content/modules/module-7.json";
import module8 from "../../seed-content/modules/module-8.json";


export default function ModulesPage() {
  const navigate = useNavigate();
  const modules = curriculumIndex?.modules ?? [];
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

  // We don't have gradeBand/strand in your JSON yet, so we keep filters minimal and future‑proof.
  // You can add gradeBand/strand later to curriculum-index.json and this will just start working.
  const [search, setSearch] = useState("");

  const filteredModules = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return modules;
    return modules.filter((m) => {
      const title = (m.title || "").toLowerCase();
      const theme = (m.theme || "").toLowerCase();
      const desc = (m.description || "").toLowerCase();
      return (
        title.includes(term) || theme.includes(term) || desc.includes(term)
      );
    });
  }, [modules, search]);

  return (
    <div className="space-y-10">
      {/* Hero / summary header */}
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
                Curriculum modules
              </Badge>
              <span className="text-xs text-muted-foreground">
                {modules.length > 0
                  ? `${modules.length} modules · from “Numbers Become Real” to “The Bridge to High School Algebra”`
                  : "No modules found"}
              </span>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl leading-tight sm:text-3xl">
                Explore the Neural Math Lab roadmap
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-relaxed sm:text-base">
                Eight modules form a single story: numbers become real, then
                powerful, then precise, and finally bridge into formal algebra.
                Each module is broken into units that all share the same neural‑inspired
                lesson structure.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 border-t border-border/60 pt-4 text-xs text-muted-foreground sm:grid-cols-3">
            <HeroFact
              icon={BookOpen}
              label="Module‑level themes"
              text="Each module is a chapter in the year‑long narrative, with its own big question and arc."
            />
            <HeroFact
              icon={Brain}
              label="Unit‑level structure"
              text="Every unit inside a module uses Big Idea, Hook, Building the Idea, Examples, Misconception, Practice, and Why This Matters Later."
            />
            <HeroFact
              icon={Sparkles}
              label="AI‑guided support"
              text="As you build module and unit pages, the AI layer can mirror this structure for hints and feedback."
            />
          </CardContent>
        </Card>
      </section>

      {/* Search / controls */}
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-teal-500" />
              <h2 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                Find a module
              </h2>
            </div>
            <p className="max-w-xl text-xs text-muted-foreground">
              Search by title, theme, or description. As you add more metadata
              like grade bands or strands to the JSON, this page can grow into a
              richer curriculum browser.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search modules…"
                className="h-9 w-56 rounded-full border border-border/70 bg-background px-3 text-xs outline-none ring-0 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Module cards grid */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {filteredModules.length} module
              {filteredModules.length === 1 ? "" : "s"} matching your view
            </p>
            <p className="text-xs text-muted-foreground">
              Open a module to explore its units, each of which will render the
              full Big Idea → Hook → Building the Idea → Examples → Misconception
              → Try It Yourself → Why This Matters Later structure.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredModules.length === 0 && (
            <Card>
              <CardContent className="pt-4 text-sm text-muted-foreground">
                No modules match the current search. Try a different term or check
                your{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  seed-content/curriculum-index.json
                </code>{" "}
                file.
              </CardContent>
            </Card>
          )}

         {filteredModules.map((mod, i) => {
            const slug = mod.slug;
            const order = mod.order ?? i + 1;
            const title = mod.title;
            const filePath = mod.file;

            return (
                <Card
                key={slug || i}
                className="group flex flex-col border-border/70 bg-background/80 transition-transform duration-200 hover:-translate-y-1 hover:border-teal-500/60 hover:shadow-lg hover:shadow-teal-500/10"
                >
                <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                    <Badge
                        variant="outline"
                        className="w-fit border-teal-500/60 bg-teal-500/5 text-[11px]"
                    >
                        <BookOpen className="mr-1 h-3 w-3" />
                        Module {order}
                    </Badge>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                        Core sequence
                    </span>
                    </div>
                    <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-3 text-xs sm:text-sm">
                    {mod.theme ||
                        mod.description ||
                        "A complete curriculum in concept‑driven units."}
                    </CardDescription>
                </CardHeader>

                {/* UPDATED CONTENT */}
                <CardContent className="space-y-2 pt-0 text-[11px] text-muted-foreground">
                    {(() => {
                    const details = moduleDetailsBySlug[slug];
                    const units = Array.isArray(details?.units) ? details.units : [];

                    const firstUnits = units
                        .slice()
                        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                        .slice(0, 3);

                    return (
                        <>
                        {details?.description && (
                            <p className="leading-snug">{details.description}</p>
                        )}

                        {firstUnits.length > 0 && (
                            <div className="space-y-1">
                            <p className="font-medium text-[11px] text-foreground">
                                Inside this module:
                            </p>
                            <ul className="space-y-0.5">
                                {firstUnits.map((u) => (
                                <li key={u.slug} className="flex items-center gap-1.5">
                                    <span className="h-1 w-1 rounded-full bg-teal-500" />
                                    <span className="truncate">
                                    Unit {u.order ?? "—"} — {u.title}
                                    </span>
                                </li>
                                ))}
                            </ul>
                            </div>
                        )}

                        {firstUnits.length === 0 && !details?.description && (
                            <p className="italic text-muted-foreground/80">
                            Module content will be loaded from{" "}
                            {filePath?.replace("./modules/", "")}.
                            </p>
                        )}
                        </>
                    );
                    })()}
                </CardContent>

                <CardFooter className="mt-auto flex items-center justify-between pt-2">
                    <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full px-3 text-xs"
                    onClick={() => {
                        if (slug) navigate(`/modules/${slug}`);
                    }}
                    >
                    View module
                    <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                    <span className="text-[11px] text-muted-foreground">
                    Structured unit pages coming next
                    </span>
                </CardFooter>
                </Card>
            );
            })}
        </div>
      </section>
    </div>
  );
}

/* --- Small presentational helpers --- */

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

function FilterGroup({ label, options, selected, onSelect }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] text-muted-foreground">{label}:</span>
      {options.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(active ? null : opt)}
            className={`rounded-full border px-2 py-0.5 text-[11px] ${
              active
                ? "border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-300"
                : "border-border/70 bg-background text-muted-foreground hover:border-teal-500/60"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}