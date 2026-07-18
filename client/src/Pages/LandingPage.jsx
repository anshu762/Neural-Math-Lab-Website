// src/pages/LandingPage.jsx
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
  Brain,
  Sparkles,
  Wand2,
  LineChart,
  Users,
  BookOpen,
  LayoutTemplate,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="space-y-20 pb-8">
      {/* Background layer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-64 max-w-6xl bg-gradient-to-b from-teal-500/25 via-blue-500/10 to-background blur-3xl" />
      </div>

      {/* 1. Hero: what Neural Math Lab is */}
      <section className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
        {/* Left */}
        <Card className="relative overflow-hidden border-border/70 bg-background/80 shadow-lg shadow-teal-500/10 backdrop-blur-xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

          <CardHeader className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="border-teal-500/40 bg-teal-500/10 text-xs font-semibold tracking-tight text-teal-800 dark:text-teal-200"
              >
                <Sparkles className="mr-1 h-3 w-3" />
                AI‑guided math lab
              </Badge>
              <span className="text-xs text-muted-foreground">
                Concept‑first curriculum for grades 6–10
              </span>
            </div>

            <div className="space-y-3">
              <CardTitle className="text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl">
                A neural‑inspired math lab where{" "}
                <span className="bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  ideas come before formulas.
                </span>
              </CardTitle>
              <CardDescription className="max-w-xl text-base leading-relaxed sm:text-lg">
                Neural Math Lab is a digital math workspace that blends visual
                stories, manipulatives, and AI hints to help students build deep
                understanding—unit by unit, circuit by circuit.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button className="rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-sm font-semibold shadow-md shadow-teal-500/40 hover:from-teal-400 hover:to-blue-400">
                Preview a sample unit
              </Button>
              {/* <Button variant="outline" className="rounded-full text-sm">
                Talk to our team
              </Button> */}
              <span className="text-xs text-muted-foreground">
                Built for classrooms, tutors, and self‑paced learners.
              </span>
            </div>

            <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
              <HeroChip
                icon={BookOpen}
                label="Curriculum‑backed units"
                text="Each unit follows Big Idea → Hook → Discovery → Examples → Misconception → Practice."
              />
              <HeroChip
                icon={Brain}
                label="Neural‑inspired design"
                text="Lessons are sequenced to light up visual, spatial, and symbolic thinking."
              />
              <HeroChip
                icon={Users}
                label="Multi‑role ready"
                text="Use it as a core course, enrichment lab, or targeted intervention."
              />
            </div>
          </CardContent>
        </Card>

        {/* Right: product / illustration panel placeholder */}
        <ProductPreviewPanel />
      </section>

      {/* 2. What makes it different (feature grid) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            What lives inside Neural Math Lab?
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Not just videos or problem sets. Each unit is a mini lab experience:
            carefully sequenced sections, interactive prompts, and AI that knows
            when to push and when to slow down.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={LayoutTemplate}
            title="Structured unit pages"
            text="Every unit shares the same scaffold: Big Idea, Hook, Building the Idea, Worked Examples, Misconception Alert, Try It Yourself, and Why This Matters Later."
          />
          <FeatureCard
            icon={Wand2}
            title="AI as a co‑teacher"
            text="Hints, question prompts, and summary nudges that respect the pedagogy instead of skipping to the answer."
          />
          <FeatureCard
            icon={MessageCircle}
            title="Student‑friendly language"
            text="Explanations and prompts written like a coach sitting next to the learner, not a textbook paragraph."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={LineChart}
            title="Concept progress, not just scores"
            text="Track how students move through ideas over time—where misconceptions cluster and which hooks land best."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Classroom‑safe by design"
            text="Teacher controls, pacing tools, and guardrails so AI stays on‑task and aligned to your curriculum."
          />
          <FeatureCard
            icon={BookOpen}
            title="Curriculum‑aligned modules"
            text="Eight modules from number sense to algebra, each broken into digestible, story‑driven units."
          />
        </div>
      </section>

      {/* 3. How it works (3 steps) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            How Neural Math Lab fits into your day
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Whether you are a teacher, tutor, or independent learner, the flow is
            simple: pick a unit, launch the lab, and let the structure do the
            heavy lifting.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StepCard
            step="01"
            title="Choose a Big Idea"
            text="Select a module and unit that matches the concept you are teaching or learning—like ratios, linear relationships, or area models."
          />
          <StepCard
            step="02"
            title="Run the lab sequence"
            text="Move through Hook → Building the Idea → Examples with the built‑in prompts, visuals, and manipulatives."
          />
          <StepCard
            step="03"
            title="Capture the learning"
            text="Use Try It Yourself, AI hints, and Why This Matters Later to solidify the concept and surface any misconceptions."
          />
        </div>
      </section>

      {/* 4. Who it’s for / use cases */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Designed to feel at home wherever you teach
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Neural Math Lab is flexible by design. Drop it into your LMS, run it
            on a projector, or use it in one‑on‑one tutoring sessions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <UseCaseCard
            pill="Classrooms"
            title="Warm‑up to full lesson"
            text="Kick off with the Hook, build the idea together, then assign Try It Yourself as independent or small‑group work."
          />
          <UseCaseCard
            pill="Tutors"
            title="Diagnose and repair"
            text="Jump straight to a unit’s Misconception Alert to name the stuck point, then walk back through the examples."
          />
          <UseCaseCard
            pill="Self‑learners"
            title="Guided self‑study"
            text="Follow the same structure at your own pace, with AI as a coach that never gets tired of ‘one more example.’"
          />
        </div>
      </section>

      {/* 5. Final CTA / teaser for modules */}
      <section className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 px-6 py-8 shadow-sm shadow-teal-500/20 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1.5">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              Ready to see a unit in action?
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Explore a sample module, step through each section, and experience how
              Neural Math Lab turns abstract content into something students can
              actually feel.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/modules"><Button className="rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-sm font-semibold shadow-md shadow-teal-500/40 hover:from-teal-400 hover:to-blue-400">
              Browse modules
            </Button></a>
            {/* <Button variant="outline" className="rounded-full text-sm">
              Watch a short demo
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
}

/* --- Small presentational subcomponents --- */

function HeroChip({ icon: Icon, label, text }) {
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

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <Card className="h-full border-border/70 bg-background/80 shadow-sm shadow-slate-900/5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-teal-500/10">
      <CardContent className="space-y-3 pt-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function StepCard({ step, title, text }) {
  return (
    <Card className="h-full border-border/70 bg-background/80">
      <CardContent className="space-y-3 pt-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-3 py-1 text-[11px] font-medium text-teal-600 dark:text-teal-300">
          <span className="text-[10px] uppercase tracking-wide text-teal-500/90">
            Step
          </span>
          <span>{step}</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function UseCaseCard({ pill, title, text }) {
  return (
    <Card className="h-full border-border/70 bg-background/80">
      <CardContent className="space-y-3 pt-5">
        <span className="inline-flex w-fit items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {pill}
        </span>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductPreviewPanel() {
  // Placeholder for real illustration / screenshots
  return (
    <Card className="relative flex h-full flex-col overflow-hidden border-border/60 bg-gradient-to-br from-slate-950/90 via-slate-900/85 to-slate-950/95 text-slate-50 shadow-xl shadow-teal-500/20">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.45)_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-52 w-52 rounded-full bg-cyan-500/30 blur-3xl" />

      <CardContent className="relative z-10 flex flex-1 flex-col justify-between pt-5">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] text-slate-200">
            <PlayCircle className="h-3.5 w-3.5 text-cyan-300" />
            <span>Unit page preview</span>
          </div>
          <p className="text-xs text-slate-300">
            Imagine a unit page with Big Idea, Hook, and Try It Yourself stacked in a
            clean, scrollable flow—this panel is where your actual screenshots or
            illustration will live.
          </p>
        </div>

        <div className="mt-5 space-y-3 rounded-2xl border border-cyan-500/30 bg-slate-950/60 p-3 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-100">Unit: Proportional Relationships</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
              Live demo
            </span>
          </div>
          <div className="grid gap-2 text-slate-200 md:grid-cols-2">
            <MiniTag label="Big Idea" />
            <MiniTag label="Hook" />
            <MiniTag label="Building the Idea" />
            <MiniTag label="Worked Examples" />
            <MiniTag label="Misconception Alert" />
            <MiniTag label="Try It Yourself" />
            <MiniTag label="Why This Matters Later" />
          </div>
          <p className="mt-1 text-[10px] text-slate-400">
            The real product will replace this with interactive screenshots or a short
            looping video of the lab in action.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniTag({ label }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
      <span className="text-[10px] text-slate-100">{label}</span>
    </div>
  );
}