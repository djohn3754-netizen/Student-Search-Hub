import { useEffect, useState } from "react";
import { Link, Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { House, Newspaper, UserRound } from "lucide-react";
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
  const [showMobileBottomTabsViewport, setShowMobileBottomTabsViewport] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const updateMobileViewport = () => {
      setShowMobileBottomTabsViewport(window.innerWidth < 768);
    };

    updateMobileViewport();
    window.addEventListener("resize", updateMobileViewport);

    return () => window.removeEventListener("resize", updateMobileViewport);
  }, []);

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
  const androidBottomTabRoutes = new Set([
    "/",
    "/blog",
    "/auth",
    "/about",
    "/find-tutors",
    "/how-it-works",
    "/terms",
    "/privacy",
    "/disclaimer",
    "/contact",
  ]);
  const useMobileInterface = mobileInterfaceRoutes.has(pathname);
  const showAndroidBottomTabs = showMobileBottomTabsViewport && androidBottomTabRoutes.has(pathname);

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
      <main className={showAndroidBottomTabs ? "flex-grow pb-24" : "flex-grow"}>
        {useMobileInterface ? (
          <div className="bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.08),_transparent_38%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.45))] px-2 py-3 sm:px-4 sm:py-6">
            <div className="mx-auto w-full max-w-[460px] md:max-w-6xl">
              <div className="overflow-hidden rounded-[34px] border border-border/70 bg-background/95 shadow-[0_26px_90px_hsl(var(--foreground)/0.10)] backdrop-blur-xl md:rounded-[28px] md:border-border/80 md:bg-card/95 md:shadow-[0_30px_120px_hsl(var(--foreground)/0.12)]">
                {pageContent}
              </div>
            </div>
          </div>
        ) : (
          pageContent
        )}
      </main>
      {showAndroidBottomTabs && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-background/96 px-4 pb-[calc(env(safe-area-inset-bottom)+4px)] pt-1 shadow-[0_-8px_24px_hsl(var(--foreground)/0.06)] backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-[320px] items-center justify-between">
            <Link
              href="/"
              className={`flex w-[76px] flex-col items-center justify-center gap-0 py-1 text-[9px] font-bold uppercase tracking-[0.14em] leading-none transition-colors ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
              data-testid="link-bottom-home"
            >
              <House className="h-4.5 w-4.5" strokeWidth={2.6} />
              <span>Home</span>
            </Link>
            <Link
              href="/blog"
              className={`flex w-[76px] flex-col items-center justify-center gap-0 py-1 text-[9px] font-bold uppercase tracking-[0.14em] leading-none transition-colors ${pathname === "/blog" ? "text-primary" : "text-muted-foreground"}`}
              data-testid="link-bottom-blog"
            >
              <Newspaper className="h-4.5 w-4.5" strokeWidth={2.6} />
              <span>Blog</span>
            </Link>
            <Link
              href="/auth"
              className={`flex w-[76px] flex-col items-center justify-center gap-0 py-1 text-[9px] font-bold uppercase tracking-[0.1em] leading-none transition-colors ${pathname === "/auth" ? "text-primary" : "text-muted-foreground"}`}
              data-testid="link-bottom-sign-in"
            >
              <UserRound className="h-4.5 w-4.5" strokeWidth={2.6} />
              <span>Tutor Login</span>
            </Link>
          </div>
        </div>
      )}
      <div className={showAndroidBottomTabs ? "pb-24" : ""}>
        <Footer />
      </div>
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
