import { createFileRoute, redirect } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";
import {
  Award,
  BookOpen,
  ClipboardList,
  CreditCard,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

import { AppShell, StatCard } from "@/components/dashboard/AppShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw redirect({ to: "/login" });
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id);
    const isAdmin = (roles ?? []).some((row) => row.role === "admin");
    if (!isAdmin) throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [
      { title: "Admin Dashboard — BELIGHT TECH" },
      {
        name: "description",
        content: "Platform overview of students, courses, enrolments, revenue and submissions.",
      },
      { property: "og:title", content: "Admin Dashboard — BELIGHT TECH" },
      { property: "og:description", content: "BELIGHT TECH platform administration overview." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Students", icon: Users },
  { label: "Courses", icon: BookOpen },
  { label: "Lessons", icon: ListChecks },
  { label: "Quizzes", icon: ClipboardList },
  { label: "Projects", icon: FolderKanban },
  { label: "Certificates", icon: Award },
  { label: "Payments", icon: CreditCard },
  { label: "Settings", icon: Settings },
];

const recentStudents = [
  { name: "Ada Obi", course: "Web Development Foundations", progress: "78%", status: "Active" },
  { name: "Tunde Bello", course: "JavaScript Essentials", progress: "45%", status: "Active" },
  { name: "Mary Peters", course: "AI & Workflow Automation", progress: "12%", status: "New" },
  { name: "Chidi Nwosu", course: "Databases & APIs", progress: "100%", status: "Completed" },
];

const submissions = [
  { student: "Tunde Bello", project: "Interactive Quiz App", submitted: "2 days ago" },
  { student: "Mary Peters", project: "Automation Workflow", submitted: "4 days ago" },
  { student: "Ada Obi", project: "Responsive Landing Page", submitted: "5 days ago" },
];

function Admin() {
  return (
    <AppShell
      items={navItems}
      role="Administrator"
      title="Platform overview"
      subtitle="Placeholder data — management tools arrive in a later phase"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Students" value="1,248" hint="+42 this month" icon={Users} />
        <StatCard label="Total Courses" value="18" hint="6 published this term" icon={BookOpen} />
        <StatCard label="Enrollments" value="3,106" hint="Across all courses" icon={GraduationCap} />
        <StatCard label="Revenue" value="$24,830" hint="Last 30 days" icon={TrendingUp} />
        <StatCard label="Completed Courses" value="512" hint="Certificates issued" icon={Award} />
        <StatCard label="Pending Submissions" value="27" hint="Awaiting review" icon={FolderKanban} />
      </div>

      <Card className="border-border/80 shadow-soft">
        <CardHeader>
          <h2 className="text-base font-bold">Recent Students</h2>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[36rem]">
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((student) => (
                  <TableRow key={student.name}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-muted-foreground">{student.course}</TableCell>
                    <TableCell className="font-semibold text-primary">{student.progress}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="rounded-full">
                        {student.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/80 shadow-soft">
        <CardHeader>
          <h2 className="text-base font-bold">Pending Project Submissions</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          {submissions.map((item) => (
            <div
              key={item.project}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl bg-muted/60 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{item.project}</p>
                <p className="truncate text-xs text-muted-foreground">{item.student}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{item.submitted}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
