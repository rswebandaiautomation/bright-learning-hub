import { Code, GraduationCap, Layers, Monitor, Sparkles } from "lucide-react";

import { SectionHeading } from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/content";

const icons = {
  monitor: Monitor,
  code: Code,
  sparkles: Sparkles,
  graduation: GraduationCap,
  layers: Layers,
} as const;

export function ServicesSection({ compact }: { compact?: boolean }) {
  return (
    <section className="container-page py-16 sm:py-20">
      {!compact && (
        <SectionHeading
          centered
          eyebrow="Services"
          title="What we deliver"
          description="Training programmes built around practical outcomes, not just theory."
        />
      )}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = icons[service.icon as keyof typeof icons];
          return (
            <Card key={service.title} className="h-full border-border/80 shadow-soft">
              <CardContent className="space-y-3 pt-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
