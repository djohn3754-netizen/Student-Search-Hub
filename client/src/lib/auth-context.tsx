import { createContext, useContext, useState, type ReactNode } from "react";
import { TUTORS, type User, USERS } from "./mock-data";
import { useLocation } from "wouter";
import { createTutorAccountRecord, getTutorAccountRecord, saveTutorAccountRecord, TUTOR_ONBOARDING_STEPS } from "./tutor-onboarding";

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const login = (email: string) => {
    setIsLoading(true);

    window.setTimeout(() => {
      const existingTutor = USERS.find((candidate) => candidate.email === email && candidate.role === "tutor");
      const existingTutorProfile = TUTORS.find((candidate) => candidate.name === existingTutor?.name);
      const savedTutorRecord = getTutorAccountRecord(email);
      const tutorRecord =
        savedTutorRecord ||
        saveTutorAccountRecord(
          existingTutor?.status === "approved"
            ? createTutorAccountRecord(
                email,
                existingTutor.name,
                existingTutor.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                {
                  profileCompleted: true,
                  verified: true,
                  currentStep: "bio",
                  completedSteps: [...TUTOR_ONBOARDING_STEPS],
                  profileData: {
                    name: existingTutor.name,
                    experience: existingTutorProfile ? `${existingTutorProfile.experience} Years` : "12 Years",
                    subjects: existingTutorProfile ? [existingTutorProfile.subject, ...existingTutorProfile.tags].join(", ") : "Mathematics, Physics, Calculus",
                    qualification: existingTutorProfile?.education || "Experienced Tutor",
                    city: existingTutorProfile?.location || "Mumbai, Maharashtra",
                    area: existingTutorProfile?.localArea || "Andheri West",
                    pincode: existingTutorProfile?.pincode || "400053",
                    bio: existingTutorProfile?.bio || "Highly experienced tutor with a focus on building clarity, confidence, and strong academic performance.",
                  },
                },
              )
            : createTutorAccountRecord(
                email,
                existingTutor?.name || "New Tutor",
                existingTutor?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
              ),
        );

      const nextUser: User = {
        id: tutorRecord.profileCompleted ? existingTutor?.id || "verified-tutor" : "temp-tutor",
        name: tutorRecord.profileData.name || tutorRecord.name,
        email,
        role: "tutor",
        avatar: tutorRecord.avatar,
        status: tutorRecord.verified ? "approved" : "pending",
      };

      setUser(nextUser);
      setIsLoading(false);

      if (tutorRecord.profileCompleted && tutorRecord.verified) {
        setLocation("/tutor-dashboard?tab=enquiries&view=live");
        return;
      }

      setLocation(`/tutor-dashboard?tab=profile&mode=create&step=${tutorRecord.currentStep}`);
    }, 800);
  };

  const logout = () => {
    setUser(null);
    setLocation("/");
  };

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
