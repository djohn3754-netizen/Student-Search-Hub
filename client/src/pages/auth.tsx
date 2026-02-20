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
import { Phone, Lock, ArrowRight, CheckCircle2, Loader2, BookOpen } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const phoneSchema = z.object({
  phone: z.string().min(10, "Enter a valid phone number").max(15, "Phone number too long"),
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
    // Simulate API call
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
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      if (values.otp === "123456") {
        toast({
          title: "Login Successful",
          description: "Welcome back to TutorLink!",
        });
        login("tutor@example.com"); // Use existing login logic with demo email
        setLocation("/tutor-dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Invalid OTP",
          description: "Please enter 123456 to proceed (Demo).",
        });
      }
    }, 1500);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold">Tutor Portal</h1>
          <p className="text-muted-foreground">Access your account or register via Mobile OTP</p>
        </div>

        <Card className="border-2 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 bg-primary/5 pb-8 pt-8 text-center">
            <CardTitle className="text-2xl font-bold">
              {step === "phone" ? "Welcome" : "Verify Mobile"}
            </CardTitle>
            <CardDescription>
              {step === "phone" 
                ? "Enter your mobile number to receive an OTP" 
                : `Enter the 6-digit code sent to ${phoneNumber}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            {step === "phone" ? (
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Mobile Number (e.g. 9876543210)" 
                              className="pl-10 h-12 text-lg" 
                              {...field} 
                              data-testid="input-phone"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-bold rounded-xl" 
                    disabled={isLoading}
                    data-testid="button-get-otp"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <>Get OTP <ArrowRight className="ml-2 h-5 w-5" /></>
                    )}
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
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="000000" 
                              className="pl-10 h-12 text-center text-2xl tracking-[0.5em] font-mono" 
                              maxLength={6}
                              {...field} 
                              data-testid="input-otp"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700" 
                    disabled={isLoading}
                    data-testid="button-verify-otp"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <>Verify & Continue <CheckCircle2 className="ml-2 h-5 w-5" /></>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setStep("phone")}
                    disabled={isLoading}
                  >
                    Change Number
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="bg-muted/30 border-t p-6 text-center flex-col gap-2">
            <p className="text-xs text-muted-foreground w-full">
              For demo, use any number and OTP <span className="font-bold">123456</span>
            </p>
            <p className="text-xs text-muted-foreground w-full">
              By continuing, you agree to our <Link href="/terms"><a className="text-primary hover:underline">Terms of Service</a></Link>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
