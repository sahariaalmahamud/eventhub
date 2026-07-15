"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { addContactMessage } from "@/lib/firebase";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setSuccess("Thanks! Your message has been received.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Unable to send your message right now. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Contact</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Let’s build something extraordinary together.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">Need help launching an event or want to discuss the platform experience? Reach out and we will be happy to help.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input value={form.name} onChange={(event) => setForm((value) => ({ ...value, name: event.target.value }))} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Name" />
            <input type="email" value={form.email} onChange={(event) => setForm((value) => ({ ...value, email: event.target.value }))} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Email" />
            <textarea value={form.message} onChange={(event) => setForm((value) => ({ ...value, message: event.target.value }))} className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Message" />
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
            {success ? <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"><CheckCircle2 className="h-4 w-4" />{success}</div> : null}
            <button disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
