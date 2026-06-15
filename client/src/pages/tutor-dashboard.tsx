import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import {
  createTutorAccountRecord,
  getDefaultTutorProfileDraft,
  getNextTutorOnboardingStep,
  getPreviousTutorOnboardingStep,
  getTutorAccountRecord,
  isTutorOnboardingStep,
  removeTutorAccountRecord,
  saveTutorAccountRecord,
  TUTOR_ONBOARDING_STEP_LABELS,
  TUTOR_ONBOARDING_STEPS,
  type TutorAccountRecord,
  type TutorOnboardingStep,
  type TutorProfileDraft,
} from "@/lib/tutor-onboarding";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, BarChart, BookOpen, CheckCircle2, Clock, MapPin, MessageSquare, Phone, Star } from "lucide-react";

const defaultTutorAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80";

export default function TutorDashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [starredLeads, setStarredLeads] = useState<string[]>([]);
  const [accountRecord, setAccountRecord] = useState<TutorAccountRecord | null>(null);
  const [profileForm, setProfileForm] = useState<TutorProfileDraft>(getDefaultTutorProfileDraft(user?.name || "New Tutor"));
  const [currentStep, setCurrentStep] = useState<TutorOnboardingStep>("basic");

  const pathname = location.split("?")[0];
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const defaultTab = searchParams.get("tab") || "enquiries";
  const requestedStep = searchParams.get("step");

  useEffect(() => {
    if (!user || user.role !== "tutor") return;

    const savedRecord =
      getTutorAccountRecord(user.email) ||
      saveTutorAccountRecord(createTutorAccountRecord(user.email, user.name, user.avatar || defaultTutorAvatar));

    setAccountRecord(savedRecord);
    setProfileForm(savedRecord.profileData);
    setCurrentStep(savedRecord.currentStep);
  }, [user]);

  useEffect(() => {
    if (!accountRecord || accountRecord.profileCompleted) return;

    if (!isTutorOnboardingStep(requestedStep) || requestedStep !== accountRecord.currentStep) {
      setLocation(`/tutor-dashboard?tab=profile&mode=create&step=${accountRecord.currentStep}`);
    }
  }, [accountRecord, requestedStep, setLocation]);

  if (!user || user.role !== "tutor") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-muted-foreground">Please log in as a tutor to view this page.</p>
        <Link href="/auth"><Button data-testid="button-go-login">Go to Login</Button></Link>
      </div>
    );
  }

  if (!accountRecord) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground" data-testid="status-loading-dashboard">Preparing your tutor dashboard...</p>
      </div>
    );
  }

  const showOnboardingProfileSetup = !accountRecord.profileCompleted;
  const activeTab = showOnboardingProfileSetup ? "profile" : defaultTab;
  const currentStepLabel = TUTOR_ONBOARDING_STEP_LABELS[currentStep];
  const currentStepIndex = TUTOR_ONBOARDING_STEPS.indexOf(currentStep) + 1;
  const totalSteps = TUTOR_ONBOARDING_STEPS.length;

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

  const toggleStar = (id: string) => {
    setStarredLeads((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]));
  };

  const updateProfileField = (field: keyof TutorProfileDraft, value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const persistAccountRecord = (updates: Partial<TutorAccountRecord>) => {
    const nextRecord = saveTutorAccountRecord({
      ...accountRecord,
      ...updates,
      name: profileForm.name || accountRecord.name,
      profileData: updates.profileData || profileForm,
    });

    setAccountRecord(nextRecord);
    return nextRecord;
  };

  const moveToStep = (step: TutorOnboardingStep) => {
    setCurrentStep(step);
    persistAccountRecord({ currentStep: step, profileData: profileForm });
    setLocation(`/tutor-dashboard?tab=profile&mode=create&step=${step}`);
  };

  const handleNextStep = () => {
    const nextStep = getNextTutorOnboardingStep(currentStep);

    if (!nextStep) {
      handleSaveProfile();
      return;
    }

    persistAccountRecord({
      currentStep: nextStep,
      completedSteps: Array.from(new Set([...accountRecord.completedSteps, currentStep])),
      profileData: profileForm,
    });
    setCurrentStep(nextStep);
    setLocation(`/tutor-dashboard?tab=profile&mode=create&step=${nextStep}`);

    toast({
      title: `${currentStepLabel} saved`,
      description: `Taking you to ${TUTOR_ONBOARDING_STEP_LABELS[nextStep]}.`,
    });
  };

  const handlePreviousStep = () => {
    const previousStep = getPreviousTutorOnboardingStep(currentStep);

    if (!previousStep) return;

    moveToStep(previousStep);
  };

  const handleLeadDetails = (name: string) => {
    toast({
      title: `Lead opened for ${name}`,
      description: "This demo opens the student lead details and keeps the button fully interactive on desktop and mobile.",
    });
  };

  const handleDiscardChanges = () => {
    setProfileForm(accountRecord.profileData);
    setCurrentStep(accountRecord.currentStep);

    toast({
      title: "Changes discarded",
      description: "Profile fields were reset to the last saved onboarding or dashboard state.",
    });
  };

  const handleSaveProfile = () => {
    const completedRecord = persistAccountRecord({
      completedSteps: [...TUTOR_ONBOARDING_STEPS],
      currentStep: "bio",
      profileCompleted: true,
      verified: true,
      profileData: profileForm,
    });

    setAccountRecord(completedRecord);

    toast({
      title: "Profile completed",
      description: "Your tutor profile is complete. Taking you to your personal tutor dashboard.",
    });

    setLocation("/tutor-dashboard?tab=enquiries&view=live");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your tutor account? This action cannot be undone in this demo.");

    if (!confirmed) return;

    removeTutorAccountRecord(user.email);
    toast({
      title: "Account deleted",
      description: "Your tutor account has been removed from this demo and you have been signed out.",
    });
    logout();
  };

  const renderBasicInfoSection = () => (
    <div className="rounded-2xl border bg-background p-5 space-y-4">
      <div>
        <h3 className="text-lg font-bold">Basic Info</h3>
        <p className="text-sm text-muted-foreground">Keep this section short and clear so students instantly know who you are.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-bold">Tutor Name</label>
          <Input value={profileForm.name} onChange={(e) => updateProfileField("name", e.target.value)} className="h-11" data-testid="input-tutor-name" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Experience</label>
          <Input value={profileForm.experience} onChange={(e) => updateProfileField("experience", e.target.value)} className="h-11" data-testid="input-tutor-experience" />
        </div>
      </div>
    </div>
  );

  const renderTeachingSection = () => (
    <div className="rounded-2xl border bg-background p-5 space-y-4">
      <div>
        <h3 className="text-lg font-bold">Teaching Details</h3>
        <p className="text-sm text-muted-foreground">Tell students what you teach and how you teach it.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-bold">Subjects</label>
          <Input value={profileForm.subjects} onChange={(e) => updateProfileField("subjects", e.target.value)} className="h-11" data-testid="input-tutor-subjects" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Qualification</label>
          <Input value={profileForm.qualification} onChange={(e) => updateProfileField("qualification", e.target.value)} className="h-11" data-testid="input-tutor-qualification" />
        </div>
      </div>
    </div>
  );

  const renderLocationSection = () => (
    <div className="rounded-2xl border bg-background p-5 space-y-4">
      <div>
        <h3 className="text-lg font-bold">Location</h3>
        <p className="text-sm text-muted-foreground">Tutors should mention their local area during profile creation so nearby students can find them easily.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-bold">City/State</label>
          <Input value={profileForm.city} onChange={(e) => updateProfileField("city", e.target.value)} className="h-11" data-testid="input-tutor-city" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Local Area Name</label>
          <Input value={profileForm.area} onChange={(e) => updateProfileField("area", e.target.value)} className="h-11" data-testid="input-tutor-area" />
          <p className="text-xs text-muted-foreground">Mention the exact local area you teach in, such as Andheri West, Koramangala, or Salt Lake.</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">Pincode</label>
          <Input value={profileForm.pincode} onChange={(e) => updateProfileField("pincode", e.target.value)} className="h-11" data-testid="input-tutor-pincode" />
        </div>
      </div>
    </div>
  );

  const renderBioSection = () => (
    <div className="rounded-2xl border bg-background p-5 space-y-4">
      <div>
        <h3 className="text-lg font-bold">Profile Bio</h3>
        <p className="text-sm text-muted-foreground">A short, warm summary helps students decide faster.</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold">Professional Bio</label>
        <textarea
          className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={profileForm.bio}
          onChange={(e) => updateProfileField("bio", e.target.value)}
          data-testid="input-tutor-bio"
        />
      </div>
    </div>
  );

  const onboardingSectionMap = {
    basic: renderBasicInfoSection(),
    teaching: renderTeachingSection(),
    location: renderLocationSection(),
    bio: renderBioSection(),
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className={showOnboardingProfileSetup ? "w-full rounded-[30px] bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(221_83%_58%))] px-6 py-5 text-primary-foreground shadow-[0_22px_70px_hsl(var(--primary)/0.28)]" : ""}>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className={`text-3xl font-heading font-bold ${showOnboardingProfileSetup ? "text-white" : "text-foreground"}`}>
              {showOnboardingProfileSetup ? "Create Your Tutor Profile" : "Personal Tutor Dashboard"}
            </h1>
            {showOnboardingProfileSetup && (
              <Badge className="rounded-full border border-white/20 bg-white/15 text-white" data-testid="badge-onboarding-step-progress">
                Step {currentStepIndex} of {totalSteps}: {currentStepLabel}
              </Badge>
            )}
          </div>
          <p className={`flex flex-wrap items-center gap-2 ${showOnboardingProfileSetup ? "mt-2 text-primary-foreground/90" : "text-muted-foreground"}`}>
            {showOnboardingProfileSetup ? `We saved your onboarding progress. You are back on ${currentStepLabel} so you can finish the exact step you missed.` : "Manage your live tutor profile and student enquiries."}
            {!showOnboardingProfileSetup && (
              <span className="inline-flex items-center rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 animate-pulse">
                🔔 New Enquiries (3)
              </span>
            )}
          </p>
        </div>
        {!showOnboardingProfileSetup && (
          <div className="flex w-full items-center justify-between gap-4 rounded-lg border bg-card p-2 shadow-sm md:w-auto md:justify-start">
            <span className="pl-2 text-sm font-medium">Profile Visibility</span>
            <Switch defaultChecked />
          </div>
        )}
      </div>

      {!showOnboardingProfileSetup && (
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "New Enquiries", value: "3", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Starred Leads", value: `${starredEnquiries.length}`, icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            { label: "Profile Views", value: "18", icon: BarChart, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Response Rate", value: "91%", icon: CheckCircle2, color: "text-orange-500", bg: "bg-orange-500/10" },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardContent className="flex items-center justify-between gap-3 p-4 sm:p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="mt-1 text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue={activeTab} className="space-y-4">
        {!showOnboardingProfileSetup && (
          <TabsList className="grid h-auto w-full grid-cols-3 bg-muted/50 p-1">
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
                  <div key={enquiry.id} className={`flex flex-col items-start justify-between gap-4 rounded-2xl border p-4 shadow-sm transition-all md:flex-row md:items-center sm:p-5 ${starredLeads.includes(enquiry.id) ? "border-yellow-200 bg-yellow-50/30" : "hover:bg-muted/30"}`}>
                    <div className="flex w-full items-start gap-3 sm:gap-4">
                      <Avatar className="h-11 w-11 border-2 border-primary/10">
                        <AvatarFallback className="bg-primary/5 font-bold text-primary">{enquiry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-bold sm:text-lg">{enquiry.name}</h4>
                          {enquiry.status === "new" && <Badge className="h-4 border-none bg-blue-600 px-1.5 text-[10px] font-bold text-white shadow-none">NEW LEAD</Badge>}
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-9 w-9 rounded-full ${starredLeads.includes(enquiry.id) ? "bg-yellow-100 text-yellow-500 hover:text-yellow-600" : "text-muted-foreground hover:text-yellow-500"}`}
                            onClick={() => toggleStar(enquiry.id)}
                            data-testid={`button-star-enquiry-${enquiry.id}`}
                          >
                            <Star className={`h-4 w-4 ${starredLeads.includes(enquiry.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm text-muted-foreground sm:grid-cols-2">
                          <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-primary" /> {enquiry.subject}</span>
                          <span className="flex items-center gap-1.5 font-medium text-foreground"><Phone className="h-3.5 w-3.5 text-green-600" /> {enquiry.phone}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {enquiry.location}</span>
                          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {enquiry.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full gap-2 md:w-auto">
                      <Button type="button" variant="outline" size="sm" className="h-10 flex-1 rounded-xl border-border bg-background/70 px-6 shadow-none outline-none ring-0 transition-colors hover:bg-accent hover:text-accent-foreground md:flex-none" onClick={() => handleLeadDetails(enquiry.name)} data-testid={`button-view-enquiry-${enquiry.id}`}>
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
                      <div key={enquiry.id} className="flex flex-col justify-between gap-3 rounded-2xl border border-yellow-200 bg-yellow-50/50 p-4 sm:flex-row sm:items-center">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
                            <h4 className="font-bold">{enquiry.name}</h4>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
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
              {showOnboardingProfileSetup ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {TUTOR_ONBOARDING_STEPS.map((step, index) => {
                      const isCompleted = accountRecord.completedSteps.includes(step);
                      const isActive = currentStep === step;

                      return (
                        <div
                          key={step}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${isActive ? "border-primary bg-primary text-primary-foreground" : isCompleted ? "border-primary/20 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"}`}
                          data-testid={`status-onboarding-step-${step}`}
                        >
                          {index + 1}. {TUTOR_ONBOARDING_STEP_LABELS[step]}
                        </div>
                      );
                    })}
                  </div>
                  <div className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm font-medium text-primary" data-testid="text-resume-step">
                    We automatically bring unfinished tutors back to the exact step they missed.
                  </div>
                  {onboardingSectionMap[currentStep]}
                </>
              ) : (
                <div className="grid gap-4">
                  {renderBasicInfoSection()}
                  {renderTeachingSection()}
                  {renderLocationSection()}
                  {renderBioSection()}
                </div>
              )}

              <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:flex-wrap">
                <Button type="button" variant="destructive" className="h-11 sm:mr-auto" onClick={handleDeleteAccount} data-testid="button-delete-account">
                  Delete Account
                </Button>
                {showOnboardingProfileSetup ? (
                  <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Button type="button" variant="outline" className="h-11" onClick={handleDiscardChanges} data-testid="button-discard-profile-changes">Discard Changes</Button>
                    {currentStep !== "basic" && (
                      <Button type="button" variant="outline" className="h-11" onClick={handlePreviousStep} data-testid="button-previous-onboarding-step">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous Step
                      </Button>
                    )}
                    {currentStep === "bio" ? (
                      <Button type="button" className="h-11" onClick={handleSaveProfile} data-testid="button-complete-profile">
                        Complete Profile
                      </Button>
                    ) : (
                      <Button type="button" className="h-11" onClick={handleNextStep} data-testid="button-next-onboarding-step">
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Button type="button" variant="outline" className="h-11" onClick={handleDiscardChanges} data-testid="button-discard-profile-changes">Discard Changes</Button>
                    <Button type="button" className="h-11" onClick={() => persistAccountRecord({ profileData: profileForm })} data-testid="button-save-profile">Save Profile</Button>
                  </div>
                )}
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
              <div className="flex items-center justify-between gap-4 rounded-2xl border bg-muted/20 p-4">
                <div>
                  <p className="font-medium text-foreground">Show profile in search results</p>
                  <p>Keep this on to receive enquiries from nearby students.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
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
