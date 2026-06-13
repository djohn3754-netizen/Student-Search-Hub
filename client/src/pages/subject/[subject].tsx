import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet";
import { TUTORS } from "@/lib/mock-data";
import { getCanonicalUrl, indexableLocations, indexablePincodes, indexableSubjects, slugify, titleizeSlug } from "@/lib/seo-routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, MapPin, Search, Star } from "lucide-react";

export default function SubjectPage() {
  const { subject } = useParams();
  const resolvedSubject = indexableSubjects.find((item) => slugify(item) === subject) || titleizeSlug(subject || "");
  const normalizedSubject = resolvedSubject.toLowerCase();
  const tutorsBySubject = TUTORS.filter((tutor) =>
    [tutor.subject, tutor.bio, ...tutor.tags].some((value) => value.toLowerCase().includes(normalizedSubject)),
  );
  const canonicalPath = `/subject/${subject}`;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>{`${resolvedSubject} Tutors in India | Nexamid`}</title>
        <meta
          name="description"
          content={`Browse ${resolvedSubject} tutors on Nexamid. Explore local offline tutors, compare profiles, and send direct student enquiries without login.`}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${resolvedSubject} Tutors in India | Nexamid`} />
        <meta
          property="og:description"
          content={`Browse ${resolvedSubject} tutors on Nexamid and connect with local experts for personalized offline learning.`}
        />
        <meta name="twitter:title" content={`${resolvedSubject} Tutors in India | Nexamid`} />
        <meta
          name="twitter:description"
          content={`Browse ${resolvedSubject} tutors on Nexamid and connect with local experts for personalized offline learning.`}
        />
        <link rel="canonical" href={getCanonicalUrl(canonicalPath)} />
      </Helmet>

      <section className="bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.16),_transparent_42%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.38))] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 rounded-full border-primary/20 bg-primary/10 px-4 py-1 text-primary" data-testid="badge-subject-page">
            Subject Landing Page
          </Badge>
          <h1 className="text-4xl font-heading font-bold tracking-tight md:text-6xl">Find {resolvedSubject} Tutors</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            Discover offline tutors for {resolvedSubject}, review their teaching background, and send direct enquiries for the right local match.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="rounded-full px-7" data-testid="button-browse-subject-results">
              <Link href="/find-tutors">Browse All Tutors</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-7" data-testid="button-become-tutor-subject-page">
              <Link href="/auth">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold">Available {resolvedSubject} Tutors</h2>
            <p className="mt-1 text-muted-foreground">Search-ready landing page for students looking for nearby subject experts.</p>
          </div>
          <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-sm" data-testid="badge-subject-tutor-count">
            {tutorsBySubject.length} result{tutorsBySubject.length === 1 ? "" : "s"}
          </Badge>
        </div>

        {tutorsBySubject.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tutorsBySubject.map((tutor) => (
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
                    <Badge className="rounded-full bg-primary/10 text-primary" data-testid={`badge-rating-${tutor.id}`}>
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
                    <Button asChild className="rounded-full px-6" data-testid={`button-view-subject-profile-${tutor.id}`}>
                      <Link href={`/tutor/${tutor.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-border/70 bg-muted/20 px-6 py-16 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold">More {resolvedSubject} tutors are joining soon</h3>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              This landing page is ready for search visibility, and new tutor profiles in this subject will appear here as they are added.
            </p>
          </div>
        )}
      </section>

      <section className="container mx-auto grid gap-6 px-4 pb-16 md:grid-cols-2 xl:grid-cols-3">
        <Card className="rounded-[28px] border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Popular Cities & Areas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {indexableLocations.slice(0, 18).map((location) => (
              <Link
                key={location}
                href={`/location/${slugify(location)}`}
                className="rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                data-testid={`link-location-${slugify(location)}`}
              >
                {location}
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Related Subjects</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {indexableSubjects.slice(0, 18).map((item) => (
              <Link
                key={item}
                href={`/subject/${slugify(item)}`}
                className={`rounded-full border px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground ${item === resolvedSubject ? "border-primary bg-primary/10 text-primary" : ""}`}
                data-testid={`link-related-subject-${slugify(item)}`}
              >
                {item}
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
                  data-testid={`link-pincode-${code}`}
                >
                  {code}
                </Link>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Pincode landing pages will appear here as tutors are added.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
