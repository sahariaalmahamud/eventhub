import { FAQAccordion, FAQItem } from "@/components/ui/faq-accordion";

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "How do I register for an event?",
    answer:
      "Registration is simple! Browse events on EventHub, click on the one you're interested in, and follow the registration form. You can pay securely and receive a confirmation email with all event details.",
  },
  {
    id: "2",
    question: "Can I host an event on EventHub?",
    answer:
      "Absolutely! Sign up for an organizer account, create your event with our intuitive event builder, set your ticket prices, and manage registrations from your dashboard. We've made hosting events straightforward and powerful.",
  },
  {
    id: "3",
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking before the event starts. Visit your dashboard, select the event, and click the cancel option. Refunds are processed according to our refund policy.",
  },
  {
    id: "4",
    question: "Are tickets refundable?",
    answer:
      "Refund eligibility depends on the event's refund policy set by the organizer. Most events offer refunds if you cancel before a specified deadline. Check the event details page for the organizer's specific refund policy.",
  },
  {
    id: "5",
    question: "Is EventHub free to use?",
    answer:
      "Attending events is completely free! We only charge a small platform fee when organizers sell tickets. Organizers can also host free events at no cost.",
  },
  {
    id: "6",
    question: "How do I contact event organizers?",
    answer:
      "Most event organizers provide contact information on their event page. You can also reach out through our in-app messaging system if you have questions about an event after registration.",
  },
];

export function FAQSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">FAQ</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-slate-950">Frequently asked questions</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Find answers to common questions about EventHub. Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="mx-auto max-w-3xl">
        <FAQAccordion items={faqItems} />
      </div>
    </section>
  );
}
