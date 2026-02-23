import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Lock, Eye, FileText, ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "February 12, 2026";

  return (
    <div className="min-h-screen bg-background">
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
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-heading font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" /> 1. Information We Collect
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                At Nexamid, we collect information to provide better services to all our users. The types of information we collect include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> When you sign up for an account, we ask for information like your name, email address, and phone number.</li>
                <li><strong>Profile Information:</strong> Tutors provide additional details such as education, experience, subjects taught, and teaching locations.</li>
                <li><strong>Communication Data:</strong> We collect information when you contact a tutor or student through our platform to facilitate the connection.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" /> 2. How We Use Information
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Nexamid and our users. Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To facilitate connections between students and tutors for offline classes.</li>
                <li>To verify tutor qualifications and maintain platform safety.</li>
                <li>To send you technical notices, updates, and support messages.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> 3. Data Sharing and Disclosure
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                We do not share your personal information with companies, organizations, or individuals outside of Nexamid except in the following cases:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>With your consent:</strong> We will share personal information with tutors or students only when you explicitly choose to connect with them.</li>
                <li><strong>For legal reasons:</strong> We will share personal information if we have a good-faith belief that access, use, preservation, or disclosure of the information is reasonably necessary to meet any applicable law, regulation, or legal process.</li>
              </ul>
            </div>
          </section>

          <section className="bg-muted/30 p-8 rounded-3xl border border-dashed">
            <h3 className="text-xl font-bold mb-4">Questions about our policy?</h3>
            <p className="text-muted-foreground mb-6">
              If you have any questions about this Privacy Policy, please contact our privacy team.
            </p>
            <Button className="rounded-full px-8 shadow-lg shadow-primary/20">
              Contact Privacy Team
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
