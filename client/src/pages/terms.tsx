import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Scale, FileText, AlertCircle, ChevronLeft } from "lucide-react";

export default function TermsOfService() {
  const lastUpdated = "February 12, 2026";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8 group">
            <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <header className="space-y-4 border-b pb-8">
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-heading font-bold tracking-tight">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> 1. Acceptance of Terms
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                By accessing or using the Nexamid platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> 2. Platform Role
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                Nexamid is a lead-generation marketplace that connects students with independent tutors. We do not employ tutors, nor are we responsible for the specific educational outcomes or conduct of users during offline sessions. All arrangements made between students and tutors are independent agreements.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" /> 3. User Responsibilities
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Accuracy:</strong> Users must provide accurate and truthful information in their profiles and enquiries.</li>
                <li><strong>Safety:</strong> Users are responsible for their own safety during in-person sessions. We recommend meeting in public places for initial meetings.</li>
                <li><strong>Conduct:</strong> All users must maintain a professional and respectful demeanor at all times.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" /> 4. Limitations of Liability
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                In no event shall Nexamid or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nexamid's website.
              </p>
            </div>
          </section>

          <section className="bg-muted/30 p-8 rounded-3xl border border-dashed">
            <h3 className="text-xl font-bold mb-4">Agreement to Terms</h3>
            <p className="text-muted-foreground mb-6">
              By using our service, you acknowledge that you have read and understood these terms and agree to be bound by them.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
