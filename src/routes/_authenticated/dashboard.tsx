import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  GraduationCap,
  Settings,
  Sparkles,
  Timer,
  User,
} from "lucide-react";

import { AppShell, StatCard } from "@/components/dashboard/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/data/content";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — BELIGHT TECH" },
      {
        name: "description",
        content: "Track your courses, progress, quiz scores, projects and certificates.",
      },
      { property: "og:title", content: "Student Dashboard — BELIGHT TECH" },
      { property: "og:description", content: "Your BELIGHT TECH learning overview." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

const navItems = [
  { label: "Overview", icon: BarChart3 },
  { label: "My Courses", icon: BookOpen },
  { label: "Quiz Scores", icon: ClipboardList },
  { label: "Projects", icon: FolderKanban },
  { label: "Certificates", icon: Award },
  { label: "Recommended", icon: Sparkles },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
];

const myCourses = [
  { title: "Web Development Foundations", progress: 78, lessons: "21 / 27 lessons" },
  { title: "JavaScript Essentials", progress: 45, lessons: "14 / 31 lessons" },
  { title: "AI & Workflow Automation", progress: 12, lessons: "3 / 24 lessons" },
];

const quizScores = [
  { quiz: "HTML Structure & Semantics", score: "92%", status: "Passed" },
  { quiz: "CSS Layout Systems", score: "85%", status: "Passed" },
  { quiz: "JavaScript Functions", score: "64%", status: "Retake advised" },
];

const projects = [
  { name: "Responsive Landing Page", status: "Approved" },
  { name: "Interactive Quiz App", status: "In review" },
  { name: "Automation Workflow", status: "Not started" },
];

function Dashboard() {
  return (
    <AppShell
      items={navItems}
      role="Student"
      title="Welcome back, Ada"
      subtitle="Here is your learning progress this week"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Overall Progress" value="58%" hint="Across 3 active courses" icon={BarChart3} />
        <StatCard label="Completed Lessons" value="38" hint="Since you joined" icon={CheckCircle2} />
        <StatCard label="Pending Lessons" value="44" hint="Remaining this term" icon={Timer} />
        <StatCard label="Certificates" value="1" hint="1 more course to go" icon={Award} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Card className="border-border/80 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <h2 className="text-base font-bold">My Courses</h2>
            <Badge variant="secondary" className="rounded-full">
              3 active
            </Badge>
          </CardHeader>
          <CardContent className="space-y-5">
            {myCourses.map((course) => (
              <div key={course.title} className="space-y-2">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <p className="truncate text-sm font-semibold">{course.title}</p>
                  <span className="text-sm font-semibold text-primary">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{course.lessons}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-soft">
          <CardHeader>
            <h2 className="text-base font-bold">Quiz Scores</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {quizScores.map((quiz) => (
              <div
                key={quiz.quiz}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-muted/60 px-3.5 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{quiz.quiz}</p>
                  <p className="text-xs text-muted-foreground">{quiz.status}</p>
                </div>
                <span className="text-sm font-bold text-primary">{quiz.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <Card className="border-border/80 shadow-soft">
          <CardHeader>
            <h2 className="text-base font-bold">Projects</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 px-3.5 py-3"
              >
                <p className="truncate text-sm font-medium">{project.name}</p>
                <Badge variant="outline" className="rounded-full text-xs">
                  {project.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-full">
              Submit a project
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-soft">
          <CardHeader className="flex flex-row items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold">Recommended Courses</h2>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {courses.slice(3, 6).map((course) => (
              <div key={course.id} className="rounded-xl border border-border/70 p-4">
                <p className="text-sm font-semibold">{course.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {course.description}
                </p>
                <p className="mt-3 text-xs font-medium text-primary">
                  {course.level} · {course.modules} modules
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
