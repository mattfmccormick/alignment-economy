"use client";

export function PointBar({
  label,
  current,
  max,
  color,
  sub,
}: {
  label: string;
  current: number;
  max: number;
  color: string;
  sub?: string;
}) {
  const pct = Math.min((current / max) * 100, 100);

  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-medium text-ae-navy">{label}</span>
        <span className="text-sm text-gray-500">
          {current.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
