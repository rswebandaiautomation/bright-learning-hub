import { createFileRoute, Link } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — BELIGHT TECH" },
      { name: "description", content: "Sign in to your BELIGHT TECH learning account." },
      { property: "og:title", content: "Login — BELIGHT TECH" },
      { property: "og:description", content: "Access your BELIGHT TECH courses and progress." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Login,
});

function Login() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.info("Authentication arrives in Phase 2 with Supabase.");
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your learning where you left off."
      footer={
        <>
          New to BELIGHT TECH?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" required />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox id="remember" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full rounded-full">
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
}
