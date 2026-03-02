import { useParams, Link } from "wouter";
import { TUTORS, LOCATIONS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, BookOpen, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function LocationPage() {
  const { city } = useParams();
  const cityName = city ? city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "";
  
  // Filter tutors by location (mock logic)
  const cityTutors = TUTORS.filter(t => t.location.toLowerCase().includes(cityName.toLowerCase()));
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: `How do I find the best home tutors in ${cityName}?`,
      a: `Nexamid makes it easy to find top-rated tutors in ${cityName}. Simply browse our list of verified experts, compare their experience and ratings, and send a request directly from their profile.`
    },
    {
      q: `What subjects are available for home tuition in ${cityName}?`,
      a: `Our tutors in ${cityName} cover a wide range of subjects including Mathematics, Physics, Chemistry, Biology, JEE/NEET prep, Spoken English, and more.`
    },
    {
      q: `Are the tutors in ${cityName} verified?`,
      a: "Yes, every tutor on Nexamid undergoes a rigorous background check and qualification review to ensure the highest quality of education."
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>{`Best Home Tutors in ${cityName} | Nexamid`}</title>
        <meta name="description" content={`Find the best home tutors in ${cityName} for JEE, NEET, Mathematics, and more. Verified experts for personalized 1-on-1 offline tuition.`} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none px-4 py-1">
            Verified Tutors in {cityName}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Find the Best Tutors in {cityName}
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Connect with top-rated local experts for personalized 1-on-1 home tuition in {cityName}.
          </p>
        </div>
      </section>

      {/* Tutors Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-heading">Available Tutors in {cityName}</h2>
          <span className="text-muted-foreground">{cityTutors.length} tutors found</span>
        </div>
        
        {cityTutors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityTutors.map((tutor) => (
              <Card key={tutor.id} className="overflow-hidden hover:shadow-lg transition-all border-none shadow-sm bg-card group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={tutor.avatar} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm">
                      <Star className="h-3 w-3 fill-current mr-1" />
                      {tutor.rating}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-xl font-bold mb-1">{tutor.name}</CardTitle>
                      <div className="flex items-center text-primary font-medium text-sm">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        {tutor.subject}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0 space-y-4">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-secondary" />
                    {tutor.location}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {tutor.bio}
                  </p>
                  <div className="pt-4 flex items-center justify-between border-t border-border">
                    <div className="text-sm">
                      <span className="font-bold text-lg">₹{tutor.price}</span>
                      <span className="text-muted-foreground">/hr</span>
                    </div>
                    <Link href={`/tutor/${tutor.id}`}>
                      <Button size="sm" className="rounded-full px-6">View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-3xl">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No specific tutors listed for {cityName} yet</h3>
            <p className="text-muted-foreground mb-8">But don't worry! We have many experts ready to help.</p>
            <Link href="/find-tutors">
              <Button size="lg" className="rounded-full">Browse All Tutors</Button>
            </Link>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-24">
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

      {/* Internal Linking for SEO */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-lg font-bold mb-6 text-center uppercase tracking-wider text-muted-foreground">Nearby Locations</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {LOCATIONS.slice(0, 15).map(loc => (
            <Link key={loc} href={`/location/${loc.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Tutors in {loc}
              </Badge>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
