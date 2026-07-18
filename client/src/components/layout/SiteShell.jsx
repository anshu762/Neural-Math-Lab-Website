// src/components/layout/SiteShell.jsx
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Link } from "react-router-dom";

export function SiteShell({ dark, onToggleDark, health, children }) {
  const isConnected = !!health?.data && !health?.error;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader dark={dark} onToggleDark={onToggleDark} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="w-full animate-fade-in">
          {children}
        </div>
      </main>

      <footer className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6">
          <div className="grid gap-6 text-sm text-muted-foreground sm:grid-cols-[2fr_1fr_1fr]">
            <div className="space-y-2">
              <div className="font-heading text-base font-semibold text-foreground">
                Neural Math Lab
              </div>
              <p>
                Self-paced, AI-guided lessons built around big ideas, not just
                procedures.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                Explore
              </div>
              <div className="flex flex-col gap-1">
                <Link to="/" className="hover:text-foreground/90">
                  Home
                </Link>
                <Link to="/modules" className="hover:text-foreground/90">
                  Modules
                </Link>
                <Link to="/about" className="hover:text-foreground/90">
                  About the approach
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
                Curriculum
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">
                  Concrete to abstract
                </span>
                <span className="text-muted-foreground">
                  Big ideas and misconceptions
                </span>
                <span className="text-muted-foreground">
                  Teacher & AI co-pilots
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-2 border-t border-border/40 pt-4 text-xs text-muted-foreground sm:flex-row">
            <span>© {new Date().getFullYear()} Neural Math Lab.</span>
            <span>Designed for classrooms, tutors, and self-learners.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}



















// import { SiteHeader } from "@/components/layout/SiteHeader";

// export function SiteShell({ dark, onToggleDark, children }) {
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <SiteHeader dark={dark} onToggleDark={onToggleDark} />
//       <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
//       <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground sm:px-6">
//         Built for self-paced, AI-guided math learning.
//       </footer>
//     </div>
//   );
// }