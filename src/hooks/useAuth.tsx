import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { supabase } from "@/integrations/supabase/client";

export type AppRole = "student" | "admin" | "instructor";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  role: AppRole | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** Maps backend errors to safe, friendly copy. Never surface raw details. */
export function friendlyAuthError(error: unknown): string {
  const raw =
    typeof error === "object" && error !== null && "message" in error
      ? String((error as { message: unknown }).message)
      : "";
  const message = raw.toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "That email and password combination doesn't match our records.";
  }
  if (message.includes("email not confirmed")) {
    return "Please confirm your email address before signing in.";
  }
  if (message.includes("already registered") || message.includes("already been registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  if (message.includes("user already registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  if (message.includes("invalid email") || message.includes("email address")) {
    return "Please enter a valid email address.";
  }
  if (message.includes("password") && (message.includes("short") || message.includes("least"))) {
    return "Your password is too short. Use at least 8 characters.";
  }
  if (message.includes("weak") || message.includes("pwned") || message.includes("compromised")) {
    return "That password is too weak. Please choose a stronger one.";
  }
  if (message.includes("expired") || message.includes("invalid token") || message.includes("otp")) {
    return "This link has expired. Please request a new one.";
  }
  if (message.includes("rate limit") || message.includes("too many")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (message.includes("failed to fetch") || message.includes("network")) {
    return "We couldn't reach the server. Check your connection and try again.";
  }
  return "Something went wrong. Please try again.";
}

async function loadAccount(userId: string) {
  const [profileResult, rolesResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", userId),
  ]);

  const roles = (rolesResult.data ?? []).map((row) => row.role as AppRole);
  const role: AppRole | null = roles.includes("admin")
    ? "admin"
    : roles.includes("instructor")
      ? "instructor"
      : roles.includes("student")
        ? "student"
        : null;

  return { profile: (profileResult.data as Profile | null) ?? null, role };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession);
    if (!nextSession?.user) {
      setProfile(null);
      setRole(null);
      setLoading(false);
      return;
    }
    try {
      const account = await loadAccount(nextSession.user.id);
      setProfile(account.profile);
      setRole(account.role);
    } catch {
      setProfile(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) void hydrate(data.session ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") {
        if (event === "PASSWORD_RECOVERY") setSession(nextSession ?? null);
        return;
      }
      void hydrate(nextSession ?? null);
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, [hydrate, queryClient, router]);

  const refresh = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    await hydrate(data.session ?? null);
  }, [hydrate]);

  const signOut = useCallback(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    setRole(null);
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      role,
      loading,
      isAuthenticated: Boolean(session?.user),
      isAdmin: role === "admin",
      refresh,
      signOut,
    }),
    [loading, profile, refresh, role, session, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
