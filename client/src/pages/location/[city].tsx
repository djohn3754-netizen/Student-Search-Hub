import { Link, useParams } from "wouter";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { TUTORS } from "@/lib/mock-data";
import { getCanonicalUrl, indexableLocations, indexablePincodes, indexableSubjects, slugify, titleizeSlug } from "@/lib/seo-routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, GraduationCap, MapPin, Search, Star } from "lucide-react";

export default function LocationPage() {
  const { city } = useParams();
  const locationName = indexableLocations.find((item) => slugify(item) === city) || titleizeSlug(city || "");
  const cityTutors = TUTORS.filter((tutor) =>
    [tutor.location, tutor.localArea || ""].some((value) => value.toLowerCase().includes(locationName.toLowerCase())),
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const canonicalPath = `/location/${city}`;

  const faqs = [
    {
      q: `How do I find the best home tutors in ${locationName}?`,
      a: `Nexamid makes it easy to discover tutors in ${locationName}. Students can browse profiles, compare subjects and teaching experience, and send enquiries directly from tutor pages.`,
    },
    {
      q: `Can students search tutors in ${locationName} by subject and pincode?`,
      a: `Yes. Nexamid supports discovery by subject, city, local area, and pincode so families can quickly reach the most relevant nearby tutor pages.`,
    },
    {
      q: `Are more tutors being added for ${locationName}?`,
      a: `Yes. This landing page is designed to stay search-friendly as more verified tutor profiles are added to the platform.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>{`Best Home Tutors in ${locationName} | Nexamid`}</title>
        <meta
          name="description"
          content={`Find the best home tutors in ${locationName}. Browse local teacher profiles, compare subjects, and send direct student enquiries on Nexamid.`}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Best Home Tutors in ${locationName} | Nexamid`} />
        <meta
          property="og:description"
          content={`Browse local tutors in ${locationName} for personalized offline tuition across key school and exam subjects.`}
        />
        <meta name="twitter:title" content={`Best Home Tutors in ${locationName} | Nexamid`} />
        <meta
          name="twitter:description"
          content={`Browse local tutors in ${locationName} for personalized offline tuition across key school and exam subjects.`}
        />
        <link rel="canonical" href={getCanonicalUrl(canonicalPath)} />
      </Helmet>

      <section className="bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_40%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.34))] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 rounded-full border-primary/20 bg-primary/10 px-4 py-1 text-primary" data-testid="badge-location-page">
            City & Area Landing Page
          </Badge>
          <h1 className="text-4xl font-heading font-bold tracking-tight md:text-6xl">Find the Best Tutors in {locationName}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            Explore local tutor profiles in {locationName}, compare subjects and teaching styles, and send direct enquiries for offline learning support.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="rounded-full px-7" data-testid="button-browse-location-results">
              <Link href="/find-tutors">Browse All Tutors</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-7" data-testid="button-become-tutor-location-page">
              <Link href="/auth">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold">Available Tutors in {locationName}</h2>
            <p className="mt-1 text-muted-foreground">Search-friendly location page for students looking for nearby tutors.</p>
          </div>
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-sm" data-testid="badge-location-tutor-count">
            {cityTutors.length} result{cityTutors.length === 1 ? "" : "s"}
          </Badge>
        </div>

        {cityTutors.length > 0 ? (
          <>
            {cityTutors.length === 1 && (
              <div className="mb-6 rounded-3xl border border-primary/10 bg-primary/5 px-5 py-4">
                <p className="font-semibold text-foreground">More verified tutors are joining soon in {locationName}.</p>
                <p className="text-sm text-muted-foreground">For now, we are showing the currently available verified tutor in this area.</p>
              </div>
            )}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cityTutors.map((tutor) => (
                <Card key={tutor.id} className="overflow-hidden rounded-[28px] border-border/60 bg-card/95 shadow-[0_20px_70px_hsl(var(--foreground)/0.07)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={tutor.avatar} alt={tutor.name} className="h-full w-full object-cover" />
                  </div>
                  <CardHeader className="space-y-3 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-xl font-bold">{tutor.name}</CardTitle>
                        <div className="mt-1 flex items-center gap-2 text-sm text-primary">
                          <GraduationCap className="h-4 w-4" />
                          <span>{tutor.subject}</span>
                        </div>
                      </div>
                      <Badge className="rounded-full bg-primary/10 text-primary" data-testid={`badge-location-rating-${tutor.id}`}>
                        <Star className="mr-1 h-3.5 w-3.5 fill-current" />
                        {tutor.rating}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 pb-6 pt-0">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{tutor.localArea ? `${tutor.localArea}, ` : ""}{tutor.location}</span>
                      </div>
                      {tutor.pincode && (
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-primary" />
                          <span>{tutor.pincode}</span>
                        </div>
                      )}
                    </div>
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{tutor.bio}</p>
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <p className="text-lg font-bold text-foreground">₹{tutor.price}/hr</p>
                        <p className="text-xs text-muted-foreground">Offline tuition</p>
                      </div>
                      <Button asChild className="rounded-full px-6" data-testid={`button-view-location-profile-${tutor.id}`}>
                        <Link href={`/tutor/${tutor.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-[28px] border border-dashed border-border/70 bg-muted/20 px-6 py-16 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold">No specific tutors listed for {locationName} yet</h3>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              This landing page is ready for search visibility, and nearby tutor profiles will appear here as they are added.
            </p>
          </div>
        )}
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-3xl font-heading font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <Card key={faq.q} className="rounded-[24px] border-border/60 shadow-sm">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    data-testid={`button-location-faq-${index}`}
                  >
                    <span className="text-lg font-bold">{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-5 w-5 shrink-0 text-primary" /> : <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />}
                  </button>
                  {isOpen && (
                    <CardContent className="px-6 pb-6 pt-0 text-muted-foreground">
                      {faq.a}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-16 md:grid-cols-2 xl:grid-cols-3">
        <Card className="rounded-[28px] border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Nearby Locations</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {indexableLocations.slice(0, 24).map((location) => (
              <Link
                key={location}
                href={`/location/${slugify(location)}`}
                className={`rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground ${location === locationName ? "border-primary bg-primary/10 text-primary" : ""}`}
                data-testid={`link-nearby-location-${slugify(location)}`}
              >
                {location}
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Popular Subjects</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {indexableSubjects.slice(0, 18).map((subject) => (
              <Link
                key={subject}
                href={`/subject/${slugify(subject)}`}
                className="rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                data-testid={`link-location-subject-${slugify(subject)}`}
              >
                {subject}
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/60 md:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Search by Pincode</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {indexablePincodes.length > 0 ? (
              indexablePincodes.map((code) => (
                <Link
                  key={code}
                  href={`/pincode/${code}`}
                  className="rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  data-testid={`link-location-pincode-${code}`}
                >
                  {code}
                </Link>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Pincode pages will appear here as more tutors are listed.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
