import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/Logo";
import { Card, CardContent } from "@/components/ui/card";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="surface-gradient flex min-h-screen flex-col">
      <header className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
          Back to site
        </Link>
      </header>

      <main className="container-page flex flex-1 items-center justify-center py-10">
        <Card className="w-full max-w-md border-border/80 shadow-lift">
          <CardContent className="pt-8 pb-8">
            <h1 className="text-2xl font-extrabold">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
            <div className="mt-6">{children}</div>
            <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
            <p className="mt-6 rounded-xl bg-muted px-3 py-2 text-center text-xs text-muted-foreground">
              Interface preview — secure authentication is connected with Supabase in Phase 2.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
