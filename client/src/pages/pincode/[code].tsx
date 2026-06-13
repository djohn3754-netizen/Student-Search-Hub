import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet";
import { TUTORS } from "@/lib/mock-data";
import { getCanonicalUrl, indexableLocations, indexablePincodes, indexableSubjects, slugify } from "@/lib/seo-routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, Search, Star } from "lucide-react";

export default function PincodePage() {
  const { code } = useParams();
  const resolvedCode = indexablePincodes.find((item) => item === code) || code || "";
  const tutorsByPincode = TUTORS.filter((tutor) => tutor.pincode === resolvedCode);
  const canonicalPath = `/pincode/${resolvedCode}`;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>{`Home Tutors in ${resolvedCode} | Nexamid`}</title>
        <meta
          name="description"
          content={`Find tutors near pincode ${resolvedCode} on Nexamid. Browse local tutor profiles, compare subjects, and send direct student enquiries.`}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Home Tutors in ${resolvedCode} | Nexamid`} />
        <meta
          property="og:description"
          content={`Browse local tutors for pincode ${resolvedCode} and connect with nearby offline teaching experts.`}
        />
        <meta name="twitter:title" content={`Home Tutors in ${resolvedCode} | Nexamid`} />
        <meta
          name="twitter:description"
          content={`Browse local tutors for pincode ${resolvedCode} and connect with nearby offline teaching experts.`}
        />
        <link rel="canonical" href={getCanonicalUrl(canonicalPath)} />
      </Helmet>

      <section className="bg-[radial-gradient(circle_at_top,_hsl(var(--secondary)/0.16),_transparent_40%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.34))] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 rounded-full border-primary/20 bg-primary/10 px-4 py-1 text-primary" data-testid="badge-pincode-page">
            Pincode Landing Page
          </Badge>
          <h1 className="text-4xl font-heading font-bold tracking-tight md:text-6xl">Tutors Near {resolvedCode}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            Students can land directly on this pincode page, browse local tutor options, and enquire with the most relevant nearby profile.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="rounded-full px-7" data-testid="button-browse-pincode-results">
              <Link href="/find-tutors">Browse All Tutors</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-7" data-testid="button-become-tutor-pincode-page">
              <Link href="/auth">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold">Tutor Profiles for {resolvedCode}</h2>
            <p className="mt-1 text-muted-foreground">Crawlable local landing page for students searching by pincode.</p>
          </div>
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-sm" data-testid="badge-pincode-tutor-count">
            {tutorsByPincode.length} result{tutorsByPincode.length === 1 ? "" : "s"}
          </Badge>
        </div>

        {tutorsByPincode.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tutorsByPincode.map((tutor) => (
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
                    <Badge className="rounded-full bg-primary/10 text-primary" data-testid={`badge-pincode-rating-${tutor.id}`}>
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
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      <span>{tutor.pincode}</span>
                    </div>
                  </div>
                  <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{tutor.bio}</p>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-lg font-bold text-foreground">₹{tutor.price}/hr</p>
                      <p className="text-xs text-muted-foreground">Offline tuition</p>
                    </div>
                    <Button asChild className="rounded-full px-6" data-testid={`button-view-pincode-profile-${tutor.id}`}>
                      <Link href={`/tutor/${tutor.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-border/70 bg-muted/20 px-6 py-16 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold">More tutors are joining in {resolvedCode}</h3>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              This page is ready for search discovery, and new nearby tutor profiles will appear here as they are added.
            </p>
          </div>
        )}
      </section>

      <section className="container mx-auto grid gap-6 px-4 pb-16 md:grid-cols-2 xl:grid-cols-3">
        <Card className="rounded-[28px] border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Cities & Local Areas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {indexableLocations.slice(0, 18).map((location) => (
              <Link
                key={location}
                href={`/location/${slugify(location)}`}
                className="rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                data-testid={`link-pincode-location-${slugify(location)}`}
              >
                {location}
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Subjects</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {indexableSubjects.slice(0, 18).map((item) => (
              <Link
                key={item}
                href={`/subject/${slugify(item)}`}
                className="rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                data-testid={`link-pincode-subject-${slugify(item)}`}
              >
                {item}
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/60 md:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Other Pincodes</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {indexablePincodes.map((item) => (
              <Link
                key={item}
                href={`/pincode/${item}`}
                className={`rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground ${item === resolvedCode ? "border-primary bg-primary/10 text-primary" : ""}`}
                data-testid={`link-other-pincode-${item}`}
              >
                {item}
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
