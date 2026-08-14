import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  COURSE_DETAIL_SELECT,
  COURSE_LIST_COLUMNS,
  createPublicClient,
  gradeAttempt,
  toPublicQuestion,
} from "@/lib/courses.server";

export const listCourses = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("courses")
    .select(COURSE_LIST_COLUMNS)
    .eq("is_published", true)
    .order("position", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getCourseBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const supabase = createPublicClient();
    const { data: course, error } = await supabase
      .from("courses")
      .select(COURSE_DETAIL_SELECT)
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!course) return null;

    const modules = [...(course.modules ?? [])]
      .sort((a, b) => a.position - b.position)
      .map((m) => ({
        ...m,
        lessons: [...(m.lessons ?? [])].sort((a, b) => a.position - b.position),
        quiz: (course.quizzes ?? []).find((q) => q.module_id === m.id) ?? null,
      }));

    return { ...course, modules };
  });

export const getMyCourseState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ courseId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const [enrollment, progress, attempts, certificate] = await Promise.all([
      context.supabase
        .from("enrollments")
        .select("*")
        .eq("course_id", data.courseId)
        .eq("user_id", context.userId)
        .maybeSingle(),
      context.supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("course_id", data.courseId)
        .eq("user_id", context.userId),
      context.supabase
        .from("quiz_attempts")
        .select("quiz_id, score_percent, passed, created_at")
        .eq("course_id", data.courseId)
        .eq("user_id", context.userId)
        .order("created_at", { ascending: false }),
      context.supabase
        .from("certificates")
        .select("code, issued_at")
        .eq("course_id", data.courseId)
        .eq("user_id", context.userId)
        .maybeSingle(),
    ]);

    return {
      enrollment: enrollment.data,
      completedLessonIds: (progress.data ?? []).map((row) => row.lesson_id),
      attempts: attempts.data ?? [],
      certificate: certificate.data,
    };
  });

export const enrollInCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ courseId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("enrollments")
      .upsert(
        { user_id: context.userId, course_id: data.courseId },
        { onConflict: "user_id,course_id" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const completeLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ courseId: z.string().uuid(), lessonId: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    await context.supabase
      .from("enrollments")
      .upsert(
        { user_id: context.userId, course_id: data.courseId },
        { onConflict: "user_id,course_id" },
      );

    const { error } = await context.supabase
      .from("lesson_progress")
      .upsert(
        { user_id: context.userId, course_id: data.courseId, lesson_id: data.lessonId },
        { onConflict: "user_id,lesson_id" },
      );
    if (error) throw new Error(error.message);

    const { data: modules } = await supabaseAdmin
      .from("modules")
      .select("id, lessons(id)")
      .eq("course_id", data.courseId);
    const totalLessons = (modules ?? []).reduce((sum, m) => sum + (m.lessons?.length ?? 0), 0);

    const { count } = await context.supabase
      .from("lesson_progress")
      .select("id", { count: "exact", head: true })
      .eq("course_id", data.courseId)
      .eq("user_id", context.userId);

    const done = count ?? 0;
    const percent = totalLessons ? Math.round((done / totalLessons) * 100) : 0;
    const completed = percent >= 100;

    await context.supabase
      .from("enrollments")
      .update({
        progress_percent: percent,
        completed_at: completed ? new Date().toISOString() : null,
      })
      .eq("course_id", data.courseId)
      .eq("user_id", context.userId);

    if (completed) {
      await supabaseAdmin
        .from("certificates")
        .upsert(
          { user_id: context.userId, course_id: data.courseId },
          { onConflict: "user_id,course_id", ignoreDuplicates: true },
        );
    }

    return { progressPercent: percent, completed };
  });

export const getQuiz = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ quizId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: quiz, error } = await supabaseAdmin
      .from("quizzes")
      .select("id, title, description, pass_percent, course_id")
      .eq("id", data.quizId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!quiz) return null;

    const { data: questions } = await supabaseAdmin
      .from("quiz_questions")
      .select("id, prompt, options, points, position")
      .eq("quiz_id", data.quizId)
      .order("position", { ascending: true });

    return { ...quiz, questions: (questions ?? []).map(toPublicQuestion) };
  });

export const submitQuiz = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({ quizId: z.string().uuid(), answers: z.record(z.string(), z.number().int().min(0)) })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: quiz } = await supabaseAdmin
      .from("quizzes")
      .select("id, course_id, pass_percent")
      .eq("id", data.quizId)
      .maybeSingle();
    if (!quiz) throw new Error("Quiz not found");

    const { data: questions } = await supabaseAdmin
      .from("quiz_questions")
      .select("id, correct_index, points, explanation")
      .eq("quiz_id", data.quizId)
      .order("position", { ascending: true });

    const { scorePercent, review } = gradeAttempt(questions ?? [], data.answers);
    const passed = scorePercent >= quiz.pass_percent;

    await supabaseAdmin.from("quiz_attempts").insert({
      user_id: context.userId,
      quiz_id: quiz.id,
      course_id: quiz.course_id,
      score_percent: scorePercent,
      passed,
      answers: data.answers,
    });

    return { scorePercent, passed, passMark: quiz.pass_percent, review };
  });

export const getMyLearning = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const [enrollments, progress, attempts, certificates] = await Promise.all([
      context.supabase
        .from("enrollments")
        .select(
          "id, progress_percent, completed_at, created_at, course:courses(id, slug, title, category, level, duration)",
        )
        .eq("user_id", context.userId)
        .order("created_at", { ascending: false }),
      context.supabase.from("lesson_progress").select("id").eq("user_id", context.userId),
      context.supabase
        .from("quiz_attempts")
        .select("id, score_percent, passed, created_at, quiz:quizzes(title), course:courses(title)")
        .eq("user_id", context.userId)
        .order("created_at", { ascending: false })
        .limit(8),
      context.supabase
        .from("certificates")
        .select("code, issued_at, course:courses(title, slug)")
        .eq("user_id", context.userId)
        .order("issued_at", { ascending: false }),
    ]);

    return {
      enrollments: enrollments.data ?? [],
      completedLessons: (progress.data ?? []).length,
      attempts: attempts.data ?? [],
      certificates: certificates.data ?? [],
    };
  });

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Not authorised");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [students, courses, enrollments, certificates, attempts, courseRows, recent] =
      await Promise.all([
        supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
        supabaseAdmin.from("courses").select("id", { count: "exact", head: true }),
        supabaseAdmin.from("enrollments").select("id", { count: "exact", head: true }),
        supabaseAdmin.from("certificates").select("id", { count: "exact", head: true }),
        supabaseAdmin.from("quiz_attempts").select("score_percent"),
        supabaseAdmin
          .from("courses")
          .select("id, slug, title, category, level, is_published, position")
          .order("position", { ascending: true }),
        supabaseAdmin
          .from("enrollments")
          .select("id, progress_percent, created_at, course:courses(title)")
          .order("created_at", { ascending: false })
          .limit(6),
      ]);

    const scores = (attempts.data ?? []).map((a) => a.score_percent);
    const averageScore = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    return {
      totals: {
        students: students.count ?? 0,
        courses: courses.count ?? 0,
        enrollments: enrollments.count ?? 0,
        certificates: certificates.count ?? 0,
        averageScore,
      },
      courses: courseRows.data ?? [],
      recentEnrollments: recent.data ?? [],
    };
  });

export const setCoursePublished = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ courseId: z.string().uuid(), published: z.boolean() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("courses")
      .update({ is_published: data.published })
      .eq("id", data.courseId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
