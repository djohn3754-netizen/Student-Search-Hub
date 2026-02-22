import { useState, useMemo } from "react";
import { TUTORS, SUBJECTS, LOCATIONS } from "@/lib/mock-data";
import { TutorCard } from "@/components/tutor-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, MapPin, Calendar, Clock, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function FindTutors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [minRating, setMinRating] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const levels = ["School", "College", "Competitive Exams", "Professional"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleAvailability = (day: string) => {
    setSelectedAvailability(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const filteredTutors = useMemo(() => {
    return TUTORS.filter((tutor) => {
      const matchesSearch = 
        tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tutor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
      const matchesSubject = selectedSubject === "all" || tutor.subject === selectedSubject;
      const matchesLocation = selectedLocation === "all" || tutor.location === selectedLocation;
      const matchesPrice = tutor.price >= priceRange[0] && tutor.price <= priceRange[1];
      const matchesRating = tutor.rating >= minRating;
      
      const matchesAvailability = selectedAvailability.length === 0 || 
        selectedAvailability.some(day => tutor.availability.includes(day));

      return matchesSearch && matchesSubject && matchesLocation && matchesAvailability;
    });
  }, [searchQuery, selectedSubject, selectedLocation, priceRange, minRating, selectedAvailability]);

  const FilterContent = () => (
    <div className="space-y-6 pb-8">
      <div className="space-y-2">
        <Label className="text-sm font-bold flex items-center gap-2">
          <Book className="h-4 w-4 text-primary" /> Subject
        </Label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {SUBJECTS.map((subject) => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-bold flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" /> Location
        </Label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {LOCATIONS.map((location) => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-bold flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-primary" /> Class Level
        </Label>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-bold flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" /> Availability
        </Label>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <Badge 
              key={day} 
              variant={selectedAvailability.includes(day) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
              onClick={() => toggleAvailability(day)}
            >
              {day}
            </Badge>
          ))}
        </div>
      </div>

      <Button 
        variant="ghost" 
        className="w-full text-muted-foreground hover:text-destructive"
        onClick={() => {
          setSelectedSubject("all");
          setSelectedLocation("all");
          setSearchQuery("");
          setSelectedLevel("all");
          setSelectedAvailability([]);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Sheet */}
        <div className="md:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex gap-2 h-12 shadow-sm">
                <SlidersHorizontal className="h-4 w-4" /> Filters & Search
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left border-b pb-4 mb-4">
                <SheetTitle className="font-heading font-bold text-2xl">Refine Search</SheetTitle>
                <SheetDescription>Find your perfect match</SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-180px)] pr-4">
                <FilterContent />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-72 flex-shrink-0">
          <div className="sticky top-24 p-6 rounded-2xl border bg-card shadow-sm">
            <h2 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" /> Filters
            </h2>
            <FilterContent />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold mb-2 tracking-tight">Discover Expert Tutors</h1>
            <p className="text-muted-foreground mb-6">Connecting you with the best offline learning experiences.</p>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search by name, subject, or keyword..." 
                className="pl-12 h-14 text-lg shadow-sm rounded-2xl border-2 focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 py-1 px-3 rounded-full text-sm font-medium">
                {filteredTutors.length} Tutors Available
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
              Sort by: <span className="font-bold text-foreground">Featured</span>
            </div>
          </div>

          {filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {filteredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-muted/20 rounded-3xl border border-dashed border-muted-foreground/20">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No tutors matched your criteria</h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Try widening your price range or selecting different subjects to see more options.</p>
              <Button 
                onClick={() => {
                  setSelectedSubject("all");
                  setSelectedLocation("all");
                  setPriceRange([0, 150]);
                  setMinRating(0);
                  setSearchQuery("");
                  setSelectedLevel("all");
                  setSelectedAvailability([]);
                }}
                className="rounded-full px-8"
              >
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
