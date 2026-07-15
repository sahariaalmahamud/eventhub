"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PageShell } from "@/components/ui/page-shell";
import { createEvent } from "@/lib/events";
import { useAuth } from "@/contexts/AuthContext";

const categories = ["Conference", "Music", "Networking", "Wellness", "Tech", "Food"];

export default function AddEventPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: categories[0],
    date: "",
    time: "",
    location: "",
    organizer: user?.name ?? "",
    ticketPrice: "",
    capacity: "",
    coverImage: "",
    gallery: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!user) {
      setError("Please sign in before creating events.");
      return;
    }

    const payload = {
      title: form.title,
      shortDescription: form.shortDescription,
      description: form.description,
      category: form.category,
      date: form.date,
      time: form.time,
      location: form.location,
      organizer: form.organizer,
      ticketPrice: Number(form.ticketPrice),
      capacity: Number(form.capacity),
      coverImage: form.coverImage || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      gallery: form.gallery.split(",").map((item) => item.trim()).filter(Boolean),
      createdBy: user.uid,
    };

    createEvent(payload);
    router.push("/dashboard");
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Add event</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">Create a polished event page</h1>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">Share the story, venue, schedule, and pricing of your next experience in a few focused steps.</p>
          <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <input required value={form.title} onChange={(event) => setForm((value) => ({ ...value, title: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Event title" />
            <input required value={form.shortDescription} onChange={(event) => setForm((value) => ({ ...value, shortDescription: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Short description" />
            <textarea required value={form.description} onChange={(event) => setForm((value) => ({ ...value, description: event.target.value }))} className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3 outline-none md:col-span-2" placeholder="Full description" />
            <select value={form.category} onChange={(event) => setForm((value) => ({ ...value, category: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none">
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <input required type="date" value={form.date} onChange={(event) => setForm((value) => ({ ...value, date: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" />
            <input required type="time" value={form.time} onChange={(event) => setForm((value) => ({ ...value, time: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" />
            <input required value={form.location} onChange={(event) => setForm((value) => ({ ...value, location: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Location" />
            <input required value={form.organizer} onChange={(event) => setForm((value) => ({ ...value, organizer: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Organizer" />
            <input required type="number" value={form.ticketPrice} onChange={(event) => setForm((value) => ({ ...value, ticketPrice: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Ticket price" />
            <input required type="number" value={form.capacity} onChange={(event) => setForm((value) => ({ ...value, capacity: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Capacity" />
            <input value={form.coverImage} onChange={(event) => setForm((value) => ({ ...value, coverImage: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Cover image URL" />
            <input value={form.gallery} onChange={(event) => setForm((value) => ({ ...value, gallery: event.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none" placeholder="Gallery URLs (comma separated)" />
            {error ? <p className="md:col-span-2 text-sm text-red-500">{error}</p> : null}
            <button type="submit" className="md:col-span-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">Publish event</button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
