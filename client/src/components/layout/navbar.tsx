import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, BookOpen, Search, LayoutDashboard, LogOut, User, MessageCircle, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start gap-0 hover:opacity-90 transition-opacity">
          <div className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
            <span>Nexamid</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-medium -mt-1 ml-0 italic">
            “Your Learning Journey Starts Here.”
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
            Home
          </Link>
          <Link href="/find-tutors" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/find-tutors") ? "text-primary" : "text-muted-foreground"}`}>
            Find Tutors
          </Link>
          <Link href="/blog" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/blog") ? "text-primary" : "text-muted-foreground"}`}>
            Blog
          </Link>
          <Link href="/about" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/about") ? "text-primary" : "text-muted-foreground"}`}>
            About Us
          </Link>
          
          {user && (
            <Link href={user.role === "admin" ? "/admin-dashboard" : "/tutor-dashboard"} className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/admin-dashboard") || isActive("/tutor-dashboard") ? "text-primary" : "text-muted-foreground"}`}>
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons / Profile Dropdown */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-primary/10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={user.role === "admin" ? "/admin-dashboard" : "/tutor-dashboard"}>
                    <div className="flex w-full items-center cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <div className="flex w-full items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">Tutors Login</Button>
              </Link>
              <Link href="/auth">
                <Button className="font-semibold shadow-sm">Sign up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/find-tutors" className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Find Tutors
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            {user && (
              <Link href={user.role === "admin" ? "/admin-dashboard" : "/tutor-dashboard"} className="text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            
            <div className="pt-4 border-t flex flex-col gap-2">
              {user ? (
                <Button variant="destructive" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>Log out</Button>
              ) : (
                <>
                  <Link href="/auth">
                    <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Tutors Login</Button>
                  </Link>
                  <Link href="/auth">
                    <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
