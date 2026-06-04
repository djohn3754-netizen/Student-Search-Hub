import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";

export default function AuthPage() {
  const { login } = useAuth();
  const { toast } = useToast();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/40 p-3 sm:p-4">
      <div className="w-full max-w-[440px] rounded-[28px] border border-border/70 bg-card/95 p-5 shadow-xl shadow-primary/10 backdrop-blur-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 sm:p-7">
        <div className="space-y-6">
          <div className="text-center space-y-3 px-2">
            <h1 className="text-[28px] sm:text-[32px] font-heading font-bold text-foreground tracking-tight" data-testid="text-login-title">
              Tutor Login
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-medium italic" data-testid="text-login-subtitle">
              Teach. Connect. Grow.
            </p>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-primary/5 px-5 py-4 text-center">
            <p className="font-semibold text-foreground" data-testid="text-login-method-label">Continue with Google</p>
            <p className="mt-1 text-sm text-muted-foreground" data-testid="text-login-method-description">
              Mobile number login has been removed. Tutors can now sign in only with Google.
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full h-14 rounded-xl border-border bg-background/70 text-foreground font-semibold flex items-center justify-center gap-3 hover:bg-accent"
            onClick={() => {
              toast({
                title: "Google sign-in selected",
                description: "Using tutor demo access.",
              });
              login("tutor@example.com");
            }}
            data-testid="button-google-signin"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </Button>

          <div className="text-center pt-2">
            <p className="text-[13px] text-muted-foreground" data-testid="text-login-terms">
              By continuing, I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
