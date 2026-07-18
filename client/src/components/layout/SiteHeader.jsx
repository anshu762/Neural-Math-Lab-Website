// src/components/layout/SiteHeader.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { MoonStar, SunMedium, Sparkles, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinkBase =
  "text-sm font-medium transition-colors duration-200 hover:text-foreground/90";
const navLinkInactive = "text-muted-foreground";
const navLinkActive =
  "text-foreground relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-100 after:bg-gradient-to-r after:from-teal-500 after:to-blue-500 after:rounded-full";

export function SiteHeader({ dark, onToggleDark }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="group flex items-center gap-3"
        >
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-blue-600 text-white shadow-sm shadow-teal-500/40 transition-transform duration-200 group-hover:scale-105"
          >
            <BrainCircuit className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none text-left">
            <span className="font-heading text-sm font-semibold tracking-tight sm:text-base">
              Neural Math Lab
            </span>
            <span className="text-xs text-muted-foreground">
              AI-guided math curriculum
            </span>
          </span>
        </button>

        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden items-center gap-4 sm:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/modules"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              Modules
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
              }
            >
              About
            </NavLink>
          </nav>

          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle dark mode"
            onClick={onToggleDark}
            className="h-9 w-9 rounded-full border-border/70 shadow-sm hover:bg-background/70"
          >
            {dark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </Button>

          <Button
            size="sm"
            className="hidden rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-xs font-semibold text-white shadow-sm shadow-teal-500/40 hover:from-teal-400 hover:to-blue-400 sm:inline-flex"
            onClick={() => navigate("/modules")}
          >
            Start learning
          </Button>
        </div>
      </div>
    </header>
  );
}




























// import { MoonStar, SunMedium, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export function SiteHeader({ dark, onToggleDark }) {
//   return (
//     <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
//       <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
//         <a href="/" className="flex items-center gap-3">
//           <span
//             aria-hidden
//             className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-blue-600 text-white shadow-sm"
//           >
//             <Sparkles className="h-5 w-5" />
//           </span>
//           <span className="flex flex-col leading-none">
//             <span className="font-heading text-sm font-semibold tracking-tight sm:text-base">
//               Neural Math Lab
//             </span>
//             <span className="text-xs text-muted-foreground">AI-guided math curriculum</span>
//           </span>
//         </a>
//         <Button
//           variant="outline"
//           size="icon"
//           aria-label="Toggle dark mode"
//           onClick={onToggleDark}
//         >
//           {dark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
//         </Button>
//       </div>
//     </header>
//   );
// }