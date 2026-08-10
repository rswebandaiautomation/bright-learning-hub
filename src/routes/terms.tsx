import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, PublicLayout } from "@/components/layout/PublicLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — BELIGHT TECH" },
      {
        name: "description",
        content: "The terms that govern the use of the BELIGHT TECH e-learning platform.",
      },
      { property: "og:title", content: "Terms & Conditions — BELIGHT TECH" },
      { property: "og:description", content: "Terms governing use of the BELIGHT TECH platform." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The conditions that will govern learner use of the BELIGHT TECH platform."
      />
      <section className="container-page max-w-3xl space-y-6 py-14 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="text-lg font-bold text-foreground">Use of the platform</h2>
          <p className="mt-3">
            Accounts are personal and should not be shared. Course materials are provided for
            individual learning use.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Learner responsibilities</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Submit original work for projects and assessments.</li>
            <li>Keep account credentials secure.</li>
            <li>Respect other learners and instructors.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Certificates</h2>
          <p className="mt-3">
            Certificates are issued only when the published requirements of a course have been
            completed.
          </p>
        </div>
        <p className="rounded-xl bg-muted px-4 py-3">
          This document is a placeholder for Phase 1 and will be finalised before launch.
        </p>
      </section>
    </PublicLayout>
  );
}
