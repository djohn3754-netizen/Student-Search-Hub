import { useAuth } from "@/lib/auth-context";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TUTORS } from "@/lib/mock-data";
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  BookOpen, 
  Star, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Bell,
  Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user || user.role !== "student") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Please log in as a student</h2>
        <Link href="/auth"><Button>Log In</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with quick stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-primary/10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 h-5 w-5 rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h1 className="text-4xl font-heading font-bold tracking-tight">Hey, {user.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Learning path is 65% complete
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <Link href="/find-tutors" className="flex-1 lg:flex-none">
            <Button size="lg" className="w-full rounded-full shadow-lg shadow-primary/20">
              <BookOpen className="mr-2 h-4 w-4" /> Find Tutors
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-6">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left/Main Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Progress Overview Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="bg-primary text-primary-foreground border-none shadow-xl shadow-primary/10 overflow-hidden relative">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 absolute -right-2 -top-2 opacity-20 rotate-12" />
                <p className="text-sm font-medium opacity-80 mb-1">Total Hours Learned</p>
                <h3 className="text-3xl font-bold mb-4">42.5 hrs</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Weekly Goal</span>
                    <span>5 / 8 hrs</span>
                  </div>
                  <Progress value={62.5} className="h-2 bg-white/20" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-secondary text-secondary-foreground border-none shadow-xl shadow-secondary/10 overflow-hidden relative">
              <CardContent className="p-6">
                <Star className="h-12 w-12 absolute -right-2 -top-2 opacity-20 rotate-12" />
                <p className="text-sm font-medium opacity-80 mb-1">Average Session Rating</p>
                <h3 className="text-3xl font-bold mb-4">4.9</h3>
                <p className="text-xs font-medium">Keep it up! You're a great student.</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" /> Upcoming Sessions
              </h2>
              <Button variant="link" className="text-primary font-bold">View Calendar</Button>
            </div>
            <div className="grid gap-4">
              {[1, 2].map((i) => (
                <Card key={i} className="group hover:border-primary/50 transition-all border-l-4 border-l-primary shadow-sm overflow-hidden">
                  <CardContent className="p-0 flex flex-col sm:flex-row items-stretch">
                    <div className="bg-muted/50 p-6 flex flex-col items-center justify-center min-w-[120px] text-center sm:border-r">
                      <span className="text-xs font-bold uppercase text-muted-foreground">Feb</span>
                      <span className="text-3xl font-heading font-black">{12 + i}</span>
                      <span className="text-xs font-medium text-primary">Wednesday</span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col sm:flex-row justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 rounded-2xl shadow-sm border-2 border-white">
                          <AvatarImage src={`/assets/avatar-tutor_${i}.jpg`} />
                          <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Advanced Calculus II</h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Central Library</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 2:00 PM - 3:30 PM</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="rounded-full px-6">Reschedule</Button>
                        <Button className="rounded-full shadow-md shadow-primary/10 group-hover:translate-x-1 transition-transform">
                          Join Call <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Saved Tutors / Recommendations */}
          <section>
            <h2 className="text-2xl font-heading font-bold mb-4">Your Saved Tutors</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {TUTORS.slice(0, 4).map((tutor) => (
                <Card key={tutor.id} className="overflow-hidden hover:shadow-lg transition-all group">
                  <CardContent className="p-4 flex gap-4 items-center">
                    <Avatar className="h-16 w-16 rounded-2xl border-2 border-muted">
                      <AvatarImage src={tutor.avatar} />
                      <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg truncate group-hover:text-primary transition-colors">{tutor.name}</h4>
                        <div className="flex items-center gap-1 text-yellow-600 font-bold text-xs">
                          <Star className="h-3 w-3 fill-yellow-600" /> {tutor.rating}
                        </div>
                      </div>
                      <p className="text-sm text-primary font-medium mb-1">{tutor.subject}</p>
                      <Link href={`/tutor/${tutor.id}`}>
                        <Button size="sm" variant="ghost" className="p-0 h-auto font-bold text-xs text-muted-foreground hover:text-primary group-hover:translate-x-1 transition-all">
                          View Profile <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Active Chats */}
          <Card className="shadow-lg border-none bg-muted/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-heading font-bold">Recent Messages</CardTitle>
              <Badge className="bg-primary/10 text-primary border-none">3 New</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-muted/50">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 hover:bg-muted/80 cursor-pointer transition-all flex gap-3 items-start group">
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-background">
                        <AvatarImage src={`/assets/avatar-tutor_${i}.jpg`} />
                        <AvatarFallback>T</AvatarFallback>
                      </Avatar>
                      {i === 1 && <div className="absolute top-0 right-0 h-3 w-3 bg-primary rounded-full border-2 border-background"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">Dr. Sarah Mitchell</span>
                        <span className="text-[10px] text-muted-foreground font-medium">2:30 PM</span>
                      </div>
                      <p className={`text-xs truncate ${i === 1 ? "text-foreground font-bold" : "text-muted-foreground"}`}>
                        {i === 1 ? "Check the new materials I shared!" : "See you tomorrow at the library."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/10 border-t">
              <Button variant="ghost" className="w-full text-sm font-bold text-primary flex items-center gap-2">
                Open Messenger <MessageSquare className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quick Tasks */}
          <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Quick Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Book next Math session", done: false },
                { label: "Pay invoice #2041", done: true },
                { label: "Upload physics homework", done: false }
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${task.done ? "bg-green-500 border-green-500" : "border-muted-foreground"}`}>
                    {task.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className={`text-sm font-medium ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Support/Promo Card */}
          <div className="bg-gradient-to-br from-secondary/80 to-secondary p-8 rounded-3xl text-secondary-foreground shadow-xl shadow-secondary/10 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold leading-tight">Refer a friend, get $20 credit</h3>
              <p className="text-sm opacity-90 leading-relaxed">Sharing is caring! Invite your classmates to TutorLink and earn rewards.</p>
              <Button variant="secondary" className="w-full bg-white text-secondary font-bold hover:bg-white/90">Invite Now</Button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
