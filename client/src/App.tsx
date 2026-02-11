import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Pages
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import FindTutors from "@/pages/find-tutors";
import TutorProfile from "@/pages/tutor-profile";
import AuthPage from "@/pages/auth";
import StudentDashboard from "@/pages/student-dashboard";
import TutorDashboard from "@/pages/tutor-dashboard";
import MessagingPage from "@/pages/messages";

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
          <Route path="/student-dashboard" component={StudentDashboard} />
          <Route path="/tutor-dashboard" component={TutorDashboard} />
          <Route path="/messages" component={MessagingPage} />
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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
