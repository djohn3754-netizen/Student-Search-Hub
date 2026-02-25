import { Switch, Route, Redirect } from "wouter";
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

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
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
          <Route path="/blog" component={Blog} />
          {/* Redirect student dashboard to home as it's no longer used */}
          <Route path="/student-dashboard">
            <Redirect to="/" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
