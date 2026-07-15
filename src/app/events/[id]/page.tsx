import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { EventCard } from "@/components/ui/event-card";
import { getEventById, listEvents } from "@/lib/events";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) {
    notFound();
  }

  const listResult = await listEvents({ page: 1, perPage: 3 });
  const relatedEvents = (listResult?.events ?? []).filter((item) => item.id !== event.id);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
          <ArrowLeft className="h-4 w-4" />
          Back to events
        </Link>
        <div className="mt-8 overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
          <img src={event.coverImage} alt={event.title} className="h-72 w-full object-cover lg:h-96" />
          <div className="grid gap-8 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">{event.category}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">{event.title}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{event.description}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500"><CalendarDays className="h-4 w-4 text-blue-600" /> Date</div>
                  <div className="mt-2 font-semibold text-slate-900">{event.date}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500"><MapPin className="h-4 w-4 text-blue-600" /> Location</div>
                  <div className="mt-2 font-semibold text-slate-900">{event.location}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500"><Ticket className="h-4 w-4 text-blue-600" /> Price</div>
                  <div className="mt-2 font-semibold text-slate-900">${event.ticketPrice}</div>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {event.gallery.map((image) => (
                  <img key={image} src={image} alt={`${event.title} gallery`} className="h-40 w-full rounded-2xl object-cover" />
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold text-white">{event.organizer[0]}</div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{event.organizer}</h2>
                  <p className="text-sm text-slate-500">Organizer</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl bg-white p-3">
                  <span>Time</span>
                  <span className="font-semibold text-slate-900">{event.time}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white p-3">
                  <span>Capacity</span>
                  <span className="font-semibold text-slate-900">{event.capacity}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white p-3">
                  <span>Seats left</span>
                  <span className="font-semibold text-slate-900">{Math.max(event.capacity - 40, 0)}</span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
                Reserve a spot
              </button>
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <Users className="h-4 w-4 text-blue-600" />
                Designed for professionals, founders, and curious communities
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-950">Related events</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedEvents.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
