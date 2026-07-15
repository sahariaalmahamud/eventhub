import { TestimonialCard } from "@/components/ui/testimonial-card";

const testimonials = [
  {
    name: "Sarah Johnson",
    profession: "Event Organizer",
    review:
      "EventHub transformed how we manage our conferences. The platform is intuitive, and our attendees love the seamless registration experience. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Michael Chen",
    profession: "Founder, Tech Meetups",
    review:
      "The dashboard is a game-changer. We went from managing spreadsheets to having real-time insights into attendee engagement. EventHub made scaling our community effortless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Emily Rodriguez",
    profession: "Community Manager",
    review:
      "We've hosted 15+ events through EventHub, and each one has been better than the last. The support team is responsive, and the platform keeps improving. Worth every penny!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Testimonials</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-slate-950">Loved by organizers and attendees</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          See what event professionals are saying about EventHub and how it's transformed their community management.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            profession={testimonial.profession}
            review={testimonial.review}
            rating={testimonial.rating}
            avatar={testimonial.avatar}
          />
        ))}
      </div>
    </section>
  );
}
