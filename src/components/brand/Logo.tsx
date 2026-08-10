import { Link } from "@tanstack/react-router";

import mark from "@/assets/belight-mark.png";
import { cn } from "@/lib/utils";

export function Logo({ className, subdued }: { className?: string; subdued?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="BELIGHT TECH home"
      className={cn("flex min-w-0 items-center gap-2.5", className)}
    >
      <img
        src={mark}
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 shrink-0 rounded-xl bg-primary-soft p-1"
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate font-display text-base font-extrabold tracking-tight">
          BELIGHT <span className="text-primary">TECH</span>
        </span>
        {!subdued && (
          <span className="mt-1 truncate text-[0.65rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            E-Learning
          </span>
        )}
      </span>
    </Link>
  );
}
