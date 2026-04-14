import Link from "next/link";
import { AppSidebar, MobileHeader } from "@/components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        {/* Demo banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">DEMO</span>
            <span className="text-amber-800">You&apos;re viewing a demo with simulated data. No real points are being created.</span>
          </div>
          <Link href="/demo" className="text-amber-700 hover:text-amber-900 font-medium whitespace-nowrap ml-4">
            &larr; Back to Demo Hub
          </Link>
        </div>
        <MobileHeader />
        <main className="flex-1 p-4 md:p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
