import { PageShell } from "@/components/ui/page-shell";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">About EventHub</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">Designed for modern communities and ambitious organizers.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">EventHub brings together beautiful discovery, simple publishing, and dependable management tools in one professional platform for events of every size.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { title: "Discover", text: "Explore immersive events with focused search and refined filters." },
            { title: "Create", text: "Publish polished event pages and manage your audience experience." },
            { title: "Grow", text: "Measure your impact with dashboards and community insights." },
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
