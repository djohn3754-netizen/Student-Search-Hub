import { useState, useMemo } from "react";
import { TUTORS, SUBJECTS, LOCATIONS } from "@/lib/mock-data";
import { TutorCard } from "@/components/tutor-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Book, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function FindTutors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const handleSearchClick = () => {
    document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const levels = ["School", "College", "Competitive Exams", "Professional"];

  const filteredTutors = useMemo(() => {
    return TUTORS.filter((tutor) => {
      const matchesSearch =
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.localArea?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.pincode?.includes(searchQuery) ||
        tutor.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSubject = selectedSubject === "all" || tutor.subject === selectedSubject;
      const matchesLocation = selectedLocation === "all" || tutor.location === selectedLocation;
      const matchesAvailability = selectedAvailability.length === 0 ||
        selectedAvailability.some((day) => tutor.availability.includes(day));

      return matchesSearch && matchesSubject && matchesLocation && matchesAvailability;
    });
  }, [searchQuery, selectedSubject, selectedLocation, selectedAvailability]);

  const resetFilters = () => {
    setSelectedSubject("all");
    setSelectedLocation("all");
    setSearchQuery("");
    setSelectedLevel("all");
    setSelectedAvailability([]);
  };

  const FilterContent = () => (
    <div className="flex flex-wrap items-end gap-4 bg-card p-4 sm:p-6 rounded-2xl border shadow-sm mb-8">
      <div className="flex-1 min-w-[200px] space-y-2">
        <label className="text-sm font-bold flex items-center gap-2">
          <Book className="h-4 w-4 text-primary" /> Subject
        </label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="bg-background h-12 rounded-xl" data-testid="select-subject-filter">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <ScrollArea className="h-[200px]">
              <SelectItem value="all">All Subjects</SelectItem>
              {SUBJECTS.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px] space-y-2">
        <label className="text-sm font-bold flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" /> Location
        </label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="bg-background h-12 rounded-xl" data-testid="select-location-filter">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <ScrollArea className="h-[200px]">
              <SelectItem value="all">All Locations</SelectItem>
              {LOCATIONS.map((location) => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px] space-y-2">
        <label className="text-sm font-bold flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-primary" /> Class Level
        </label>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="bg-background h-12 rounded-xl" data-testid="select-level-filter">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <ScrollArea className="h-[200px]">
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-shrink-0 w-full sm:w-auto">
        <Button
          variant="ghost"
          className="h-12 w-full sm:w-auto text-muted-foreground hover:text-destructive px-4 rounded-xl"
          onClick={resetFilters}
          data-testid="button-reset-filters"
        >
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2 tracking-tight">Discover Expert Tutors</h1>
        <p className="text-muted-foreground mb-8">Connecting you with the best offline learning experiences.</p>

        <div className="relative mb-8">
          <div className="group flex overflow-hidden rounded-2xl border border-border bg-background/90 shadow-sm focus-within:ring-2 focus-within:ring-primary/20">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search by name, local area, or pincode..."
                className="h-14 border-0 bg-transparent pl-12 pr-4 text-base shadow-none focus-visible:ring-0 sm:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-tutors"
              />
            </div>
            <Button type="button" onClick={handleSearchClick} className="h-14 rounded-none rounded-r-2xl px-6 sm:px-8 font-bold shadow-none" data-testid="button-search-tutors">
              Search
            </Button>
          </div>
        </div>

        <FilterContent />

        <section className="bg-primary/5 p-5 sm:p-8 rounded-3xl border border-primary/10 mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
              <Star className="h-6 w-6 text-primary fill-primary" /> Featured Tutors
            </h2>
            <Badge variant="outline" className="w-fit border-primary/10 bg-background/80 text-primary backdrop-blur-sm">Currently showing {TUTORS.length} verified tutor</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
            <TutorCard tutor={TUTORS[0]} />
            <div className="rounded-3xl border border-dashed border-primary/20 bg-card/80 p-6 sm:p-7 backdrop-blur-sm">
              <p className="text-lg font-bold mb-2">More verified tutors are joining soon.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">We are keeping the marketplace lean and trustworthy while new tutor profiles are being reviewed. You can still send an enquiry to the currently available tutor today.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-8">
        <div id="results-section" className="flex-1 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 py-1 px-3 rounded-full text-sm font-medium w-fit">
              {filteredTutors.length} Tutor{filteredTutors.length === 1 ? "" : "s"} Available
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-full w-fit">
              Sort by: <span className="font-bold text-foreground">Recently Added</span>
            </div>
          </div>

          {filteredTutors.length > 0 ? (
            <>
              {filteredTutors.length === 1 && (
                <div className="mb-6 rounded-3xl border border-primary/10 bg-primary/5 px-5 py-4">
                  <p className="font-semibold text-foreground">More verified tutors are joining soon.</p>
                  <p className="text-sm text-muted-foreground">For now, this is the currently available verified tutor on Nexamid.</p>
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {filteredTutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 sm:py-24 bg-muted/20 rounded-3xl border border-dashed border-muted-foreground/20 px-6">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No tutors matched your criteria</h3>
              <p className="text-muted-foreground mb-3 max-w-sm mx-auto">Try a broader location or subject search to see the current verified tutor.</p>
              <p className="text-sm text-primary font-medium mb-8">More verified tutors are joining soon.</p>
              <Button onClick={resetFilters} className="rounded-full px-8 h-12" data-testid="button-reset-empty-state">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GraduationCap(props: any) {
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
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
