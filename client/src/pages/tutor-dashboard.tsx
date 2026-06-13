import { useAuth } from "@/lib/auth-context";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Users, MessageSquare, MapPin, CheckCircle2, Clock, BookOpen, Phone, Star, PlayCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function TutorDashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [starredLeads, setStarredLeads] = useState<string[]>([]);

  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const defaultTab = searchParams.get("tab") || "enquiries";
  const isProfileCreationMode = searchParams.get("mode") === "create";
  const isFirstTimeTutor = user?.id === "temp-tutor";
  const showOnboardingProfileSetup = isFirstTimeTutor || isProfileCreationMode;
  const activeTab = showOnboardingProfileSetup ? "profile" : defaultTab;

  if (!user || user.role !== "tutor") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-muted-foreground">Please log in as a tutor to view this page.</p>
        <Link href="/auth"><Button data-testid="button-go-login">Go to Login</Button></Link>
      </div>
    );
  }

  const toggleStar = (id: string) => {
    setStarredLeads((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]
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

  const starredEnquiries = starredLeads
    .map((id) => enquiries.find((enquiry) => enquiry.id === id))
    .filter((enquiry): enquiry is (typeof enquiries)[number] => Boolean(enquiry));

  const handleLeadDetails = (name: string) => {
    toast({
      title: `Lead opened for ${name}`,
      description: "This demo opens the student lead details and keeps the button fully interactive on desktop and mobile.",
    });
  };

  const handleUploadDemo = () => {
    toast({
      title: "Demo upload started",
      description: "Your sample teaching video upload has been triggered in this prototype.",
    });
  };

  const handleDiscardChanges = () => {
    toast({
      title: "Changes discarded",
      description: "Profile fields were reset in this demo flow.",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile saved",
      description: "Your tutor profile details were saved successfully in this prototype.",
    });
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your tutor account? This action cannot be undone in this demo.");

    if (!confirmed) return;

    toast({
      title: "Account deleted",
      description: "Your tutor account has been removed from this demo and you have been signed out.",
    });
    logout();
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className={showOnboardingProfileSetup ? "w-full rounded-[30px] bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(221_83%_58%))] px-6 py-5 text-primary-foreground shadow-[0_22px_70px_hsl(var(--primary)/0.28)]" : ""}>
          <h1 className={`text-3xl font-heading font-bold ${showOnboardingProfileSetup ? "text-white" : "text-foreground"}`}>{showOnboardingProfileSetup ? "Create Your Tutor Profile" : "Tutor Dashboard"}</h1>
          <p className={`flex flex-wrap items-center gap-2 ${showOnboardingProfileSetup ? "mt-2 text-primary-foreground/90" : "text-muted-foreground"}`}>
            {showOnboardingProfileSetup ? "Complete your details below and click save to finish your tutor setup." : "Manage your profile and student enquiries."}
            {!showOnboardingProfileSetup && (
              <span className="inline-flex items-center bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold border border-blue-100 animate-pulse">
                🔔 New Enquiries (3)
              </span>
            )}
          </p>
        </div>
        {!showOnboardingProfileSetup && (
          <div className="flex items-center gap-4 bg-card p-2 rounded-lg border shadow-sm w-full md:w-auto justify-between md:justify-start">
            <span className="text-sm font-medium pl-2">Profile Visibility</span>
            <Switch defaultChecked />
          </div>
        )}
      </div>

      {!showOnboardingProfileSetup && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "New Enquiries", value: "3", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Starred Leads", value: `${starredEnquiries.length}`, icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            { label: "Profile Views", value: "18", icon: BarChart, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Response Rate", value: "91%", icon: CheckCircle2, color: "text-orange-500", bg: "bg-orange-500/10" },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardContent className="p-4 sm:p-6 flex items-center justify-between gap-3">
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
      )}

      <Tabs defaultValue={activeTab} className="space-y-4">
        {!showOnboardingProfileSetup && (
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 h-auto">
            <TabsTrigger value="enquiries" className="text-xs font-medium text-muted-foreground data-[state=active]:font-bold data-[state=active]:text-primary sm:text-sm">Student Enquiries</TabsTrigger>
            <TabsTrigger value="profile" className="text-xs font-medium text-muted-foreground data-[state=active]:font-bold data-[state=active]:text-primary sm:text-sm">Edit Profile</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs font-medium text-muted-foreground data-[state=active]:font-bold data-[state=active]:text-primary sm:text-sm">Settings</TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="enquiries" className="space-y-4 animate-in fade-in duration-300">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Direct enquiries from interested students. Star your favorite leads to keep them at the top.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className={`flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 sm:p-5 border rounded-2xl transition-all shadow-sm ${starredLeads.includes(enquiry.id) ? "border-yellow-200 bg-yellow-50/30" : "hover:bg-muted/30"}`}>
                    <div className="flex items-start gap-3 sm:gap-4 w-full">
                      <Avatar className="h-11 w-11 border-2 border-primary/10">
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">{enquiry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-base sm:text-lg">{enquiry.name}</h4>
                          {enquiry.status === "new" && <Badge className="bg-blue-600 text-[10px] h-4 px-1.5 border-none shadow-none text-white font-bold">NEW LEAD</Badge>}
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-9 w-9 rounded-full ${starredLeads.includes(enquiry.id) ? "text-yellow-500 hover:text-yellow-600 bg-yellow-100" : "text-muted-foreground hover:text-yellow-500"}`}
                            onClick={() => toggleStar(enquiry.id)}
                            data-testid={`button-star-enquiry-${enquiry.id}`}
                          >
                            <Star className={`h-4 w-4 ${starredLeads.includes(enquiry.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-primary" /> {enquiry.subject}</span>
                          <span className="flex items-center gap-1.5 font-medium text-foreground"><Phone className="h-3.5 w-3.5 text-green-600" /> {enquiry.phone}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {enquiry.location}</span>
                          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {enquiry.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button type="button" variant="outline" size="sm" className="h-10 rounded-xl flex-1 md:flex-none border-border bg-background/70 hover:bg-accent hover:text-accent-foreground transition-colors ring-0 outline-none shadow-none px-6" onClick={() => handleLeadDetails(enquiry.name)} data-testid={`button-view-enquiry-${enquiry.id}`}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4 animate-in fade-in duration-300">
          {!showOnboardingProfileSetup && (
            <Card>
              <CardHeader>
                <CardTitle>Starred Enquiries</CardTitle>
                <CardDescription>Your most recently starred leads appear first here for quick follow-up.</CardDescription>
              </CardHeader>
              <CardContent>
                {starredEnquiries.length > 0 ? (
                  <div className="space-y-3">
                    {starredEnquiries.map((enquiry) => (
                      <div key={enquiry.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-yellow-200 bg-yellow-50/50 p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
                            <h4 className="font-bold">{enquiry.name}</h4>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>{enquiry.subject}</p>
                            <p>{enquiry.location}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-foreground">{enquiry.phone}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                    Star enquiries from the lead list and they will appear here instantly.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            {!showOnboardingProfileSetup && (
              <CardHeader>
                <CardTitle>Profile Configuration</CardTitle>
                <CardDescription>Update your teaching details, location, and profile summary.</CardDescription>
              </CardHeader>
            )}
            <CardContent className="space-y-6">
              {isFirstTimeTutor && (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary font-medium">
                  Complete your tutor profile to start receiving high-quality enquiries.
                </div>
              )}

              <div className="grid gap-4">
                <div className="rounded-2xl border bg-background p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">Basic Info</h3>
                    <p className="text-sm text-muted-foreground">Keep this section short and clear so students instantly know who you are.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Tutor Name</label>
                      <Input defaultValue={user.name} className="h-11" data-testid="input-tutor-name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Experience</label>
                      <Input defaultValue="12 Years" className="h-11" data-testid="input-tutor-experience" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-background p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">Teaching Details</h3>
                    <p className="text-sm text-muted-foreground">Tell students what you teach and how you teach it.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Subjects</label>
                    <Input defaultValue="Mathematics, Physics, Calculus" className="h-11" data-testid="input-tutor-subjects" />
                  </div>
                </div>

                <div className="rounded-2xl border bg-background p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">Location</h3>
                    <p className="text-sm text-muted-foreground">Tutors should mention their local area during profile creation so nearby students can find them easily.</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold">City/State</label>
                      <Input defaultValue="Mumbai, Maharashtra" className="h-11" data-testid="input-tutor-city" />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold">Local Area Name</label>
                      <Input placeholder="e.g. Andheri West" defaultValue="Andheri West" className="h-11" data-testid="input-tutor-area" />
                      <p className="text-xs text-muted-foreground">Mention the exact local area you teach in, such as Andheri West, Koramangala, or Salt Lake.</p>
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-sm font-bold">Pincode</label>
                      <Input placeholder="6-digit Pincode" defaultValue="400053" className="h-11" data-testid="input-tutor-pincode" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border bg-background p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">Profile Bio</h3>
                    <p className="text-sm text-muted-foreground">A short, warm summary helps students decide faster.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Professional Bio</label>
                    <textarea className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" defaultValue="Highly experienced tutor with a focus on building clarity, confidence, and strong academic performance." data-testid="input-tutor-bio" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap justify-between gap-3">
                <Button type="button" variant="destructive" className="h-11 sm:mr-auto" onClick={handleDeleteAccount} data-testid="button-delete-account">
                  Delete Account
                </Button>
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <Button type="button" variant="outline" className="h-11" onClick={handleDiscardChanges} data-testid="button-discard-profile-changes">Discard Changes</Button>
                  <Button type="button" className="h-11" onClick={handleSaveProfile} data-testid="button-save-profile">Save Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="animate-in fade-in duration-300">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Simple controls to manage how your tutor profile appears to students.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border bg-muted/20 p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">Show profile in search results</p>
                  <p>Keep this on to receive enquiries from nearby students.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">Delete account</p>
                  <p>Remove your tutor access from this demo if you no longer want to stay on the platform.</p>
                </div>
                <Button type="button" variant="destructive" onClick={handleDeleteAccount} data-testid="button-delete-account-settings">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
