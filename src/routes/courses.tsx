import { createFileRoute } from "@tanstack/react-router";

import { CourseCard } from "@/components/courses/CourseCard";
import { PageHeader, PublicLayout } from "@/components/layout/PublicLayout";
import { LearningProcess } from "@/components/sections/LearningProcess";
import { courses } from "@/data/content";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — BELIGHT TECH E-Learning" },
      {
        name: "description",
        content:
          "Browse BELIGHT TECH courses in web development, programming, backend, AI & automation and digital skills.",
      },
      { property: "og:title", content: "Courses — BELIGHT TECH" },
      {
        property: "og:description",
        content: "Structured technology courses with modules, quizzes, projects and certificates.",
      },
    ],
  }),
  component: Courses,
});

function Courses() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Courses"
        title="Choose your learning path"
        description="Every course is structured into modules with lessons, quizzes, assessments and a practical project."
      />
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
      <LearningProcess />
    </PublicLayout>
  );
}
