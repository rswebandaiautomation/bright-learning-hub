import { Award, BarChart3, BookOpen, CheckCircle2, Compass, Hammer } from "lucide-react";

import { SectionHeading } from "@/components/layout/PublicLayout";
import { learningSteps } from "@/data/content";

const icons = {
  compass: Compass,
  book: BookOpen,
  check: CheckCircle2,
  hammer: Hammer,
  chart: BarChart3,
  award: Award,
} as const;

export function LearningProcess() {
  return (
    <section className="border-y border-border/70 bg-surface py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          centered
          eyebrow="Learning experience"
          title="How learning works at BELIGHT TECH"
          description="A clear path from your first lesson to a completed, certified course."
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {learningSteps.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <li
                key={item.step}
                className="group relative rounded-2xl border border-border/80 bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-2xl font-extrabold text-primary/25">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
