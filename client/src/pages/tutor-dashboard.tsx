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
  MessageSquare,
  MapPin,
  CheckCircle2,
  Clock,
  User,
  BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function TutorDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "tutor") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-muted-foreground">Please log in as a tutor to view this page.</p>
        <Link href="/auth"><Button>Go to Login</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Tutor Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile and student enquiries.</p>
        </div>
        <div className="flex items-center gap-4 bg-card p-2 rounded-lg border shadow-sm">
          <span className="text-sm font-medium pl-2">Profile Visibility</span>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "New Enquiries", value: "5", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Total Leads", value: "42", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Profile Views", value: "1.2k", icon: BarChart, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Response Rate", value: "98%", icon: CheckCircle2, color: "text-orange-500", bg: "bg-orange-500/10" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`h-10 w-10 ${stat.bg} rounded-full flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="enquiries" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="enquiries">Student Enquiries</TabsTrigger>
          <TabsTrigger value="profile">Edit Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="enquiries" className="space-y-4 animate-in fade-in duration-300">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Direct enquiries from interested students.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", subject: "Mathematics", location: "Brooklyn, NY", time: "2h ago", status: "new" },
                  { name: "Jane Smith", subject: "Physics", location: "Manhattan, NY", time: "5h ago", status: "contacted" },
                  { name: "Mike Ross", subject: "Algebra", location: "Queens, NY", time: "1d ago", status: "contacted" },
                ].map((enquiry, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{enquiry.name}</h4>
                          {enquiry.status === "new" && <Badge className="bg-blue-500 text-[10px] h-4">NEW</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-3">
                          <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {enquiry.subject}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {enquiry.location}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {enquiry.time}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      {enquiry.status === "new" && (
                        <Button size="sm" className="flex-1 md:flex-none">Mark Contacted</Button>
                      )}
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="animate-in fade-in duration-300">
          <Card>
            <CardHeader>
              <CardTitle>Profile Configuration</CardTitle>
              <CardDescription>Update your teaching details and visibility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Tutor Name</label>
                  <Input defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Hourly Rate ($)</label>
                  <Input type="number" defaultValue="65" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Subjects (Comma separated)</label>
                  <Input defaultValue="Mathematics, Physics, Calculus" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Locations</label>
                  <Input defaultValue="Brooklyn, Manhattan" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Professional Bio</label>
                <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" defaultValue="Highly experienced tutor with a focus on..." />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline">Discard Changes</Button>
                <Button>Save Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
