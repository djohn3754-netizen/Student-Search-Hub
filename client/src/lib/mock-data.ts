export interface Tutor {
  id: string;
  name: string;
  subject: string;
  location: string;
  localArea?: string;
  pincode?: string;
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
  "JEE/NEET",
  "Spoken English",
  "Coding",
  "AI",
  "Digital Skills",
  "Robotics",
  "Commerce (Accountancy, Economics)",
  "Competitive Exam Preparation & Aptitude",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Literature",
  "History",
  "Computer Science",
  "French",
];

export const LOCATIONS = [
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Kharagpur, West Bengal",
  "Midnapore, West Bengal"
];

export const TUTORS: Tutor[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    subject: "Mathematics",
    location: "Mumbai, Maharashtra",
    localArea: "Andheri West",
    pincode: "400053",
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
    location: "Delhi, NCR",
    localArea: "Hauz Khas",
    pincode: "110016",
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
    location: "Bengaluru, Karnataka",
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
    location: "Hyderabad, Telangana",
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
    location: "Ahmedabad, Gujarat",
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
    location: "Chennai, Tamil Nadu",
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

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Find the Best Home Tutors Near You – Personalized Learning for Student Success",
    excerpt: "In today’s competitive academic environment, many parents and students prefer personalized home tuition over crowded coaching centers. Finding the right tutor can make a significant difference in a student’s confidence, subject understanding, and overall academic performance.",
    date: "March 01, 2026",
    category: "Education",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    content: `
# Find the Best Home Tutors Near You – Personalized Learning for Student Success

In today’s competitive academic environment, many parents and students prefer **personalized home tuition** over crowded coaching centers. Finding the right tutor can make a significant difference in a student’s confidence, subject understanding, and overall academic performance.

If you are searching for **qualified home tutors near you**, our platform helps connect students with experienced teachers for one-to-one offline learning tailored to individual needs.

---

## Why Choose a Home Tutor?

Every student learns differently. Unlike classroom teaching, home tuition focuses entirely on the learner’s pace and style.

### ✔ Individual Attention

A private tutor identifies weak areas and works closely to strengthen concepts, ensuring better retention and clarity.

### ✔ Customized Study Plans

Lessons are designed based on:

* School syllabus (CBSE, ICSE, State Board)
* Student learning speed
* Exam preparation goals
* Homework and revision support

### ✔ Flexible Timing

Students can schedule sessions according to their daily routine, reducing stress and improving consistency.

### ✔ Stronger Academic Foundation

Regular one-to-one interaction allows tutors to build subject fundamentals, especially in Mathematics, Science, and English.

---

## Subjects Covered by Experienced Tutors

Our listed tutors provide guidance across multiple subjects and grade levels:

* Mathematics (Primary to Class 12)
* Physics, Chemistry, and Biology
* English and Humanities
* Computer Science
* Board Exam Preparation
* Competitive Exam Foundation

Whether a student needs help catching up or wants to excel, the right tutor ensures structured academic progress.

---

## How Our Tutor Search Platform Helps Students

Finding a reliable tutor locally can be difficult. Our platform simplifies the process by allowing students and parents to:

1. Search tutors by location
2. Filter by subject and class level
3. View tutor profiles and experience
4. Connect directly for offline home tuition
5. Choose tutors that match learning needs

This makes discovering trusted tutors faster, safer, and more convenient.

---

## Benefits of Offline Learning with a Local Tutor

While online classes are common, many families still prefer offline tuition because it offers:

* Better focus without screen distractions
* Direct interaction and real-time doubt solving
* Improved discipline and study habits
* Strong mentor–student connection
* Practical explanation of difficult topics

Offline tutoring creates an environment where students feel comfortable asking questions and engaging deeply with subjects.

---

## Who Can Benefit from Home Tuition?

Home tutoring is ideal for:

* Students needing academic improvement
* Learners preparing for board examinations
* Children requiring structured study routines
* Students struggling with specific subjects
* Parents looking for safe, local academic support

---

## Start Your Search for the Right Tutor Today

Education is not just about completing the syllabus—it’s about building confidence, curiosity, and lifelong learning skills. A dedicated home tutor can guide students toward better results and a stronger academic future.

Browse available tutors, compare options, and connect with experienced educators near you to begin a more focused and effective learning journey.
    `
  },
  {
    id: "2",
    title: "How to Choose the Right Tutor for Your Child",
    excerpt: "Finding the perfect match depends on understanding your child's unique learning style and academic goals.",
    date: "Oct 12, 2023",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    content: ""
  },
  {
    id: "3",
    title: "5 Tips for Effective Online Learning",
    excerpt: "Maximize your productivity and learning outcomes with these proven strategies for digital education.",
    date: "Oct 10, 2023",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    content: ""
  },
  {
    id: "4",
    title: "The Future of Personalized Education in India",
    excerpt: "How technology and dedicated tutoring are reshaping the academic landscape for millions of students.",
    date: "Oct 08, 2023",
    category: "Education",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=800",
    content: ""
  }
];
