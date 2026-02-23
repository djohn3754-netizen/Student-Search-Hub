import { Tutor } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, GraduationCap } from "lucide-react";
import { Link } from "wouter";

interface TutorCardProps {
  tutor: Tutor;
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50 group">
      <CardHeader className="p-0">
        <div className="h-24 bg-gradient-to-r from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors" />
      </CardHeader>
      <CardContent className="px-6 pb-6 relative pt-0">
        <div className="flex justify-between items-start">
          <div className="-mt-12 mb-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
              <AvatarImage src={tutor.avatar} alt={tutor.name} className="object-cover" />
              <AvatarFallback className="text-xl">{tutor.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-lg line-clamp-1">{tutor.name}</h3>
          <p className="text-primary font-medium text-sm mb-2">{tutor.subject} Tutor</p>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <MapPin className="h-3 w-3" />
            {tutor.localArea ? `${tutor.localArea}, ` : ''}{tutor.location} {tutor.pincode ? `(${tutor.pincode})` : ''}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <GraduationCap className="h-3 w-3" />
            {tutor.experience} Years Experience
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {tutor.bio}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {tutor.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link href={`/tutor/${tutor.id}`} className="w-full">
          <Button className="w-full rounded-full font-semibold">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
