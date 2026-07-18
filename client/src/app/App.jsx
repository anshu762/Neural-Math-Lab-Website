// src/app/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SiteShell } from "@/components/layout/SiteShell";

import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import ModulesPage from "@/pages/ModulesPage";
import ModuleDetailPage from "@/pages/ModuleDetailPage";
import UnitPage from "@/pages/UnitPage";
import { AiChatWidget } from "@/components/chat/AiChatWidget";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("nml-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("nml-theme", dark ? "dark" : "light");
  }, [dark]);

  const [health, setHealth] = useState({ loading: true, data: null, error: "" });

  useEffect(() => {
    let active = true;
    const checkHealth = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/health`);
        if (!response.ok) throw new Error("Health check failed");
        const data = await response.json();
        if (active) setHealth({ loading: false, data, error: "" });
      } catch (error) {
        if (active) setHealth({ loading: false, data: null, error: error.message });
      }
    };
    checkHealth();
    return () => {
      active = false;
    };
  }, []);

  return (
    <SiteShell dark={dark} onToggleDark={() => setDark((d) => !d)} health={health}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/about" element={<AboutPage />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/modules/:moduleSlug" element={<ModuleDetailPage />} />
        <Route path="/modules/:moduleSlug/units/:unitSlug" element={<UnitPage />} /> 
        {/* Optional: 404 route */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      {/* Floating AI chat, independent of routes */}
    <AiChatWidget />
    </SiteShell>
  );
}






























// import { useEffect, useState } from "react";
// import { SiteShell } from "@/components/layout/SiteShell";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { BookOpen, CheckCircle2, Sparkles } from "lucide-react";
// import curriculumIndex from "../../seed-content/curriculum-index.json";

// const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// export default function App() {
//   const [dark, setDark] = useState(() => {
//     if (typeof window === "undefined") return false;
//     const saved = localStorage.getItem("nml-theme");
//     if (saved) return saved === "dark";
//     return window.matchMedia("(prefers-color-scheme: dark)").matches;
//   });

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//     localStorage.setItem("nml-theme", dark ? "dark" : "light");
//   }, [dark]);

//   const [health, setHealth] = useState({ loading: true, data: null, error: "" });

//   useEffect(() => {
//     let active = true;
//     const checkHealth = async () => {
//       try {
//         const response = await fetch(`${apiBaseUrl}/api/health`);
//         if (!response.ok) throw new Error("Health check failed");
//         const data = await response.json();
//         if (active) setHealth({ loading: false, data, error: "" });
//       } catch (error) {
//         if (active) setHealth({ loading: false, data: null, error: error.message });
//       }
//     };
//     checkHealth();
//     return () => {
//       active = false;
//     };
//   }, []);

//   const modules = curriculumIndex?.modules ?? [];

//   return (
//     <SiteShell dark={dark} onToggleDark={() => setDark((d) => !d)}>
//       <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
//         <Card>
//           <CardHeader>
//             <Badge variant="secondary" className="mb-2 w-fit">
//               <Sparkles className="mr-1" /> Self-paced, AI-guided
//             </Badge>
//             <CardTitle className="text-3xl leading-tight sm:text-4xl">
//               A math curriculum built on real understanding
//             </CardTitle>
//             <CardDescription className="text-base">
//               Eight modules, concrete-to-abstract lessons, and an AI guide that meets every
//               learner where they are.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="flex flex-wrap gap-3">
//             <Button>Start learning</Button>
//             <Button variant="outline">Browse curriculum</Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Backend status</CardTitle>
//             <CardDescription>Live connection check</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             {health.loading && <p className="text-sm text-muted-foreground">Checking connection...</p>}
//             {!health.loading && health.data && (
//               <div className="flex items-center gap-2 text-sm font-medium text-success">
//                 <CheckCircle2 className="h-4 w-4" /> Connected
//               </div>
//             )}
//             {!health.loading && health.error && (
//               <p className="text-sm font-medium text-destructive">{health.error}</p>
//             )}
//             <Progress value={health.loading ? 40 : health.data ? 100 : 10} />
//           </CardContent>
//         </Card>
//       </section>

//       <section className="mt-8">
//         <Tabs defaultValue="modules">
//           <TabsList>
//             <TabsTrigger value="modules">Modules</TabsTrigger>
//             <TabsTrigger value="about">About the approach</TabsTrigger>
//           </TabsList>
//           <TabsContent value="modules">
//             <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {modules.length === 0 && (
//                 <Card>
//                   <CardContent className="pt-4 text-sm text-muted-foreground">
//                     No curriculum modules found. Check seed-content/curriculum-index.json.
//                   </CardContent>
//                 </Card>
//               )}
//               {modules.map((mod, i) => (
//                 <Card key={mod.slug || i}>
//                   <CardHeader>
//                     <Badge variant="outline" className="mb-2 w-fit">
//                       <BookOpen className="mr-1" /> Module {mod.order ?? i + 1}
//                     </Badge>
//                     <CardTitle>{mod.title}</CardTitle>
//                     <CardDescription>{mod.theme || mod.description}</CardDescription>
//                   </CardHeader>
//                   <CardFooter>
//                     <Button variant="secondary" size="sm">
//                       View module
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//           <TabsContent value="about">
//             <Card className="mt-4">
//               <CardContent className="pt-4 text-sm leading-6 text-muted-foreground">
//                 Every lesson follows the same shape: a Big Idea, a Hook, hands-on discovery,
//                 worked examples, a named misconception, self-check problems, and a link to
//                 where the idea reappears later. Concepts are shown numerically, visually, and
//                 through story before any formal notation appears.
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </section>
//     </SiteShell>
//   );
// }
