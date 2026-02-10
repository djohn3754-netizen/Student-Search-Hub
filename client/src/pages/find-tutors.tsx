import { useState, useMemo } from "react";
import { TUTORS, SUBJECTS, LOCATIONS } from "@/lib/mock-data";
import { TutorCard } from "@/components/tutor-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function FindTutors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [minRating, setMinRating] = useState(0);

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

      return matchesSearch && matchesSubject && matchesLocation && matchesPrice && matchesRating;
    });
  }, [searchQuery, selectedSubject, selectedLocation, priceRange, minRating]);

  // Reusable Filter Content
  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Subject</Label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger>
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
        <Label>Location</Label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
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

      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">${priceRange[0]} - ${priceRange[1]}/hr</span>
        </div>
        <Slider 
          defaultValue={[0, 150]} 
          max={150} 
          step={5} 
          value={priceRange} 
          onValueChange={setPriceRange}
          className="py-4"
        />
      </div>

      <div className="space-y-3">
        <Label>Minimum Rating</Label>
        <div className="flex flex-col gap-2">
          {[4.5, 4.0, 3.5].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox 
                id={`rating-${rating}`} 
                checked={minRating === rating}
                onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
              />
              <label 
                htmlFor={`rating-${rating}`} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
              >
                {rating}+ Stars
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSelectedSubject("all");
          setSelectedLocation("all");
          setPriceRange([0, 150]);
          setMinRating(0);
          setSearchQuery("");
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
              <Button variant="outline" className="w-full flex gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filter Tutors</SheetTitle>
                <SheetDescription>Find the perfect tutor for your needs</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 p-6 rounded-xl border bg-card shadow-sm">
            <h2 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </h2>
            <FilterContent />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold mb-4">Find Private Tutors</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name, subject, or keyword..." 
                className="pl-10 h-12 text-lg shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-bold text-foreground">{filteredTutors.length}</span> tutors
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Sort by: <span className="font-medium text-foreground">Recommended</span>
            </div>
          </div>

          {filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
              <h3 className="text-xl font-bold mb-2">No tutors found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
              <Button onClick={() => {
                setSelectedSubject("all");
                setSelectedLocation("all");
                setPriceRange([0, 150]);
                setMinRating(0);
                setSearchQuery("");
              }}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
