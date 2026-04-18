"use client";

import { useEffect, useState } from "react";

type VideoModalProps = {
  youtubeId: string;
  label?: string;
  title?: string;
  description?: string;
};

export function VideoModalTrigger({
  youtubeId,
  label = "Watch Video",
  title = "Video Overview",
  description = "A short video walkthrough of the Alignment Economy: the problem, the failed fix, and the path forward.",
}: VideoModalProps) {
  const [open, setOpen] = useState(false);

  // Close on ESC, lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">{title}</h3>
        <p className="text-ae-slate text-sm leading-relaxed mb-6">{description}</p>
        <button
          onClick={() => setOpen(true)}
          className="bg-red-500 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-red-600 transition-colors inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          {label}
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Close video"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
