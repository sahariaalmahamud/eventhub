"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PageShell } from "@/components/ui/page-shell";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInDemo, signInWithGoogleProvider, signInWithFacebookProvider } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signIn(email, password);

      if (email.trim().toLowerCase() === "admin@eventhub.app") {
        router.push("/dashboard");
      } else {
        setError("Only the admin account can access the dashboard.");
        router.replace("/");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unable to sign in. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setSocialLoading("google");
    try {
      await signInWithGoogleProvider();
      router.push("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Google sign-in failed. Please try again.";
      setError(errorMessage);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleFacebookSignIn = async () => {
    setError("");
    setSocialLoading("facebook");
    try {
      await signInWithFacebookProvider();
      router.push("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Facebook sign-in failed. Please try again.";
      setError(errorMessage);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    try {
      await signInDemo();
      router.push("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Demo sign-in failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <PageShell>
      <section className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Welcome back</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Log in to EventHub</h1>
          <p className="mt-3 text-sm text-slate-600">Access your dashboard, manage events, and continue growing your community.</p>

          {/* Social Sign-In Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={socialLoading !== null || isLoading}
              className="w-full flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {socialLoading === "google" ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </>
              )}
            </button>

            <button
              onClick={handleFacebookSignIn}
              disabled={socialLoading !== null || isLoading}
              className="w-full flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {socialLoading === "facebook" ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Sign in with Facebook
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative mt-8 mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="Email"
              type="email"
              disabled={isLoading || socialLoading !== null}
            />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="Password"
              type="password"
              disabled={isLoading || socialLoading !== null}
            />
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
            <button
              className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="submit"
              disabled={isLoading || socialLoading !== null}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <button
            onClick={() => void handleDemoLogin()}
            disabled={isLoading || socialLoading !== null}
            className="mt-4 w-full rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Demo login
          </button>
          <p className="mt-6 text-sm text-slate-500">
            Not registered yet? <Link href="/register" className="font-semibold text-blue-600">Create an account</Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
