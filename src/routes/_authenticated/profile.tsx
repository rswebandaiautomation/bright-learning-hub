import { createFileRoute } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { friendlyAuthError, useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — BELIGHT TECH" },
      { name: "description", content: "Manage your BELIGHT TECH account details." },
      { property: "og:title", content: "My Profile — BELIGHT TECH" },
      { property: "og:description", content: "Update your BELIGHT TECH account information." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function initials(name: string, fallback: string) {
  const source = name.trim() || fallback;
  return (
    source
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "BT"
  );
}

function ProfilePage() {
  const { user, profile, role, loading, refresh } = useAuth();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
    setAvatarUrl(profile?.avatar_url ?? "");
  }, [profile?.full_name, profile?.avatar_url]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim(), avatar_url: avatarUrl.trim() || null })
        .eq("id", user.id);
      if (updateError) throw updateError;
      await refresh();
      toast.success("Profile updated.");
    } catch (caught) {
      setError(friendlyAuthError(caught));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-10 sm:px-6">
      <div className="mx-auto grid w-full max-w-3xl gap-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">My Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your account details. Your role is managed by BELIGHT TECH administrators.
          </p>
        </div>

        <Card className="border-border/80 shadow-soft">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-14 w-14">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName || "Profile photo"} />}
              <AvatarFallback className="bg-primary-soft font-bold text-primary">
                {initials(fullName, user?.email ?? "BT")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-base font-bold">{profile?.full_name || "Your name"}</p>
              <p className="truncate text-sm text-muted-foreground">{profile?.email || user?.email}</p>
            </div>
            <Badge variant="secondary" className="ml-auto shrink-0 rounded-full capitalize">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              {role ?? "student"}
            </Badge>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5" onSubmit={handleSubmit}>
              {error && (
                <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              )}
              <div className="grid gap-2">
                <Label htmlFor="profile-name">Full name</Label>
                <Input
                  id="profile-name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-avatar">Avatar image URL</Label>
                <Input
                  id="profile-avatar"
                  value={avatarUrl}
                  onChange={(event) => setAvatarUrl(event.target.value)}
                  placeholder="https://…"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="profile-email">Email</Label>
                  <Input id="profile-email" value={profile?.email ?? user?.email ?? ""} readOnly disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="profile-created">Member since</Label>
                  <Input
                    id="profile-created"
                    value={
                      profile?.created_at
                        ? new Date(profile.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "—"
                    }
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <Button type="submit" className="rounded-full sm:w-fit sm:px-8" disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
