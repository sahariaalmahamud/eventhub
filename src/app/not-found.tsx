import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";

export default function NotFoundPage() {
  return (
    <PageShell>
      <section className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-12 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Oops! Page not found.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We couldn’t find the page you were looking for. It may have been moved, renamed, or never existed.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
            >
              Back to homepage <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/explore"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              Explore events
            </Link>
          </div>

          <div className="mt-10 grid gap-4 rounded-[32px] border border-slate-200 bg-slate-50 p-6 text-slate-700 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Need help?</p>
              <p className="mt-2 text-sm leading-6">Reach out to our support team if you think this is an error.</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Try these instead</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                <li>• Browse the latest events</li>
                <li>• Check our contact page</li>
                <li>• Return home and search again</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
