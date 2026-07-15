"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setOpenId(openId === item.id ? null : item.id)}
          className="w-full text-left"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{item.question}</h3>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                  openId === item.id ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </div>

            {/* Answer - Animated */}
            {openId === item.id && (
              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="text-sm leading-6 text-slate-600">{item.answer}</p>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
