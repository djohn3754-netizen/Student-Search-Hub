import { createContext, useContext, useState, ReactNode } from "react";
import { User, USERS } from "./mock-data";
import { useLocation } from "wouter";

interface AuthContextType {
  user: User | null;
  login: (email: string, role: "student" | "tutor") => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const login = (email: string, role: "student" | "tutor") => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      // Find mock user or create a temporary session user
      const mockUser = USERS.find((u) => u.email === email && u.role === role) || {
        id: "temp-user",
        name: "Demo User",
        email,
        role,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      };
      
      setUser(mockUser);
      setIsLoading(false);
      
      if (role === "tutor") {
        setLocation("/tutor-dashboard");
      } else {
        setLocation("/student-dashboard");
      }
    }, 800);
  };

  const logout = () => {
    setUser(null);
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
