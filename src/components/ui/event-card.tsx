import Link from "next/link";
import { CalendarDays, MapPin, Users, Ticket } from "lucide-react";
import type { EventItem } from "@/types/event";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-20px_rgba(37,99,235,0.25)]">
      <div className="relative h-48 overflow-hidden">
        {event.coverImage ? (
          <img src={event.coverImage} alt={event.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-500">
            No image
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
          {event.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="h-4 w-4" />
          {event.date} • {event.time}
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{event.shortDescription}</p>
        <div className="mt-5 space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-600" />{event.location}</div>
          <div className="flex items-center gap-2"><Users className="h-4 w-4 text-blue-600" />{event.capacity} seats</div>
          <div className="flex items-center gap-2"><Ticket className="h-4 w-4 text-blue-600" />${event.ticketPrice}</div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
          <span>By {event.organizer}</span>
          <Link href={`/events/${event.id}`} className="font-semibold text-blue-600 transition hover:text-blue-700">
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
