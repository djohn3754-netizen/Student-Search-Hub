import { useMemo, useState } from "react";
import { TUTORS, SUBJECTS, LOCATIONS } from "@/lib/mock-data";
import { TutorCard } from "@/components/tutor-card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Book, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FindTutors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const levels = ["School", "College", "Competitive Exams", "Professional"];

  const handleSearchClick = () => {
    document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredTutors = useMemo(() => {
    return TUTORS.filter((tutor) => {
      const matchesSearch =
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.localArea?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.pincode?.includes(searchQuery) ||
        tutor.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSubject =
        selectedSubject.trim() === "" ||
        tutor.subject.toLowerCase().includes(selectedSubject.toLowerCase()) ||
        tutor.tags.some((tag) => tag.toLowerCase().includes(selectedSubject.toLowerCase()));

      const matchesLocation =
        selectedLocation.trim() === "" ||
        tutor.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        tutor.localArea?.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        tutor.pincode?.includes(selectedLocation);

      const matchesLevel =
        selectedLevel.trim() === "" ||
        tutor.bio.toLowerCase().includes(selectedLevel.toLowerCase()) ||
        tutor.tags.some((tag) => tag.toLowerCase().includes(selectedLevel.toLowerCase())) ||
        tutor.subject.toLowerCase().includes(selectedLevel.toLowerCase());

      const matchesAvailability =
        selectedAvailability.length === 0 ||
        selectedAvailability.some((day) => tutor.availability.includes(day));

      return matchesSearch && matchesSubject && matchesLocation && matchesLevel && matchesAvailability;
    });
  }, [searchQuery, selectedSubject, selectedLocation, selectedLevel, selectedAvailability]);

  const resetFilters = () => {
    setSelectedSubject("");
    setSelectedLocation("");
    setSearchQuery("");
    setSelectedLevel("");
    setSelectedAvailability([]);
  };

  const filterContent = (
    <div className="mb-8 flex flex-wrap items-end gap-4 rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
      <FilterInput
        label="Subject"
        icon={<Book className="h-4 w-4 text-primary" />}
        value={selectedSubject}
        onChange={setSelectedSubject}
        options={SUBJECTS}
        placeholder="Type or select subject"
        inputTestId="input-subject-filter"
        buttonTestId="button-subject-filter-toggle"
      />

      <FilterInput
        label="Location"
        icon={<MapPin className="h-4 w-4 text-primary" />}
        value={selectedLocation}
        onChange={setSelectedLocation}
        options={LOCATIONS}
        placeholder="Type or select location"
        inputTestId="input-location-filter"
        buttonTestId="button-location-filter-toggle"
      />

      <FilterInput
        label="Class Level"
        icon={<GraduationCap className="h-4 w-4 text-primary" />}
        value={selectedLevel}
        onChange={setSelectedLevel}
        options={levels}
        placeholder="Type or select class level"
        inputTestId="input-level-filter"
        buttonTestId="button-level-filter-toggle"
      />

      <div className="w-full flex-shrink-0 sm:w-auto">
        <Button
          type="button"
          variant="ghost"
          className="h-12 w-full rounded-xl px-4 text-muted-foreground hover:text-destructive sm:w-auto"
          onClick={resetFilters}
          data-testid="button-reset-filters"
        >
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto min-h-screen px-4 py-6 sm:py-8">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-heading font-bold tracking-tight sm:text-4xl">Discover Expert Tutors</h1>
        <p className="mb-8 text-muted-foreground">Connecting you with the best offline learning experiences.</p>

        <div className="relative mb-8">
          <div className="group flex overflow-hidden rounded-2xl border border-border bg-background/90 shadow-sm focus-within:ring-2 focus-within:ring-primary/20">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                placeholder="Search by name, local area, or pincode..."
                className="h-14 border-0 bg-transparent pl-12 pr-4 text-base shadow-none focus-visible:ring-0 sm:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-tutors"
              />
            </div>
            <Button type="button" onClick={handleSearchClick} className="h-14 rounded-none rounded-r-2xl px-6 font-bold shadow-none sm:px-8" data-testid="button-search-tutors">
              Search
            </Button>
          </div>
        </div>

        {filterContent}

        <section className="mb-12 space-y-6 rounded-3xl border border-primary/10 bg-primary/5 p-5 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-heading font-bold">
              <Star className="h-6 w-6 fill-primary text-primary" /> Featured Tutors
            </h2>
            <Badge variant="outline" className="w-fit border-primary/10 bg-background/80 text-primary backdrop-blur-sm">Currently showing {TUTORS.length} verified tutor</Badge>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <TutorCard tutor={TUTORS[0]} />
            <div className="rounded-3xl border border-dashed border-primary/20 bg-card/80 p-6 backdrop-blur-sm sm:p-7">
              <p className="mb-2 text-lg font-bold">More verified tutors are joining soon.</p>
              <p className="text-sm leading-relaxed text-muted-foreground">We are keeping the marketplace lean and trustworthy while new tutor profiles are being reviewed. You can still send an enquiry to the currently available tutor today.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-8">
        <div id="results-section" className="flex-1 scroll-mt-24">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Badge variant="outline" className="w-fit rounded-full border-primary/10 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              {filteredTutors.length} Tutor{filteredTutors.length === 1 ? "" : "s"} Available
            </Badge>
            <div className="flex w-fit items-center gap-2 rounded-full bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
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
              <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 lg:grid-cols-2 xl:grid-cols-3">
                {filteredTutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-muted-foreground/20 bg-muted/20 px-6 py-16 text-center sm:py-24">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">No tutors matched your criteria</h3>
              <p className="mx-auto mb-3 max-w-sm text-muted-foreground">Try a broader location or subject search to see the current verified tutor.</p>
              <p className="mb-8 text-sm font-medium text-primary">More verified tutors are joining soon.</p>
              <Button onClick={resetFilters} className="h-12 rounded-full px-8" data-testid="button-reset-empty-state">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type FilterInputProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  inputTestId: string;
  buttonTestId: string;
};

function FilterInput({ label, icon, value, onChange, options, placeholder, inputTestId, buttonTestId }: FilterInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!value.trim()) return options;

    return options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
  }, [options, value]);

  return (
    <div className="relative min-w-[200px] flex-1 space-y-2">
      <label className="flex items-center gap-2 text-sm font-bold">
        {icon} {label}
      </label>

      <div className="relative">
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setIsOpen(false), 150);
          }}
          placeholder={placeholder}
          className="h-12 rounded-xl bg-background pr-12"
          data-testid={inputTestId}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          data-testid={buttonTestId}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>

        {isOpen && (
          <div className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-2xl border border-border bg-popover p-2 shadow-xl">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">No matching options</div>
            )}
          </div>
        )}
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
