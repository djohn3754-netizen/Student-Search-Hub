import { createContext, useContext, useState, ReactNode } from "react";
import { User, USERS } from "./mock-data";
import { useLocation } from "wouter";

interface AuthContextType {
  user: User | null;
  login: (email: string, options?: { isNewTutor?: boolean }) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const login = (email: string, options?: { isNewTutor?: boolean }) => {
    setIsLoading(true);
    setTimeout(() => {
      const existingTutor = USERS.find((u) => u.email === email && u.role === "tutor");
      const mockUser = options?.isNewTutor
        ? {
            id: "temp-tutor",
            name: "New Tutor",
            email,
            role: "tutor",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            status: "approved",
          }
        : existingTutor || {
            id: "temp-tutor",
            name: "Demo Tutor",
            email,
            role: "tutor",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            status: "approved",
          };

      setUser(mockUser as User);
      setIsLoading(false);

      setLocation(options?.isNewTutor ? "/tutor-dashboard?tab=profile&mode=create" : "/tutor-dashboard?tab=profile");
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
