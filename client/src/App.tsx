import { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "next-themes";

// Pages
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import FindTutors from "@/pages/find-tutors";
import TutorProfile from "@/pages/tutor-profile";
import AuthPage from "@/pages/auth";
import TutorDashboard from "@/pages/tutor-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import PrivacyPolicy from "@/pages/privacy";
import AboutUs from "@/pages/about";
import HowItWorks from "@/pages/how-it-works";
import TermsOfService from "@/pages/terms";

import Contact from "@/pages/contact";
import Disclaimer from "@/pages/disclaimer";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import LocationPage from "@/pages/location/[city]";

function Router() {
  const [location] = useLocation();
  const pathname = location.split("?")[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  const mobileInterfaceRoutes = new Set([
    "/about",
    "/find-tutors",
    "/auth",
    "/how-it-works",
    "/terms",
    "/privacy",
    "/disclaimer",
    "/contact",
  ]);
  const useMobileInterface = mobileInterfaceRoutes.has(pathname);

  const pageContent = (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/location/:city" component={LocationPage} />
      <Route path="/find-tutors" component={FindTutors} />
      <Route path="/tutor/:id" component={TutorProfile} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/tutor-dashboard" component={TutorDashboard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/about" component={AboutUs} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/contact" component={Contact} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/blog" component={Blog} />
      <Route path="/student-dashboard">
        <Redirect to="/" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        {useMobileInterface ? (
          <div className="bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.08),_transparent_38%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.45))] px-2 py-3 sm:px-4 sm:py-6">
            <div className="mx-auto w-full max-w-[460px] md:max-w-6xl">
              <div className="overflow-hidden rounded-[34px] border border-border/70 bg-background/95 shadow-[0_26px_90px_hsl(var(--foreground)/0.10)] backdrop-blur-xl md:rounded-[28px] md:border-border/80 md:bg-card/95 md:shadow-[0_30px_120px_hsl(var(--foreground)/0.12)]">
                <div className="border-b border-border/60 px-4 py-3 md:px-5 md:py-3.5">
                  <div className="flex items-center justify-center gap-1.5 md:hidden">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/35" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
                  </div>
                  <div className="hidden items-center justify-between md:flex">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-sm bg-sky-500/80" />
                      <div className="h-3 w-3 rounded-sm bg-amber-400/80" />
                      <div className="h-3 w-3 rounded-sm bg-rose-500/80" />
                    </div>
                    <div className="rounded-full border border-border/70 bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Nexamid Window View
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span className="flex h-7 w-9 items-center justify-center rounded-md border border-border/70 bg-background/70 text-sm leading-none">—</span>
                      <span className="flex h-7 w-9 items-center justify-center rounded-md border border-border/70 bg-background/70 text-[11px]">□</span>
                      <span className="flex h-7 w-9 items-center justify-center rounded-md border border-border/70 bg-background/70 text-sm">×</span>
                    </div>
                  </div>
                </div>
                {pageContent}
              </div>
            </div>
          </div>
        ) : (
          pageContent
        )}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
