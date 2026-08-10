/**
 * Phase 1 placeholder content.
 * In later phases this data comes from Supabase (courses, enrollments, progress).
 */

export type Course = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  modules: number;
  duration: string;
  accent: string;
};

export const courses: Course[] = [
  {
    id: "web-foundations",
    title: "Web Development Foundations",
    description:
      "Build real, responsive web pages with HTML, CSS and modern layout techniques from the ground up.",
    level: "Beginner",
    category: "Web Development",
    modules: 8,
    duration: "6 weeks",
    accent: "from-primary/25 to-primary/5",
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials",
    description:
      "Master variables, logic, functions, DOM manipulation and the fundamentals of interactive interfaces.",
    level: "Beginner",
    category: "Programming",
    modules: 10,
    duration: "8 weeks",
    accent: "from-secondary/25 to-secondary/5",
  },
  {
    id: "react-interfaces",
    title: "Building Interfaces with React",
    description:
      "Design component-driven applications, manage state cleanly and ship production-ready interfaces.",
    level: "Intermediate",
    category: "Web Development",
    modules: 12,
    duration: "10 weeks",
    accent: "from-primary/30 to-secondary/10",
  },
  {
    id: "databases-apis",
    title: "Databases & APIs",
    description:
      "Model data, write queries and connect applications to secure APIs and authenticated backends.",
    level: "Intermediate",
    category: "Backend",
    modules: 9,
    duration: "7 weeks",
    accent: "from-secondary/20 to-primary/10",
  },
  {
    id: "ai-automation",
    title: "AI & Workflow Automation",
    description:
      "Apply AI tools and automation to real tasks, from prompt design to practical workflow integration.",
    level: "Intermediate",
    category: "AI & Automation",
    modules: 7,
    duration: "5 weeks",
    accent: "from-primary/25 to-secondary/15",
  },
  {
    id: "digital-skills",
    title: "Digital Skills for the Workplace",
    description:
      "Productivity tools, digital communication, online safety and the core skills every modern role needs.",
    level: "Beginner",
    category: "Digital Skills",
    modules: 6,
    duration: "4 weeks",
    accent: "from-primary/20 to-primary/5",
  },
];

export const services = [
  {
    title: "Online Technology Training",
    description:
      "Structured, instructor-designed technology courses delivered entirely online at a learner-friendly pace.",
    icon: "monitor",
  },
  {
    title: "Practical Web Development Training",
    description:
      "Hands-on front-end and back-end training where every concept is applied in a working build.",
    icon: "code",
  },
  {
    title: "AI & Automation Training",
    description:
      "Learn to use AI tools and automation responsibly to solve real problems and speed up daily work.",
    icon: "sparkles",
  },
  {
    title: "Digital Skills Development",
    description:
      "Foundational digital literacy, productivity and online safety skills for study and the workplace.",
    icon: "graduation",
  },
  {
    title: "Project-Based Learning",
    description:
      "Guided projects with clear requirements and feedback so learners finish with evidence of their skills.",
    icon: "layers",
  },
];

export const learningSteps = [
  {
    step: "01",
    title: "Choose a Course",
    description: "Pick a learning path that matches your goals and current experience level.",
    icon: "compass",
  },
  {
    step: "02",
    title: "Learn Through Structured Lessons",
    description: "Progress through modules built around clear explanations and visual learning.",
    icon: "book",
  },
  {
    step: "03",
    title: "Complete Quizzes & Assessments",
    description: "Check your understanding after each module before moving forward.",
    icon: "check",
  },
  {
    step: "04",
    title: "Work on Practical Projects",
    description: "Apply what you learn to realistic builds that mirror actual work.",
    icon: "hammer",
  },
  {
    step: "05",
    title: "Track Your Progress",
    description: "See completed lessons, scores and remaining work in one dashboard.",
    icon: "chart",
  },
  {
    step: "06",
    title: "Earn Your Certificate",
    description: "Finish the requirements and receive a certificate for your completed course.",
    icon: "award",
  },
];
