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
  "Mumbai", "Colaba", "Fort", "Nariman Point", "Bandra", "BKC", "Andheri", "Powai", "Juhu", "Lower Parel", "Worli", "Dadar",
  "Delhi", "Connaught Place", "Chanakyapuri", "Karol Bagh", "Saket", "Hauz Khas", "Dwarka", "Rohini", "Lajpat Nagar", "Chandni Chowk", "Janakpuri",
  "Bengaluru", "Electronic City", "Whitefield", "ORR", "MG Road", "Indiranagar", "Koramangala", "Yelahanka", "Hebbal", "Jayanagar", "Marathahalli",
  "Hyderabad", "HITEC City", "Gachibowli", "Madhapur", "Banjara Hills", "Jubilee Hills", "Charminar", "Secunderabad", "Kondapur", "Shamshabad", "Begumpet",
  "Chennai", "OMR", "Guindy", "Anna Salai", "T. Nagar", "Mylapore", "Adyar", "Velachery", "Sholinganallur", "Porur", "Sriperumbudur",
  "Kolkata", "Salt Lake", "New Town", "Park Street", "BBD Bagh", "Howrah", "Gariahat", "Alipore", "Dum Dum", "Esplanade", "Dakshineswar",
  "Pune", "Hinjawadi", "Koregaon Park", "Baner", "Balewadi", "Magarpatta", "Hadapsar", "Shivajinagar", "Kharadi", "Wakad", "Pimpri-Chinchwad",
  "Ahmedabad", "SG Highway", "Prahlad Nagar", "Bopal", "South Bopal", "Satellite", "Vastrapur", "Manek Chowk", "Sabarmati", "Chandkheda", "Naroda",
  "Jaipur", "Lucknow", "Kanpur", "Chandigarh", "Ludhiana", "Amritsar", "Agra", "Varanasi", "Dehradun",
  "Surat", "Vadodara", "Indore", "Bhopal", "Nagpur", "Raipur", "Udaipur", "Jodhpur",
  "Coimbatore", "Madurai", "Tiruchirappalli", "Kochi", "Thiruvananthapuram", "Mysuru", "Mangaluru", "Visakhapatnam", "Vijayawada",
  "Bhubaneswar", "Guwahati", "Ranchi", "Patna"
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
