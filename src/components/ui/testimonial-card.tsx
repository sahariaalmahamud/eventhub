import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  profession: string;
  review: string;
  rating: number;
  avatar: string;
}

export function TestimonialCard({ name, profession, review, rating, avatar }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
      {/* Rating */}
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Review */}
      <p className="mt-4 text-sm leading-6 text-slate-700">{review}</p>

      {/* User Info */}
      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="font-semibold text-slate-900">{name}</div>
          <div className="text-xs text-slate-500">{profession}</div>
        </div>
      </div>
    </div>
  );
}
