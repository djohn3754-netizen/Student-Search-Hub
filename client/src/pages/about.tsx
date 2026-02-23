import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, Target, Sparkles, ShieldCheck, Users, GraduationCap, ArrowRight, ChevronLeft } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8 group">
            <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <article className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <header className="space-y-6 border-b pb-12 text-center lg:text-left">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4 mx-auto lg:mx-0">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground">
              Bridging the Gap Between <br />
              <span className="text-primary">Curiosity and Mastery</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Nexamid is a dedicated marketplace designed to simplify the discovery of qualified educators. 
              We connect students with local tutors for personalized, offline learning support that fits 
              their specific academic needs and locations.
            </p>
          </header>

          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" /> Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to democratize access to high-quality, personalized education. We believe that 
                finding the right mentor shouldn't be a challenge of luck or endless searching. By providing 
                a transparent and efficient platform, we aim to make expert guidance more accessible and 
                affordable for every learner, regardless of their starting point.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to empowering students to reach their full potential while supporting 
                independent educators in building sustainable, impactful teaching practices.
              </p>
            </div>
            <div className="bg-muted/30 p-8 rounded-3xl border border-primary/10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Empowering Students</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Supporting Educators</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Improving Outcomes</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-center">What We Offer</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-3">
                <Sparkles className="h-6 w-6 text-secondary" />
                <h3 className="font-bold">Smart Discovery</h3>
                <p className="text-sm text-muted-foreground">Find tutors precisely filtered by subject expertise and grade level.</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-3">
                <Users className="h-6 w-6 text-primary" />
                <h3 className="font-bold">Direct Connection</h3>
                <p className="text-sm text-muted-foreground">Skip the middleman. Communicate directly with your tutor of choice.</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-3">
                <ShieldCheck className="h-6 w-6 text-green-500" />
                <h3 className="font-bold">Safe Environment</h3>
                <p className="text-sm text-muted-foreground">A transparent space focused entirely on educational collaboration.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Why We Built This Platform</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nexamid was born from a simple observation: finding a reliable, local tutor is often 
              unnecessarily difficult. Most parents and students have to rely on generic classified 
              sites or word-of-mouth, which lack the transparency and focus required for a professional 
              educational match.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We wanted to create a focused space—not a general marketplace for everything, but a 
              specialized ecosystem dedicated solely to learning. By concentrating on this specific 
              need, we can ensure better information accuracy and more meaningful connections 
              between those who want to learn and those who love to teach.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Our Commitment</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-bold">Accurate Information</h4>
                  <p className="text-sm text-muted-foreground">We strive for transparency in tutor profiles and experience.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-bold">Privacy & Trust</h4>
                  <p className="text-sm text-muted-foreground">Your data is handled with care and never sold to third parties.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground text-center space-y-6 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold">The right guidance changes everything.</h2>
              <p className="text-lg opacity-90 max-w-xl mx-auto">
                Whether you're looking to master a difficult subject or share your knowledge with others, 
                Nexamid is here to help you take the next step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/find-tutors">
                  <Button variant="secondary" size="lg" className="rounded-full font-bold">
                    Explore Tutors
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button variant="outline" size="lg" className="rounded-full font-bold bg-white/10 hover:bg-white/20 border-white/20">
                    Join as Educator
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          </section>
        </article>
      </div>
    </div>
  );
}

function CheckCircle(props: any) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function FileText(props: any) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function Lock(props: any) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
