import { useRoute, Link } from "wouter";
import { TUTORS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
  Share2, 
  Heart,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TutorProfile() {
  const [match, params] = useRoute("/tutor/:id");
  const { toast } = useToast();
  
  if (!match || !params) return <div>Error</div>;
  
  const tutor = TUTORS.find(t => t.id === params.id);
  
  if (!tutor) return (
    <div className="container mx-auto py-20 text-center">
      <h2 className="text-2xl font-bold">Tutor not found</h2>
      <Link href="/find-tutors"><Button className="mt-4">Back to Search</Button></Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Banner */}
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
                <div className="flex flex-col items-end">
                  <div className="text-3xl font-bold text-foreground">${tutor.price}<span className="text-sm font-normal text-muted-foreground">/hr</span></div>
                  <div className="flex items-center gap-1 text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full mt-1">
                    <Star className="h-4 w-4 fill-yellow-500" />
                    {tutor.rating} ({tutor.reviews} reviews)
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-b pb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  {tutor.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-primary" />
                  {tutor.experience} Years Experience
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Background Checked
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-10 pt-6">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Main Info */}
              <div className="flex-1 space-y-8">
                <section>
                  <h3 className="text-xl font-bold mb-4">About Me</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {tutor.bio}
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold mb-4">Education</h3>
                  <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border">
                    <div className="bg-background p-3 rounded-full shadow-sm">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{tutor.education}</p>
                      <p className="text-xs text-muted-foreground">Verified</p>
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
              
              {/* Sidebar Booking */}
              <div className="lg:w-80 space-y-6">
                <Card className="bg-muted/30 border-none shadow-inner">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Availability
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                          <div 
                            key={day}
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                              tutor.availability.includes(day) 
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                                : "bg-background text-muted-foreground opacity-50"
                            }`}
                          >
                            {day.charAt(0)}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" onClick={() => {
                        toast({
                          title: "Request Sent!",
                          description: `A message has been sent to ${tutor.name}.`,
                        });
                      }}>
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Contact Tutor
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="w-full">
                          <Heart className="mr-2 h-4 w-4" /> Save
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                      </div>
                    </div>
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

function GraduationCap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
