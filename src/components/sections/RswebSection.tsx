import { Code2, PenTool, Rocket } from "lucide-react";

export function RswebSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_1fr] lg:p-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Technology partner
            </p>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Powered by <span className="brand-gradient-text">RSWEB</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              RSWEB is the technology partner behind the BELIGHT TECH platform, responsible for its
              design, development and digital innovation. The partnership keeps the learning
              experience modern, reliable and continuously improved.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: PenTool, title: "Design", text: "Interface and experience design." },
              { icon: Code2, title: "Development", text: "Platform engineering and delivery." },
              { icon: Rocket, title: "Innovation", text: "Ongoing digital improvement." },
            ].map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 rounded-2xl bg-primary-soft/70 p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
