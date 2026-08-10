import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, PublicLayout } from "@/components/layout/PublicLayout";
import { LearningProcess } from "@/components/sections/LearningProcess";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — BELIGHT TECH Training Programmes" },
      {
        name: "description",
        content:
          "Online technology training, practical web development, AI & automation, digital skills development and project-based learning.",
      },
      { property: "og:title", content: "Services — BELIGHT TECH" },
      {
        property: "og:description",
        content: "Training programmes designed around practical, applied technology outcomes.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Services"
        title="Training programmes for practical skills"
        description="Focused programmes that take learners from fundamentals to applied, project-backed capability."
      />
      <ServicesSection compact />
      <LearningProcess />
    </PublicLayout>
  );
}
