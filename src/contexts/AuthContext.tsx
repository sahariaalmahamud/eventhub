"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createAccountWithFirebase, signInWithFirebase, signOutFromFirebase, signInWithGoogle, signInWithFacebook } from "@/lib/firebase";
import type { AuthUser } from "@/types/event";

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  signInDemo: () => Promise<void>;
  signInWithGoogleProvider: () => Promise<void>;
  signInWithFacebookProvider: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("eventhub-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as AuthUser);
    }
    setLoading(false);
  }, []);

  const persistUser = (nextUser: AuthUser | null) => {
    if (nextUser) {
      window.localStorage.setItem("eventhub-user", JSON.stringify(nextUser));
    } else {
      window.localStorage.removeItem("eventhub-user");
    }
    setUser(nextUser);
  };

  const signIn = async (email: string, password: string) => {
    const firebaseResult = await signInWithFirebase(email, password);
    if (firebaseResult.success && firebaseResult.user) {
      persistUser(firebaseResult.user);
      return;
    }

    persistUser(null);
    throw new Error(firebaseResult.error || "Invalid email or password.");
  };

  const signUp = async (name: string, email: string, password: string) => {
    const firebaseResult = await createAccountWithFirebase(name, email, password);
    if (firebaseResult.success && firebaseResult.user) {
      persistUser(firebaseResult.user);
      return;
    }

    persistUser(null);
    throw new Error(firebaseResult.error || "Unable to create account.");
  };

  const signOutUser = async () => {
    await signOutFromFirebase();
    persistUser(null);
  };

  const signInDemo = async () => {
    persistUser({ uid: "demo-user", name: "Demo Host", email: "demo@eventhub.app" });
  };

  const signInWithGoogleProvider = async () => {
    const firebaseResult = await signInWithGoogle();
    if (firebaseResult.success && firebaseResult.user) {
      persistUser(firebaseResult.user);
    } else {
      throw new Error(firebaseResult.error || "Google sign-in failed");
    }
  };

  const signInWithFacebookProvider = async () => {
    const firebaseResult = await signInWithFacebook();
    if (firebaseResult.success && firebaseResult.user) {
      persistUser(firebaseResult.user);
    } else {
      throw new Error(firebaseResult.error || "Facebook sign-in failed");
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      signIn,
      signUp,
      signOutUser,
      signInDemo,
      signInWithGoogleProvider,
      signInWithFacebookProvider,
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
