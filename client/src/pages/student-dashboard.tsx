import { useAuth } from "@/lib/auth-context";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TUTORS } from "@/lib/mock-data";
import { Calendar, Clock, MessageSquare, BookOpen, Star } from "lucide-react";

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your learning.</p>
        </div>
        <Link href="/find-tutors">
          <Button>Find New Tutor</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Upcoming Sessions */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" /> Upcoming Sessions
            </h2>
            <Card className="border-none shadow-sm bg-muted/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-4 bg-background p-4 rounded-xl border">
                      <div className="bg-primary/10 text-primary p-3 rounded-lg text-center min-w-[60px]">
                        <span className="block text-xs font-bold uppercase">Feb</span>
                        <span className="block text-xl font-bold">{12 + i}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">Calculus II Review</h4>
                        <p className="text-sm text-muted-foreground">with Dr. Sarah Mitchell</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <Clock className="h-3 w-3" /> 4:00 PM
                        </div>
                        <Badge variant="outline" className="mt-1">Confirmed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Saved Tutors */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" /> Saved Tutors
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {TUTORS.slice(0, 2).map((tutor) => (
                <Card key={tutor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex gap-4 items-center">
                    <Avatar className="h-12 w-12 rounded-lg">
                      <AvatarImage src={tutor.avatar} />
                      <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold truncate">{tutor.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{tutor.subject}</p>
                    </div>
                    <Link href={`/tutor/${tutor.id}`}>
                      <Button size="sm" variant="ghost">View</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors flex gap-3 items-start">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/assets/avatar-tutor_${i}.jpg`} />
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">Tutor Name</span>
                        <span className="text-[10px] text-muted-foreground">2h ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        Looking forward to our session tomorrow! Please bring...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full text-xs">View All Messages</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground border-none">
            <CardContent className="p-6 text-center space-y-4">
              <BookOpen className="h-8 w-8 mx-auto opacity-80" />
              <div>
                <h3 className="font-bold">Study Goal</h3>
                <p className="text-sm opacity-90">Complete 3 sessions this week</p>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2 w-[66%]"></div>
              </div>
              <p className="text-xs opacity-80">2/3 sessions completed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
