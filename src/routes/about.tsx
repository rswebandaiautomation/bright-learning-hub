import { createFileRoute } from "@tanstack/react-router";
import { Compass, Eye, Target } from "lucide-react";

import { PageHeader, PublicLayout } from "@/components/layout/PublicLayout";
import { RswebSection } from "@/components/sections/RswebSection";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BELIGHT TECH — Mission, Vision & Purpose" },
      {
        name: "description",
        content:
          "BELIGHT TECH bridges the gap between theoretical knowledge and practical technology application through structured, project-based learning.",
      },
      { property: "og:title", content: "About BELIGHT TECH" },
      {
        property: "og:description",
        content: "Our mission, vision and purpose as a practical technology education platform.",
      },
    ],
  }),
  component: About,
});

const pillars = [
  {
    icon: Target,
    title: "Mission",
    text: "To deliver modern, practical technology education that learners can apply immediately to real work and real projects.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "A learning platform where every student finishes with demonstrable skills, completed projects and the confidence to keep building.",
  },
  {
    icon: Compass,
    title: "Purpose",
    text: "To bridge the gap between theoretical knowledge and practical technology application through structured, guided and measurable learning.",
  },
];

function About() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="About"
        title="Technology education built around practice"
        description="BELIGHT TECH is an interactive educational platform designed to provide modern, practical and engaging technology education."
      />

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="border-border/80 shadow-soft">
              <CardContent className="space-y-3 pt-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <pillar.icon className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-bold">{pillar.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-border/80 bg-surface p-8 sm:p-12">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Closing the theory-practice gap</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Many learners understand technology concepts but struggle to apply them. BELIGHT TECH is
            structured to close that gap: every module pairs clear explanation with assessment and
            hands-on work, so understanding is proven through building. Progress is visible,
            feedback is guided, and completion is recognised with a certificate.
          </p>
        </div>
      </section>

      <RswebSection />
    </PublicLayout>
  );
}
