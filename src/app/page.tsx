import Link from "next/link";
import { ArrowRight, CalendarDays, CircleCheckBig, Search, Sparkles, TrendingUp } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { EventCard } from "@/components/ui/event-card";
import { EventCardSkeleton } from "@/components/ui/event-card-skeleton";
import BannerSearch from "@/components/ui/banner-search";
import { EventStatisticsSection } from "@/components/sections/event-statistics-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { getFeaturedEvents } from "@/lib/events";

const categories = ["Conference", "Music", "Networking", "Wellness", "Tech", "Food"];

export default async function HomePage() {
  const featuredEvents = await getFeaturedEvents();

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            Discover standout events in one place
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Host, discover, and manage unforgettable events with EventHub.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            From intimate meetups to large-scale conferences, EventHub gives organizers and attendees a polished experience from discovery to registration.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/explore" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500">
              Explore events <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/register" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600">
              Create account
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Events launched", value: "2.4k+" },
              { label: "Active hosts", value: "850+" },
              { label: "Attendee satisfaction", value: "98%" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="text-2xl font-semibold text-slate-900">{item.value}</div>
                <div className="mt-1 text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_40px_100px_-30px_rgba(2,6,23,0.6)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Find your next experience</p>
              <h2 className="mt-2 text-2xl font-semibold">Search curated events</h2>
            </div>
            <div className="rounded-full bg-white/10 p-3"><Search className="h-5 w-5" /></div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <label className="text-sm text-slate-300">What are you looking for?</label>
            <BannerSearch />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-300"><CalendarDays className="h-4 w-4" /> Upcoming this month</div>
              <div className="mt-2 text-2xl font-semibold">56</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-300"><TrendingUp className="h-4 w-4" /> Average growth</div>
              <div className="mt-2 text-2xl font-semibold">+24%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Featured events</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Upcoming experiences to book</h2>
          </div>
          <Link href="/explore" className="text-sm font-semibold text-blue-600">Browse all</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredEvents.length > 0 ? featuredEvents.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          )) : (
            Array.from({ length: 3 }).map((_, index) => <EventCardSkeleton key={index} />)
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[32px] border border-slate-200 bg-white/80 p-8 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Categories</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">Tailored for every kind of community</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Explore live experiences by category and discover the right audience for your next event.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <div key={category} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-blue-600"><CircleCheckBig className="h-4 w-4" />{category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_40px_100px_-25px_rgba(2,6,23,0.5)]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Why EventHub</p>
            <h2 className="mt-2 text-3xl font-semibold">A refined platform for modern organizers.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">Beautiful browsing, simple publishing, and reliable management tools built for ambitious teams.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: "Smooth discovery", text: "Search, filter, and browse curated experiences in seconds." },
              { title: "Professional workflow", text: "Create and manage events with a clean, focused dashboard." },
              { title: "Built for growth", text: "Scale your community without sacrificing a polished attendee experience." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EventStatisticsSection />

      <TestimonialsSection />

      <FAQSection />
    </PageShell>
  );
}
