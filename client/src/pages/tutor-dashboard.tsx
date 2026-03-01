import { useAuth } from "@/lib/auth-context";
import { Link, useLocation } from "wouter";
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
  BookOpen,
  Phone,
  Star,
  PlayCircle,
  Upload
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function TutorDashboard() {
  const { user } = useAuth();
  const [starredLeads, setStarredLeads] = useState<string[]>([]);

  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const defaultTab = searchParams.get("tab") || "enquiries";

  if (!user || user.role !== "tutor") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-muted-foreground">Please log in as a tutor to view this page.</p>
        <Link href="/auth"><Button>Go to Login</Button></Link>
      </div>
    );
  }

  const toggleStar = (id: string) => {
    setStarredLeads(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [id, ...prev]
    );
  };

  const enquiries = [
    { id: "1", name: "Arjun Mehta", subject: "JEE Mathematics", location: "Andheri West, Mumbai", phone: "+91 98765 43210", time: "10 mins ago", status: "new" },
    { id: "2", name: "Priya Sharma", subject: "NEET Biology", location: "Hauz Khas, Delhi", phone: "+91 87654 32109", time: "2h ago", status: "new" },
    { id: "3", name: "Rahul Singh", subject: "Coding (Python)", location: "Salt Lake, Kolkata", phone: "+91 76543 21098", time: "5h ago", status: "contacted" },
    { id: "4", name: "Ananya Iyer", subject: "Commerce", location: "Indiranagar, Bengaluru", phone: "+91 65432 10987", time: "1d ago", status: "contacted" },
  ];

  const sortedEnquiries = [...enquiries].sort((a, b) => {
    const aStarredIdx = starredLeads.indexOf(a.id);
    const bStarredIdx = starredLeads.indexOf(b.id);
    
    if (aStarredIdx !== -1 && bStarredIdx !== -1) return aStarredIdx - bStarredIdx;
    if (aStarredIdx !== -1) return -1;
    if (bStarredIdx !== -1) return 1;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">Tutor Dashboard</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            Manage your profile and student enquiries. 
            <span className="inline-flex items-center bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold border border-blue-100 animate-pulse">
              🔔 New Enquiries (3)
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4 bg-card p-2 rounded-lg border shadow-sm">
          <span className="text-sm font-medium pl-2">Profile Visibility</span>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "New Enquiries", value: "3", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
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

      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="enquiries">Student Enquiries</TabsTrigger>
          <TabsTrigger value="profile">Edit Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="enquiries" className="space-y-4 animate-in fade-in duration-300">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Direct enquiries from interested students. Star your favorite leads to keep them at the top.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className={`flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-5 border rounded-2xl transition-all shadow-sm ${starredLeads.includes(enquiry.id) ? 'border-yellow-200 bg-yellow-50/30' : 'hover:bg-muted/30'}`}>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/10">
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">{enquiry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg">{enquiry.name}</h4>
                          {enquiry.status === "new" && <Badge className="bg-blue-600 text-[10px] h-4 px-1.5 border-none shadow-none text-white font-bold">NEW LEAD</Badge>}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-8 w-8 rounded-full ${starredLeads.includes(enquiry.id) ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-100' : 'text-muted-foreground hover:text-yellow-500'}`}
                            onClick={() => toggleStar(enquiry.id)}
                          >
                            <Star className={`h-4 w-4 ${starredLeads.includes(enquiry.id) ? 'fill-current' : ''}`} />
                          </Button>
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
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none border-black/10 hover:bg-black hover:text-white transition-colors ring-0 outline-none shadow-none px-6">
                        View Details
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
              <CardDescription>Update your teaching details, visibility, and demo content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-8 border-2 border-dashed border-primary/20 rounded-3xl bg-primary/5 flex flex-col items-center justify-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <PlayCircle className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Demo Tutorial (Video/Audio)</h4>
                  <p className="text-sm text-muted-foreground max-w-sm mt-1">Upload a short demo (max 60s) to show students your teaching style. This will be visible on your profile.</p>
                </div>
                <div className="flex gap-3">
                  <Button className="rounded-full px-8 shadow-lg flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload File
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">MP4, MOV, or MP3 supported</p>
              </div>

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
