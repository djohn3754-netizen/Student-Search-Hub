import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-0">
              <div className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
                <span>Nexamid</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-medium -mt-1 ml-0 italic">
                “Your Learning Journey Starts Here.”
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connecting ambitious students with expert tutors for personalized offline learning experiences.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/find-tutors" className="hover:text-primary transition-colors">Find a Tutor</Link></li>
              <li><Link href="/auth" className="hover:text-primary transition-colors">Become a Tutor</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              © 2026 Nexamid Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
