import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, MessageSquare, Calendar, GraduationCap, ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Search for Tutors",
      description: "Browse our curated list of expert tutors. Filter by subject, location, price, and level to find the perfect match for your learning goals.",
      icon: Search,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Send an Enquiry",
      description: "Found a tutor you like? Send them a direct enquiry with your details and learning needs. No registration is required for students.",
      icon: MessageSquare,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Get Contacted",
      description: "The tutor will review your request and reach out to you directly via phone or email to discuss the details and schedule your first session.",
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "Start Learning",
      description: "Meet your tutor for personalized offline classes. Master your subjects, improve your grades, and achieve your academic potential.",
      icon: GraduationCap,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8 group">
            <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">How TutorLink Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform is designed to make finding the right educational support as simple and transparent as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <div className={`mx-auto h-20 w-20 rounded-3xl ${step.bg} flex items-center justify-center relative z-10 border shadow-sm`}>
                <step.icon className={`h-10 w-10 ${step.color}`} />
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-background border rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                  {index + 1}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-muted -z-0"></div>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center bg-muted/30 rounded-3xl p-8 md:p-12 border border-dashed">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold">For Tutors</h2>
            <p className="text-muted-foreground leading-relaxed">
              Are you an expert in your field looking to share your knowledge? Joining TutorLink as an educator is simple and rewarding.
            </p>
            <ul className="space-y-4">
              {[
                "Create a professional profile highlighting your expertise.",
                "Set your own hourly rates and preferred teaching locations.",
                "Receive direct enquiries from interested students in your area.",
                "Manage your leads through your dedicated tutor dashboard."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/auth">
              <Button size="lg" className="rounded-full px-8 font-bold">
                Join as a Tutor <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
             <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" 
              alt="Tutor teaching" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="mt-20 text-center space-y-8">
          <h2 className="text-3xl font-heading font-bold">Ready to take the next step?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/find-tutors">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold shadow-lg shadow-primary/20">
                Start Learning Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
