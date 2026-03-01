import { useRoute, Link } from "wouter";
import { TUTORS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
  Share2, 
  Heart,
  Calendar,
  GraduationCap,
  PlayCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function TutorProfile() {
  const [match, params] = useRoute("/tutor/:id");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!match || !params) return <div>Error</div>;
  
  const tutor = TUTORS.find(t => t.id === params.id);
  
  if (!tutor) return (
    <div className="container mx-auto py-20 text-center">
      <h2 className="text-2xl font-bold">Tutor not found</h2>
      <Link href="/find-tutors"><Button className="mt-4">Back to Search</Button></Link>
    </div>
  );

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "✅ Request Sent Successfully",
        description: `Your request has been sent to ${tutor.name}.`,
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="h-64 bg-gradient-to-r from-primary/80 to-secondary/80 relative">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-card rounded-3xl shadow-xl border overflow-hidden">
          <div className="p-6 md:p-10 pb-0 flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-40 w-40 border-4 border-background shadow-lg rounded-2xl">
              <AvatarImage src={tutor.avatar} alt={tutor.name} className="object-cover" />
              <AvatarFallback className="text-4xl">{tutor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4 pt-2 md:pt-12 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold">{tutor.name}</h1>
                  <p className="text-xl text-primary font-medium">{tutor.subject} Tutor</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-b pb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  {tutor.localArea ? `${tutor.localArea}, ` : ''}{tutor.location} {tutor.pincode ? `- ${tutor.pincode}` : ''}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-primary" />
                  {tutor.experience} Years Experience
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="rounded-full border-primary/20 hover:bg-primary/5 gap-2 px-4 shadow-none">
                    <PlayCircle className="h-4 w-4 text-primary" />
                    View Demo Class
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Verified Profile
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-10 pt-6">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-8">
                <section>
                  <h3 className="text-xl font-bold mb-4">About Me</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {tutor.bio}
                  </p>
                </section>

                <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Short Introduction
                  </h3>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{tutor.shortIntro || 'Professional educator dedicated to student success and academic excellence.'}"
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Teaching Method
                  </h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {tutor.teachingMethod?.description || 'My teaching philosophy centers on personalized instruction tailored to each student\'s unique learning style.'}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {(tutor.teachingMethod?.points || [
                        "Concept-first learning",
                        "Exam-focused preparation",
                        "Practical problem solving",
                        "Use of worksheets / digital tools"
                      ]).map((point, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm font-medium bg-background border p-3 rounded-xl shadow-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
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
                    {tutor.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground border-transparent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </section>
              </div>
              
              <div className="lg:w-[400px] space-y-6">
                <Card className="shadow-lg border-primary/10">
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center">
                      <h4 className="text-2xl font-bold mb-2">Send Request Now</h4>
                      <p className="text-sm text-muted-foreground">Send an enquiry to start learning with {tutor.name.split(' ')[0]}.</p>
                    </div>
                    
                    <form onSubmit={handleEnquiry} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="Enter your full name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject of Interest</Label>
                        <Input id="subject" defaultValue={tutor.subject} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Tell the tutor about your goals..." className="min-h-[100px]" required />
                      </div>
                      <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Enquiry"}
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
    </div>
  );
}
