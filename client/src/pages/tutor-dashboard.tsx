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
                  { name: "Arjun Mehta", subject: "JEE Mathematics", location: "Andheri West, Mumbai", phone: "+91 98765 43210", time: "10 mins ago", status: "new" },
                  { name: "Priya Sharma", subject: "NEET Biology", location: "Hauz Khas, Delhi", phone: "+91 87654 32109", time: "2h ago", status: "new" },
                  { name: "Rahul Singh", subject: "Coding (Python)", location: "Salt Lake, Kolkata", phone: "+91 76543 21098", time: "5h ago", status: "contacted" },
                  { name: "Ananya Iyer", subject: "Commerce", location: "Indiranagar, Bengaluru", phone: "+91 65432 10987", time: "1d ago", status: "contacted" },
                ].map((enquiry, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-5 border rounded-2xl hover:bg-muted/30 transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/10">
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">{enquiry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg">{enquiry.name}</h4>
                          {enquiry.status === "new" && <Badge className="bg-blue-600 text-[10px] h-4 px-1.5">NEW LEAD</Badge>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-primary" /> {enquiry.subject}</span>
                          <span className="flex items-center gap-1.5 font-medium text-black"><Phone className="h-3.5 w-3.5 text-green-600" /> {enquiry.phone}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {enquiry.location}</span>
                          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {enquiry.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button asChild size="sm" className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white border-none shadow-md ring-0 outline-none">
                        <a href={`tel:${enquiry.phone}`}>Call Now</a>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none border-black/20 hover:bg-black hover:text-white transition-colors ring-0 outline-none">
                        Details
                      </Button>
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
                  <label className="text-sm font-bold">City/State</label>
                  <Input defaultValue="Mumbai, Maharashtra" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Local Area Name</label>
                  <Input placeholder="e.g. Andheri West" defaultValue="Andheri West" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Pincode</label>
                  <Input placeholder="6-digit Pincode" defaultValue="400053" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Subjects (Comma separated)</label>
                  <Input defaultValue="Mathematics, Physics, Calculus" />
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
