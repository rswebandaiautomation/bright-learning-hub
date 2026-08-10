import { createFileRoute, Link } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — BELIGHT TECH" },
      { name: "description", content: "Request a password reset link for your BELIGHT TECH account." },
      { property: "og:title", content: "Reset your password — BELIGHT TECH" },
      { property: "og:description", content: "Recover access to your BELIGHT TECH account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.info("Password recovery arrives in Phase 2 with Supabase.");
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter the email linked to your account and we'll send a reset link."
      footer={
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="reset-email">Email</Label>
          <Input id="reset-email" type="email" placeholder="you@example.com" required />
        </div>
        <Button type="submit" className="w-full rounded-full">
          Send Reset Link
        </Button>
      </form>
    </AuthLayout>
  );
}
