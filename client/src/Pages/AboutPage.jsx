// src/pages/AboutPage.jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Sparkles,
  Layers,
  Lightbulb,
  BookOpen,
  Activity,
  Users,
  Beaker,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-64 max-w-6xl bg-gradient-to-b from-teal-500/25 via-blue-500/10 to-background blur-3xl" />
      </div>

      {/* 1. Hero: what Neural Math Lab is about */}
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
                <Sparkles className="mr-1 h-3 w-3" />
                About Neural Math Lab
              </Badge>
              <span className="text-xs text-muted-foreground">
                A curriculum built around how brains actually learn math
              </span>
            </div>

            <div className="space-y-3">
              <CardTitle className="text-balance text-2xl leading-tight sm:text-3xl lg:text-4xl">
                We started with one question:{" "}
                <span className="bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  what if math class felt like a lab, not a lecture?
                </span>
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-relaxed sm:text-base">
                Neural Math Lab is a structured set of lessons, not a random
                problem bank. Every unit follows the same neural‑inspired shape
                so students can predict what comes next and focus on the ideas,
                not the interface.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 border-t border-border/60 pt-4 text-xs text-muted-foreground sm:grid-cols-3">
            <HeroFact
              icon={Layers}
              label="Eight connected modules"
              text="From 'Numbers Become Real' to 'The Bridge to High School Algebra', each module is a chapter in a single narrative."
            />
            <HeroFact
              icon={Brain}
              label="Neural‑aligned design"
              text="Concrete, visual, and story‑based representations come first, then symbols — mirroring how brains learn best."
            />
            <HeroFact
              icon={Users}
              label="For classrooms and beyond"
              text="Use it as a core course, an intervention lab, or a guided self‑study path for motivated learners."
            />
          </CardContent>
        </Card>
      </section>

      {/* 2. Design principles */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Our design principles
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            The curriculum and the interface are built around a few non‑negotiable
            ideas about how students learn mathematics deeply, not just for the
            next test.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <PrincipleCard
            icon={Lightbulb}
            title="Ideas before procedures"
            text="Every unit starts by naming a Big Idea and a Hook. The goal is to anchor new procedures to something that already feels meaningful."
          />
          <PrincipleCard
            icon={Beaker}
            title="Lab, not worksheet"
            text="Students experiment with objects, drawings, and stories before they ever see a formal rule. The interface is a lab bench, not a multiple‑choice grid."
          />
          <PrincipleCard
            icon={Activity}
            title="Predictable structure"
            text="Big Idea, Hook, Building the Idea, Worked Examples, Misconception, Try It Yourself, Why This Matters Later — every time, every unit."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <PrincipleCard
            icon={BookOpen}
            title="Language that students own"
            text="Misconceptions are named in plain language. Worked examples model how to explain, not just get answers."
          />
          <PrincipleCard
            icon={Sparkles}
            title="AI as a coach"
            text="The AI layer is designed to follow the same pedagogy: nudging the next idea, not bypassing the struggle with a solution."
          />
          <PrincipleCard
            icon={Users}
            title="Teacher‑centered controls"
            text="Future releases focus on pacing, visibility, and control tools so teachers stay in charge of the learning arc."
          />
        </div>
      </section>

      {/* 3. Lesson timeline: how a unit feels */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            What a Neural Math Lab unit feels like
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            No matter which module you open, a unit page feels like moving
            through the same small story — from curiosity to confidence.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 hidden w-px bg-border/70 md:block" />

          <div className="space-y-4">
            {[
              {
                label: "Big Idea",
                description:
                  "We name the concept in plain language, so students know what today is really about.",
              },
              {
                label: "Hook",
                description:
                  "A short scenario, image, or question that makes the idea feel necessary or a little surprising.",
              },
              {
                label: "Building the Idea",
                description:
                  "Hands‑on activities and prompts that let students see and test the idea before we formalize it.",
              },
              {
                label: "Worked Examples",
                description:
                  "Model solutions that showcase clear reasoning, not just finished answers.",
              },
              {
                label: "Misconception Alert",
                description:
                  "We surface and name the most common wrong turn so it loses its power later.",
              },
              {
                label: "Try It Yourself",
                description:
                  "Students practice on their own or in pairs, with AI hints mirroring the same structure.",
              },
              {
                label: "Why This Matters Later",
                description:
                  "We connect today’s idea forward — to later modules, algebra, or real‑world applications.",
              },
            ].map((step, idx) => (
              <TimelineItem
                key={step.label}
                index={idx + 1}
                label={step.label}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Call‑to‑action back into product */}
      <section className="rounded-2xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 px-6 py-8 shadow-sm shadow-teal-500/20 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1.5">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              See the principles in an actual unit.
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Open any module, pick a unit, and you will see this structure
              faithfully rendered: Big Idea, Hook, Building the Idea, Worked
              Examples, Misconception, Try It, and Why This Matters Later.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              className="rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-sm font-semibold shadow-md shadow-teal-500/40 hover:from-teal-400 hover:to-blue-400"
              asChild
            >
              <a href="/modules" className="inline-flex items-center gap-1.5">
                Browse modules
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Button>
            {/* <Button variant="outline" className="rounded-full text-sm" asChild>
              <a href="/">Back to home</a>
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
}

/* --- small subcomponents --- */

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

function PrincipleCard({ icon: Icon, title, text }) {
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

function TimelineItem({ index, label, description }) {
  return (
    <div className="relative flex gap-3 md:pl-8">
      {/* vertical line + dot (desktop) */}
      <div className="relative hidden md:block">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-border/70" />
        <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-[10px] font-semibold text-white">
            {index}
          </span>
        </div>
      </div>

      {/* content */}
      <Card className="flex-1 border-border/70 bg-background/90">
        <CardContent className="flex flex-col gap-1.5 pt-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-foreground">
              {label}
            </span>
            <span className="md:hidden inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-[10px] font-semibold text-white">
              {index}
            </span>
          </div>
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}