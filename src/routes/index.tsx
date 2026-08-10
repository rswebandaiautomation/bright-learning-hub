import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, BookOpen, ClipboardCheck, Hammer, ShieldCheck, Sparkles } from "lucide-react";

import heroImage from "@/assets/hero-learning.jpg";
import { CourseCard } from "@/components/courses/CourseCard";
import { PublicLayout, SectionHeading } from "@/components/layout/PublicLayout";
import { ContactSection } from "@/components/sections/ContactSection";
import { LearningProcess } from "@/components/sections/LearningProcess";
import { RswebSection } from "@/components/sections/RswebSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BELIGHT TECH — Practical Technology E-Learning" },
      {
        name: "description",
        content:
          "BELIGHT TECH combines structured lessons, visual learning, quizzes, assessments, projects and progress tracking into one modern learning platform.",
      },
      { property: "og:title", content: "BELIGHT TECH — Practical Technology E-Learning" },
      {
        property: "og:description",
        content:
          "Learn practical technology skills through structured lessons, quizzes, assessments and real projects.",
      },
    ],
  }),
  component: Home,
});

const highlights = [
  { icon: BookOpen, title: "Structured lessons", text: "Modules that build knowledge in order." },
  { icon: Sparkles, title: "Visual learning", text: "Concepts explained the way they click." },
  { icon: ClipboardCheck, title: "Quizzes & assessments", text: "Check understanding as you go." },
  { icon: Hammer, title: "Practical projects", text: "Apply skills to realistic builds." },
  { icon: BarChart3, title: "Progress tracking", text: "Always know what's next." },
  { icon: ShieldCheck, title: "Certificates", text: "Evidence of completed learning." },
];

function Home() {
  return (
    <PublicLayout>
      <section className="surface-gradient">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/70 px-3.5 py-1.5 text-xs font-semibold text-primary">
              Interactive technology education
            </span>
            <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold text-balance sm:text-5xl lg:text-6xl">
              Build technology skills you can actually{" "}
              <span className="brand-gradient-text">use at work</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              BELIGHT TECH combines structured lessons, visual learning, quizzes, assessments,
              practical projects and progress tracking — so every concept you learn ends in
              something you can build.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-lift">
              <img
                src={heroImage}
                alt="Illustration of an online technology learning workspace with lessons, progress and a certificate"
                width={1280}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          centered
          eyebrow="Why BELIGHT TECH"
          title="A complete learning loop, not just videos"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-2xl border border-border/80 bg-card p-5 shadow-soft transition-shadow hover:shadow-lift"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <item.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-surface py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Courses"
              title="Start with a course that fits you"
              description="Realistic, structured programmes across web development, programming, AI and digital skills."
            />
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/courses">View all courses</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
      <LearningProcess />
      <RswebSection />
      <ContactSection />
    </PublicLayout>
  );
}
