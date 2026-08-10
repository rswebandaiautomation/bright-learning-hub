import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, PublicLayout } from "@/components/layout/PublicLayout";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BELIGHT TECH" },
      {
        name: "description",
        content:
          "Get in touch with BELIGHT TECH about courses, training programmes or partnership opportunities.",
      },
      { property: "og:title", content: "Contact BELIGHT TECH" },
      {
        property: "og:description",
        content: "Send a message to the BELIGHT TECH team about courses and training.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Ask about a course, request a training programme, or start a conversation about working together."
      />
      <ContactSection withHeading={false} />
    </PublicLayout>
  );
}
