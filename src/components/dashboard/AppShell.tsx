import { Link } from "@tanstack/react-router";
import { LogOut, Menu, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type ShellNavItem = { label: string; icon: LucideIcon };

function NavList({
  items,
  active,
  onSelect,
}: {
  items: ShellNavItem[];
  active: string;
  onSelect: (label: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Dashboard">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelect(item.label)}
          aria-current={item.label === active ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
            item.label === active
              ? "bg-primary text-primary-foreground shadow-soft"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <item.icon className="h-4.5 w-4.5 shrink-0" />
          <span className="truncate">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function AppShell({
  items,
  role,
  title,
  subtitle,
  children,
}: {
  items: ShellNavItem[];
  role: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState(items[0]?.label ?? "");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar p-4 lg:flex">
        <Logo />
        <p className="mt-4 mb-3 px-1 text-[0.65rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          {role}
        </p>
        <NavList items={items} active={active} onSelect={setActive} />
        <Button asChild variant="ghost" className="mt-auto justify-start gap-3 text-muted-foreground">
          <Link to="/">
            <LogOut className="h-4 w-4" />
            Exit dashboard
          </Link>
        </Button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80vw] max-w-xs p-0">
                  <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
                  <div className="flex h-full flex-col gap-4 p-5">
                    <Logo />
                    <NavList
                      items={items}
                      active={active}
                      onSelect={(label) => {
                        setActive(label);
                        setOpen(false);
                      }}
                    />
                    <Button asChild variant="outline" className="mt-auto">
                      <Link to="/">Exit dashboard</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-extrabold sm:text-xl">{title}</h1>
                <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">
              BT
            </span>
          </div>
        </header>

        <main className="min-w-0 flex-1 space-y-6 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 truncate text-sm font-medium text-muted-foreground">{label}</p>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-extrabold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
