import Link from "next/link";
import { AppSidebar, MobileHeader } from "@/components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        {/* Demo back-to-site bar */}
        <div className="bg-ae-navy text-white text-xs sm:text-sm px-4 md:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-1.5 h-1.5 bg-ae-teal rounded-full animate-pulse shrink-0" />
            <span className="text-gray-300 truncate">
              You&apos;re in the interactive demo. Data is simulated.
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-ae-gold hover:text-white transition-colors font-medium whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to the website
          </Link>
        </div>
        <MobileHeader />
        <main className="flex-1 p-4 md:p-8 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
