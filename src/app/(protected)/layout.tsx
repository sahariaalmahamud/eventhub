"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }

    const pathname = window.location.pathname;
    if (!loading && user?.email?.toLowerCase() !== "admin@eventhub.app" && pathname.startsWith("/dashboard")) {
      router.replace("/");
    }
  }, [loading, router, user]);

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
