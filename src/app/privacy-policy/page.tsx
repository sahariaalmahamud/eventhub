import { PageShell } from "@/components/ui/page-shell";

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Privacy Policy</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Your privacy matters to us</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">We collect only the information needed to provide event discovery, management, and support experiences. Your data is stored securely and never shared with third parties without your consent.</p>
          <div className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
            <p>We use your information to create and manage your account, power event listings, and communicate important service updates.</p>
            <p>You may contact us at any time to review or request the deletion of your personal information.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
