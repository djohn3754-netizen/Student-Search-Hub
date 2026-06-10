import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, ShieldCheck, MapPin, Star, BookOpen, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { LOCATIONS } from "@/lib/mock-data";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does Nexamid help me find a tutor?",
      a: "Nexamid connects you with verified local tutors. You can search by subject and location, view profiles, and send requests directly to tutors without needing to create an account first."
    },
    {
      q: "Are the tutors on Nexamid verified?",
      a: "Yes, we manually verify the credentials and experience of every tutor who joins our platform to ensure high-quality learning experiences."
    },
    {
      q: "Is there a fee to use Nexamid as a student?",
      a: "No, searching for tutors and sending enquiries is completely free for students and parents."
    },
    {
      q: "How do I book a session with a tutor?",
      a: "Browse tutor profiles, open the one you like, and submit the enquiry form on the profile page. The tutor then receives your request and can follow up directly."
    },
    {
      q: "Are sessions online, in-person, or both?",
      a: "Nexamid is currently focused on local and offline tutoring experiences, helping students connect with tutors for in-person learning near their area."
    },
    {
      q: "Can I choose tutors near my location?",
      a: "Yes. You can browse tutors by city and location-based pages, making it easier to find tutors close to your area."
    },
    {
      q: "What subjects are available?",
      a: "Tutors on Nexamid cover a wide range of subjects including Mathematics, Science, English, Coding, JEE/NEET preparation, commerce, humanities, and more."
    },
    {
      q: "What levels do tutors cover (school, college, test prep)?",
      a: "Tutors support school-level learning, college-level subjects, competitive exam preparation, and selected professional skill-based learning."
    },
    {
      q: "Can I choose a tutor based on experience or qualifications?",
      a: "Yes. Tutor profiles include teaching experience, education, subject expertise, and profile details so you can compare and choose the right fit."
    },
    {
      q: "Do I need to create an account to contact tutors?",
      a: "No. Students and parents can send tutor enquiries directly without creating an account."
    },
    {
      q: "Can I save favorite tutors?",
      a: "Not yet. Right now you can compare profiles and revisit them anytime, while a dedicated favorites feature can be added later."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-foreground leading-[1.1]">
                Master any subject with <span className="text-primary">expert private tutors</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Connect with qualified tutors for personalized offline classes. Boost your grades, learn a new skill, or prepare for exams with 1-on-1 guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/find-tutors">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    Find a Tutor
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button size="lg" variant="ghost" className="group h-14 rounded-full px-6 text-lg font-bold text-foreground hover:bg-transparent hover:text-primary">
                    <span>Become a Tutor</span>
                    <span className="ml-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all group-hover:translate-x-1 group-hover:border-primary/30 group-hover:bg-primary/5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </div>
              
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">Verified Tutors</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">Local & Offline</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative w-full max-w-[600px] lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white">
                <img 
                  src="/hero-main.jpg" 
                  alt="Students with teacher" 
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Decorative Background Blob */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Why choose Nexamid?</h2>
            <p className="text-muted-foreground text-lg">We verify every tutor to ensure you get the best learning experience possible.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Experts",
                desc: "Every tutor passes a rigorous background check and qualification review.",
                icon: ShieldCheck,
                color: "text-blue-500",
                bg: "bg-blue-50"
              },
              {
                title: "Offline Learning",
                desc: "Meet in person at a library, cafe, or home for effective hands-on learning.",
                icon: MapPin,
                color: "text-orange-500",
                bg: "bg-orange-50"
              },
              {
                title: "Flexible Scheduling",
                desc: "Book sessions that fit your schedule. Pay only for the classes you take.",
                icon: BookOpen,
                color: "text-green-500",
                bg: "bg-green-50"
              }
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow bg-background/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="border-none shadow-sm cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <CardHeader className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{faq.q}</h3>
                    {openFaq === i ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  {openFaq === i && (
                    <div className="mt-4 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                      {faq.a}
                    </div>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-heading font-bold">Ready to start learning?</h2>
              <p className="text-primary-foreground/90 text-lg md:text-xl">
                Join thousands of students who have found their perfect tutor on Nexamid today.
              </p>
              <Link href="/find-tutors">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-foreground">
                  Find Your Tutor
                </Button>
              </Link>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Popular Locations Section */}
      <section className="border-y border-border bg-muted/10 py-16">
        <div className="container mx-auto px-4">
          <h3 className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">Popular Locations</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {LOCATIONS.slice(0, 12).map((loc) => (
              <Link
                key={loc}
                href={`/location/${loc.toLowerCase().replace(/\s+/g, '-')}`}
                className="border-b border-transparent pb-1 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                Tutors in {loc}
              </Link>
            ))}
            <Link href="/find-tutors" className="pb-1 text-sm font-bold text-primary hover:underline">
              View All →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
