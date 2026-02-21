export interface Tutor {
  id: string;
  name: string;
  subject: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  experience: number; // years
  bio: string;
  shortIntro?: string;
  teachingMethod?: {
    description: string;
    points: string[];
  };
  avatar: string;
  availability: string[];
  education: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  avatar?: string;
  status?: "pending" | "approved" | "rejected";
}

export const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Literature",
  "History",
  "Computer Science",
  "Piano",
  "Guitar",
  "Spanish",
  "French",
];

export const LOCATIONS = [
  "New York, NY",
  "Brooklyn, NY",
  "Queens, NY",
  "Jersey City, NJ",
  "Manhattan, NY",
  "Staten Island, NY",
];

export const TUTORS: Tutor[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    subject: "Mathematics",
    location: "Manhattan, NY",
    price: 85,
    rating: 4.9,
    reviews: 124,
    experience: 12,
    bio: "Ph.D. in Mathematics with over 10 years of teaching experience. I specialize in Calculus, Algebra, and SAT Math prep. My teaching style is patient and concept-focused.",
    shortIntro: "Highly experienced Mathematics educator dedicated to simplifying complex calculus and algebraic concepts for students of all levels.",
    teachingMethod: {
      description: "My approach focuses on building a strong conceptual foundation before moving into advanced problem-solving techniques.",
      points: ["Concept-first learning", "Exam-focused preparation", "Step-by-step problem breakdown"]
    },
    avatar: "/assets/avatar-tutor_1.jpg",
    availability: ["Mon", "Wed", "Fri"],
    education: "Ph.D. Mathematics, Columbia University",
    tags: ["Calculus", "Algebra", "SAT Prep", "Advanced"],
  },
  {
    id: "2",
    name: "James Wilson",
    subject: "Physics",
    location: "Brooklyn, NY",
    price: 60,
    rating: 4.7,
    reviews: 45,
    experience: 5,
    bio: "Passionate Physics tutor and Engineering graduate. I make complex concepts easy to understand through real-world examples. Experienced in AP Physics and Regents.",
    avatar: "/assets/avatar-tutor_2.jpg",
    availability: ["Tue", "Thu", "Sat"],
    education: "M.S. Physics, NYU",
    tags: ["Mechanics", "Thermodynamics", "AP Physics", "High School"],
  },
  {
    id: "3",
    name: "Emily Chen",
    subject: "English Literature",
    location: "Queens, NY",
    price: 50,
    rating: 4.8,
    reviews: 89,
    experience: 7,
    bio: "Published author and literature enthusiast. I help students improve their essay writing, reading comprehension, and critical analysis skills.",
    avatar: "/assets/avatar-tutor_3.jpg",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    education: "B.A. English, Yale University",
    tags: ["Essay Writing", "Literature", "Creative Writing", "College Prep"],
  },
  {
    id: "4",
    name: "Michael Ross",
    subject: "Computer Science",
    location: "Jersey City, NJ",
    price: 90,
    rating: 5.0,
    reviews: 32,
    experience: 8,
    bio: "Senior Software Engineer offering coding lessons in Python, Java, and JavaScript. Learn to build real projects and prepare for technical interviews.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    availability: ["Sat", "Sun"],
    education: "B.S. Computer Science, MIT",
    tags: ["Python", "Java", "Web Development", "Data Structures"],
  },
  {
    id: "5",
    name: "Jessica Alverez",
    subject: "Spanish",
    location: "Manhattan, NY",
    price: 45,
    rating: 4.6,
    reviews: 56,
    experience: 4,
    bio: "Native Spanish speaker and certified language instructor. I focus on conversational skills, grammar, and cultural immersion.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    availability: ["Mon", "Wed", "Fri", "Sat"],
    education: "M.A. Linguistics, Barcelona University",
    tags: ["Conversational", "Grammar", "Beginner", "Intermediate"],
  },
  {
    id: "6",
    name: "David Kim",
    subject: "Piano",
    location: "Brooklyn, NY",
    price: 75,
    rating: 4.9,
    reviews: 210,
    experience: 15,
    bio: "Concert pianist with 15 years of teaching experience. I teach students of all ages, from beginners to advanced performers. Classical and Jazz training.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    availability: ["Tue", "Thu", "Fri"],
    education: "B.Mus. Juilliard School",
    tags: ["Classical", "Jazz", "Theory", "Performance"],
  },
];

export const USERS: User[] = [
  {
    id: "student-1",
    name: "Alex Johnson",
    email: "student@example.com",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    status: "approved",
  },
  {
    id: "tutor-1",
    name: "Dr. Sarah Mitchell",
    email: "tutor@example.com",
    role: "tutor",
    avatar: "/assets/avatar-tutor_1.jpg",
    status: "pending",
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
];
