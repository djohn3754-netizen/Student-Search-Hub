import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { ArrowRight, Briefcase, ShieldCheck, Sparkles } from "lucide-react";

const highlights = [
  {
    title: "Professional profile access",
    description: "Manage your tutor profile, visibility, and student enquiries from one clean workspace.",
    icon: Briefcase,
  },
  {
    title: "Verified and secure",
    description: "Google sign-in keeps access simple while making the login experience feel trusted and familiar.",
    icon: ShieldCheck,
  },
  {
    title: "Built for serious tutors",
    description: "Designed for educators who want a polished presence and faster response to real student leads.",
    icon: Sparkles,
  },
];

export default function AuthPage() {
  const { login } = useAuth();
  const { toast } = useToast();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.12),_transparent_32%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.55))] px-3 py-8 sm:px-4 sm:py-10">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_hsl(var(--secondary)/0.22),_transparent_48%)] pointer-events-none" />
      <div className="absolute left-1/2 top-16 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-border/70 bg-card/90 shadow-[0_30px_90px_hsl(var(--primary)/0.12)] backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative hidden overflow-hidden border-r border-border/60 bg-[linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.45))] p-10 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_hsl(var(--primary)/0.12),_transparent_38%)]" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />

            <div className="relative space-y-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary" data-testid="badge-login-professional">
                Nexamid for Tutors
              </div>
              <div className="space-y-4">
                <h1 className="max-w-md font-heading text-4xl font-bold tracking-tight text-foreground xl:text-5xl" data-testid="text-login-title-desktop">
                  A polished login experience for serious tutors.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground" data-testid="text-login-description-desktop">
                  Sign in to manage your tutor profile, appear in search, and respond to student enquiries with a clean, trusted professional presence.
                </p>
              </div>
            </div>

            <div className="relative space-y-4">
              {highlights.map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/72 p-4 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-sm font-semibold text-foreground">{item.title}</h2>
                    <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="mx-auto flex w-full max-w-md flex-col justify-center space-y-8">
              <div className="space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary lg:hidden" data-testid="badge-login-mobile">
                  Nexamid for Tutors
                </div>
                <div className="space-y-3">
                  <h1 className="font-heading text-[30px] font-bold tracking-tight text-foreground sm:text-[34px]" data-testid="text-login-title">
                    Welcome back
                  </h1>
                  <p className="text-sm leading-6 text-muted-foreground sm:text-base" data-testid="text-login-subtitle">
                    Continue with Google to access your dashboard, tutor profile, and incoming student leads.
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-border/70 bg-background/80 p-5 shadow-[0_18px_50px_hsl(var(--foreground)/0.04)] sm:p-6">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground" data-testid="text-login-method-title">Google Sign-In</p>
                        <p className="text-xs text-muted-foreground" data-testid="text-login-method-subtitle">Fast, secure, and used for tutor access</p>
                      </div>
                      <div className="rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-600" data-testid="status-google-enabled">
                        Enabled
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="group h-14 w-full rounded-2xl border-border bg-card text-base font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent"
                    onClick={() => {
                      toast({
                        title: "Google sign-in selected",
                        description: "Using tutor demo access.",
                      });
                      login("tutor@example.com");
                    }}
                    data-testid="button-google-signin"
                  >
                    <span className="flex items-center gap-3">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Sign in with Google
                    </span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/60 bg-card/80 p-4" data-testid="card-login-feature-visibility">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Profile</p>
                      <p className="mt-2 text-sm font-medium text-foreground">Update your expertise, subjects, and local area coverage.</p>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-card/80 p-4" data-testid="card-login-feature-enquiries">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Leads</p>
                      <p className="mt-2 text-sm font-medium text-foreground">Track fresh student enquiries and respond faster.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-[13px] leading-6 text-muted-foreground" data-testid="text-login-terms">
                  By continuing, I agree to the <Link href="/terms" className="font-medium text-primary hover:underline">Terms of Use</Link> and <Link href="/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
