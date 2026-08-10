import { createFileRoute, Link } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — BELIGHT TECH" },
      { name: "description", content: "Register for BELIGHT TECH and start learning technology." },
      { property: "og:title", content: "Create your account — BELIGHT TECH" },
      {
        property: "og:description",
        content: "Join BELIGHT TECH and start building practical technology skills.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Register,
});

function Register() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.info("Account creation arrives in Phase 2 with Supabase.");
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start learning with structured lessons, projects and certificates."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="Ada" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Obi" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="register-email">Email</Label>
          <Input id="register-email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="register-password">Password</Label>
          <Input id="register-password" type="password" placeholder="At least 8 characters" required />
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox id="terms" className="mt-0.5" />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="font-medium text-primary hover:underline">
              Terms &amp; Conditions
            </Link>
          </span>
        </label>
        <Button type="submit" className="w-full rounded-full">
          Create Account
        </Button>
      </form>
    </AuthLayout>
  );
}
