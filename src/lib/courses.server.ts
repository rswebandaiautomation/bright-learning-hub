import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

/** Publishable-key client for public, RLS-respecting reads inside server code. */
export function createPublicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    },
  );
}

export const COURSE_LIST_COLUMNS =
  "id, slug, title, summary, category, level, accent, duration, cover_url, position";

export const COURSE_DETAIL_SELECT = `
  id, slug, title, summary, description, category, level, accent, duration, cover_url,
  modules ( id, title, description, position,
    lessons ( id, title, slug, content, video_url, duration_minutes, position )
  ),
  quizzes ( id, module_id, title, description, pass_percent, position )
`;

export type PublicQuestion = {
  id: string;
  prompt: string;
  options: string[];
  points: number;
  position: number;
};

export function toPublicQuestion(row: {
  id: string;
  prompt: string;
  options: unknown;
  points: number;
  position: number;
}): PublicQuestion {
  return {
    id: row.id,
    prompt: row.prompt,
    options: Array.isArray(row.options) ? (row.options as string[]) : [],
    points: row.points,
    position: row.position,
  };
}

export function gradeAttempt(
  questions: { id: string; correct_index: number; points: number; explanation: string }[],
  answers: Record<string, number>,
) {
  const total = questions.reduce((sum, q) => sum + (q.points || 1), 0) || 1;
  let earned = 0;
  const review = questions.map((q) => {
    const given = answers[q.id];
    const correct = given === q.correct_index;
    if (correct) earned += q.points || 1;
    return {
      questionId: q.id,
      given: typeof given === "number" ? given : null,
      correctIndex: q.correct_index,
      correct,
      explanation: q.explanation,
    };
  });
  return { scorePercent: Math.round((earned / total) * 100), review };
}
