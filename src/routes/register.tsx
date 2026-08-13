import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { friendlyAuthError } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Register() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("full_name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirm_password") ?? "");
    const accepted = form.get("terms") !== null;

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in every field.");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Use a mix of letters and numbers for a stronger password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The two passwords don't match.");
      return;
    }
    if (!accepted) {
      setError("Please accept the Terms & Conditions to continue.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      if (signUpError) throw signUpError;

      if (data.session) {
        toast.success("Welcome to BELIGHT TECH! Your account is ready.");
        navigate({ to: "/dashboard", replace: true });
        return;
      }

      setNotice("Account created. Check your email to confirm your address, then sign in.");
      toast.success("Account created. Please confirm your email.");
    } catch (caught) {
      setError(friendlyAuthError(caught));
    } finally {
      setSubmitting(false);
    }
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
        {error && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="rounded-xl bg-primary-soft px-4 py-3 text-sm text-primary">
            {notice}
          </p>
        )}
        <div className="grid gap-2">
          <Label htmlFor="full-name">Full name</Label>
          <Input id="full-name" name="full_name" autoComplete="name" placeholder="Ada Obi" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <Input
            id="confirm-password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            required
          />
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox id="terms" name="terms" className="mt-0.5" />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="font-medium text-primary hover:underline">
              Terms &amp; Conditions
            </Link>
          </span>
        </label>
        <Button type="submit" className="w-full rounded-full" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Creating account…" : "Create Account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
