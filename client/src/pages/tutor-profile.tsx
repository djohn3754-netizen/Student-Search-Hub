import { useRoute, Link } from "wouter";
import { TUTORS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, CheckCircle, MessageCircle, GraduationCap, Phone, MessageSquareMore } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function TutorProfile() {
  const [match, params] = useRoute("/tutor/:id");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [preferredContact, setPreferredContact] = useState<"call" | "whatsapp">("whatsapp");

  if (!match || !params) return <div>Error</div>;

  const tutor = TUTORS.find((t) => t.id === params.id);

  if (!tutor) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">Tutor not found</h2>
        <Link href="/find-tutors">
          <Button className="mt-4" data-testid="button-back-search">Back to Search</Button>
        </Link>
      </div>
    );
  }

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestSent(false);

    setTimeout(() => {
      toast({
        title: `✅ Your request has been sent to tutor ${tutor.name}.`,
        description: `${tutor.name.split(" ")[0]} will review your request shortly. Preferred contact: ${preferredContact === "whatsapp" ? "WhatsApp" : "Call"}.`,
      });
      setRequestSent(true);
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      setPreferredContact("whatsapp");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-28 lg:pb-20">
      <div className="h-48 md:h-64 bg-gradient-to-r from-primary/80 to-secondary/80 relative">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="container mx-auto px-4 -mt-24 md:-mt-32 relative z-10">
        <div className="bg-card rounded-[28px] shadow-xl border overflow-hidden">
          <div className="p-5 md:p-10 pb-0 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            <Avatar className="h-28 w-28 md:h-40 md:w-40 border-4 border-background shadow-lg rounded-2xl">
              <AvatarImage src={tutor.avatar} alt={tutor.name} className="object-cover" />
              <AvatarFallback className="text-4xl">{tutor.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4 pt-0 md:pt-12 w-full">
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold" data-testid="text-tutor-name">{tutor.name}</h1>
                <p className="text-lg md:text-xl text-primary font-medium" data-testid="text-tutor-subject">{tutor.subject} Tutor</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b pb-6">
                <div className="rounded-2xl bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    Area Served
                  </div>
                  <p>{tutor.localArea ? `${tutor.localArea}, ` : ""}{tutor.location} {tutor.pincode ? `- ${tutor.pincode}` : ""}</p>
                </div>
                <div className="rounded-2xl bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                    <Clock className="h-4 w-4 text-primary" />
                    Experience
                  </div>
                  <p>{tutor.experience} years teaching experience</p>
                </div>
                <div className="rounded-2xl bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Trust Signal
                  </div>
                  <p>Verified profile with direct student enquiry</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-10 pt-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div className="flex-1 space-y-8">
                <section>
                  <h3 className="text-xl font-bold mb-4">About Me</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {tutor.bio}
                  </p>
                </section>

                <section className="bg-primary/5 p-5 md:p-6 rounded-2xl border border-primary/10">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Short Introduction
                  </h3>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{tutor.shortIntro || "Professional educator dedicated to student success and academic excellence."}"
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Teaching Method
                  </h3>
                  <div className="rounded-2xl border bg-muted/20 p-5">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="text-teaching-method">
                      {tutor.teachingMethod?.description || "My teaching philosophy centers on personalized instruction tailored to each student's unique learning style."}
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4">Education</h3>
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border">
                    <div className="bg-background p-3 rounded-full shadow-sm">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{tutor.education}</p>
                      <p className="text-xs text-muted-foreground">Academic Verification Active</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground border-transparent" data-testid={`badge-tag-${tag}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:w-[420px] lg:sticky lg:top-24 self-start space-y-6">
                <Card id="send-request-form" className="shadow-lg border-primary/10 rounded-[28px]">
                  <CardContent className="p-5 md:p-8 space-y-6">
                    <div className="text-center space-y-2">
                      <h4 className="text-2xl font-bold">Send Request Now</h4>
                      <p className="text-sm text-muted-foreground">No student login required. Share your need and {tutor.name.split(" ")[0]} can respond directly.</p>
                    </div>

                    <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm">
                      <div className="flex items-center gap-2 font-semibold text-green-800 mb-1">
                        <Phone className="h-4 w-4" />
                        Preferred contact: call / WhatsApp
                      </div>
                      <p className="text-green-700">This helps the tutor know how you would like to be contacted.</p>
                    </div>

                    {requestSent && (
                      <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3" data-testid="status-request-sent">
                        <p className="font-semibold text-foreground">Success message</p>
                        <p className="text-sm text-muted-foreground">Your request is in. {tutor.name.split(" ")[0]} will review it shortly and reach out through your preferred contact method.</p>
                      </div>
                    )}

                    <form onSubmit={handleEnquiry} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input id="name" placeholder="Enter your full name" required className="h-12 rounded-xl" data-testid="input-student-name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="Enter mobile number" required className="h-12 rounded-xl" data-testid="input-student-phone" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="grade">Class / Level</Label>
                          <Input id="grade" placeholder="e.g. Class 10 / JEE" required className="h-12 rounded-xl" data-testid="input-student-grade" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject of Interest</Label>
                          <Input id="subject" defaultValue={tutor.subject} required className="h-12 rounded-xl" data-testid="input-subject-interest" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="area">Area / Locality</Label>
                          <Input id="area" placeholder="e.g. Andheri West" required className="h-12 rounded-xl" data-testid="input-student-area" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timing">Preferred Timing</Label>
                          <Input id="timing" placeholder="e.g. Evenings after 5 PM" required className="h-12 rounded-xl" data-testid="input-preferred-timing" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Preferred Contact</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPreferredContact("call")}
                            className={`h-12 rounded-xl border text-sm font-medium transition-colors ${preferredContact === "call" ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-muted-foreground"}`}
                            data-testid="button-contact-call"
                          >
                            Call
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreferredContact("whatsapp")}
                            className={`h-12 rounded-xl border text-sm font-medium transition-colors ${preferredContact === "whatsapp" ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-muted-foreground"}`}
                            data-testid="button-contact-whatsapp"
                          >
                            WhatsApp
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Learning Goal</Label>
                        <Textarea id="message" placeholder="Tell the tutor what support you need, exam goal, or topic difficulty..." className="min-h-[120px] rounded-2xl" required data-testid="input-learning-goal" />
                      </div>

                      <Button type="submit" className="w-full h-14 text-base font-bold shadow-lg rounded-2xl" disabled={isSubmitting} data-testid="button-send-request">
                        {isSubmitting ? "Sending..." : "Send Request Now"}
                      </Button>
                    </form>

                    <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
                      No Login Required for Students
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">No login required</p>
            <p className="text-sm font-semibold text-foreground">Send your request to {tutor.name.split(" ")[0]}</p>
          </div>
          <Button asChild className="h-12 rounded-2xl px-5 font-semibold" data-testid="button-sticky-send-request">
            <a href="#send-request-form">Send Request Now</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
