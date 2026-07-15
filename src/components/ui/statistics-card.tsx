interface StatisticsCardProps {
  value: string;
  label: string;
}

export function StatisticsCard({ value, label }: StatisticsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-blue-300 hover:shadow-md">
      <div className="text-3xl font-bold text-blue-600 sm:text-4xl">{value}</div>
      <div className="mt-2 text-sm font-medium text-slate-600">{label}</div>
    </div>
  );
}
