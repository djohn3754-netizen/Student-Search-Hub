import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
              <BookOpen className="h-6 w-6 text-secondary" />
              <span>TutorLink</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connecting ambitious students with expert tutors for personalized offline learning experiences.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/find-tutors"><a className="hover:text-primary transition-colors">Find a Tutor</a></Link></li>
              <li><Link href="/auth"><a className="hover:text-primary transition-colors">Become a Tutor</a></Link></li>
              <li><Link href="/pricing"><a className="hover:text-primary transition-colors">Pricing</a></Link></li>
              <li><Link href="/how-it-works"><a className="hover:text-primary transition-colors">How it Works</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/safety"><a className="hover:text-primary transition-colors">Trust & Safety</a></Link></li>
              <li><Link href="/terms"><a className="hover:text-primary transition-colors">Terms of Service</a></Link></li>
              <li><Link href="/privacy"><a className="hover:text-primary transition-colors">Privacy Policy</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              © 2024 TutorLink Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
