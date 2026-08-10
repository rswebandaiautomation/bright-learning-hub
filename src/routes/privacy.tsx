import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, PublicLayout } from "@/components/layout/PublicLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — BELIGHT TECH" },
      {
        name: "description",
        content: "How BELIGHT TECH handles learner information, accounts and platform data.",
      },
      { property: "og:title", content: "Privacy Policy — BELIGHT TECH" },
      { property: "og:description", content: "Our approach to learner privacy and data handling." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="A summary of how learner information will be handled on the BELIGHT TECH platform."
      />
      <section className="container-page max-w-3xl space-y-6 py-14 text-sm leading-relaxed text-muted-foreground">
        <p>
          BELIGHT TECH collects only the information needed to operate the learning platform:
          account details, course enrolments, learning progress and submitted work.
        </p>
        <div>
          <h2 className="text-lg font-bold text-foreground">Information we will collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Account information such as name and email address.</li>
            <li>Learning activity including lesson completion, quiz results and submissions.</li>
            <li>Payment records where a course requires payment.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">How information is protected</h2>
          <p className="mt-3">
            Student data is stored in a secured database with access controls, and sensitive
            information is never cached on a device in an insecure form.
          </p>
        </div>
        <p className="rounded-xl bg-muted px-4 py-3">
          This document is a placeholder for Phase 1 and will be finalised before launch.
        </p>
      </section>
    </PublicLayout>
  );
}
