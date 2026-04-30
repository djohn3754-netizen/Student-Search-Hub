import { useState } from "react";
import { Link, useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, Lock, ArrowRight, CheckCircle2, Loader2, BookOpen, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const phoneSchema = z.object({
  phone: z.string().min(10, "Enter a valid phone number").max(10, "Phone number must be 10 digits"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  async function onPhoneSubmit(values: z.infer<typeof phoneSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      setPhoneNumber(values.phone);
      setStep("otp");
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: "A 6-digit code has been sent to your mobile number.",
      });
    }, 1500);
  }

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      if (values.otp === "123456") {
        const tutorIdentifier = phoneNumber === "9876543210" ? "tutor@example.com" : `${phoneNumber}@nexamid.tutor`;
        toast({
          title: "Login Successful",
          description: phoneNumber === "9876543210" ? "Welcome back!" : "Welcome! Let’s set up your tutor profile.",
        });
        login(tutorIdentifier);
      } else {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Invalid OTP",
          description: "Please enter 123456 to proceed (Demo).",
        });
      }
    }, 1500);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/40 p-3 sm:p-4">
      <div className="w-full max-w-[440px] rounded-[28px] border border-border/70 bg-card/95 p-5 shadow-xl shadow-primary/10 backdrop-blur-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 sm:p-7">
        <div className="space-y-6">
          <div className="text-center space-y-3 px-2">
            <h1 className="text-[28px] sm:text-[32px] font-heading font-bold text-foreground tracking-tight">Tutor Login</h1>
            <p className="text-sm sm:text-base text-muted-foreground font-medium italic">
              Teach. Connect. Grow.
            </p>
          </div>

          <div className="space-y-6">
            {step === "phone" ? (
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative group">
                            <div className="absolute left-0 -top-2.5 ml-3 bg-card px-1 text-[12px] text-muted-foreground z-10">
                              Mobile number
                            </div>
                            <div className="flex h-[54px] items-center rounded-lg border border-border bg-background/80 px-4 shadow-sm transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20">
                              <input 
                                className="flex-1 bg-transparent border-none text-[17px] font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
                                placeholder="Enter 10 digit number"
                                maxLength={10}
                                {...field}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-[54px] text-[16px] font-bold rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 uppercase tracking-wider transition-all hover:scale-[1.01]" 
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "GET OTP"}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="space-y-4 text-center">
                            <p className="text-sm font-medium text-muted-foreground">Verification code sent to {phoneNumber}</p>
                            <Input 
                              placeholder="000000" 
                              className="h-14 rounded-lg border border-border bg-background/80 text-center font-mono text-3xl tracking-[0.6em] focus:border-primary focus:ring-primary/20" 
                              maxLength={6}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-[54px] text-[16px] font-bold rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 uppercase tracking-wider transition-all hover:scale-[1.01]" 
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "VERIFY & SIGN IN"}
                  </Button>
                  <Button variant="ghost" className="w-full text-primary font-medium" onClick={() => setStep("phone")}>Change mobile number</Button>
                </form>
              </Form>
            )}

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-muted-foreground font-medium">or</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-[50px] rounded-lg border-border bg-background/70 text-foreground font-medium flex items-center justify-center gap-3 hover:bg-accent"
              onClick={() => {
                toast({
                  title: "Google sign-in selected",
                  description: "Using tutor demo access.",
                });
                login("tutor@example.com");
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </Button>

            <div className="text-center pt-8">
              <p className="text-[13px] text-muted-foreground">
                By continuing, I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
