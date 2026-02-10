import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BookOpen, User, GraduationCap, Loader2 } from "lucide-react";

export default function AuthPage() {
  const { login, isLoading } = useAuth();
  const [role, setRole] = useState<"student" | "tutor">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, role);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-heading font-bold tracking-tight">Welcome to TutorLink</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to start your learning journey
          </p>
        </div>

        <Card className="border shadow-lg">
          <CardHeader>
            <CardTitle>Account Access</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">I am a...</Label>
                    <RadioGroup 
                      defaultValue="student" 
                      value={role} 
                      onValueChange={(val) => setRole(val as "student" | "tutor")}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="student" id="student" className="peer sr-only" />
                        <Label
                          htmlFor="student"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        >
                          <User className="mb-2 h-6 w-6 text-muted-foreground peer-data-[state=checked]:text-primary" />
                          Student
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="tutor" id="tutor" className="peer sr-only" />
                        <Label
                          htmlFor="tutor"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                        >
                          <GraduationCap className="mb-2 h-6 w-6 text-muted-foreground peer-data-[state=checked]:text-primary" />
                          Tutor
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <div className="text-center py-8 space-y-4">
                  <p className="text-muted-foreground">Sign up is simulated for this demo. Please use the Login tab with any email/password.</p>
                  <Button variant="outline" onClick={() => document.querySelector<HTMLElement>('[data-state="inactive"]')?.click()}>
                    Switch to Login
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6 bg-muted/10">
            <p className="text-xs text-muted-foreground">
              Demo Mode: Use <span className="font-mono font-bold">student@example.com</span> or <span className="font-mono font-bold">tutor@example.com</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
