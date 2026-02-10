import { useAuth } from "@/lib/auth-context";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Users, 
  DollarSign, 
  Calendar, 
  Settings, 
  MessageSquare,
  MapPin
} from "lucide-react";

export default function TutorDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "tutor") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Please log in as a tutor</h2>
        <Link href="/auth"><Button>Log In</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Tutor Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile, requests, and schedule.</p>
        </div>
        <div className="flex items-center gap-4 bg-card p-2 rounded-lg border shadow-sm">
          <span className="text-sm font-medium pl-2">Available for new students</span>
          <Switch defaultChecked />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Students", value: "12", icon: Users },
          { label: "This Month", value: "$850", icon: DollarSign },
          { label: "Profile Views", value: "142", icon: BarChart },
          { label: "Messages", value: "5", icon: MessageSquare },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="profile">Edit Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Inquiries</CardTitle>
              <CardDescription>Recent messages from potential students.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">Student Name</h4>
                        <p className="text-sm text-muted-foreground">Interested in Algebra II • Brooklyn, NY</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button variant="outline" className="flex-1 md:flex-none">Decline</Button>
                      <Button className="flex-1 md:flex-none">Reply</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Manage your availability for offline classes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <div key={day} className="font-bold text-sm text-muted-foreground">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2 h-64">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="bg-muted/30 rounded-lg p-2 border border-dashed relative hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-primary">+ Add</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hourly Rate ($)</label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="60" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="Experienced tutor..." />
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
