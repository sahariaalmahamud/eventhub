import { PageShell } from "@/components/ui/page-shell";

export default function TermsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Terms & Conditions</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Please review these terms before using EventHub</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">By using EventHub, you agree to use the platform responsibly and only for lawful purposes related to event discovery and management.</p>
          <div className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
            <p>Users are responsible for the accuracy of the information they submit and for complying with relevant local regulations.</p>
            <p>EventHub reserves the right to remove content that violates platform policies or applicable law.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
