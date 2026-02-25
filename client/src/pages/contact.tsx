import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">Have questions? We're here to help you on your learning journey.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email Us</h4>
                    <p className="text-muted-foreground">support@nexamid.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-primary/5">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" required data-testid="input-contact-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email ID</Label>
                  <Input id="email" type="email" placeholder="Your Email" required data-testid="input-contact-email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help?" className="min-h-[150px]" required data-testid="input-contact-message" />
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-bold" data-testid="button-contact-submit">
                  Send Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
