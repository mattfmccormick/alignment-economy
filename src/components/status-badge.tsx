const styles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_review: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  active: "bg-green-100 text-green-800",
  revoked: "bg-red-100 text-red-800",
  open: "bg-yellow-100 text-yellow-800",
  ruling: "bg-purple-100 text-purple-800",
  resolved: "bg-gray-100 text-gray-600",
  appealed: "bg-orange-100 text-orange-800",
  sent: "bg-red-50 text-red-700",
  received: "bg-green-50 text-green-700",
  low: "bg-gray-100 text-gray-600",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export function StatusBadge({ status }: { status: string }) {
  const label = status.replace(/_/g, " ");
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] || "bg-gray-100 text-gray-600"}`}
    >
      {label}
    </span>
  );
}
