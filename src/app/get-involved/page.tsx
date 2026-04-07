"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SubpageNav, SubpageFooter } from "@/components/site-nav";

function GetInvolvedForm() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("type") || "build";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      type: formData.get("type"),
      message: formData.get("message"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert(result.error || "Something went wrong.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-xl mx-auto">
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 md:p-14 text-center shadow-sm">
                <svg className="w-16 h-16 text-ae-teal mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="font-heading text-2xl font-bold text-ae-navy mb-3">Thanks for reaching out!</h2>
                <p className="text-ae-slate leading-relaxed mb-6">
                  We've received your information and will be in touch soon.
                </p>
                <a href="/" className="text-ae-teal hover:text-ae-teal-light transition-colors font-medium">
                  ← Back to Home
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-ae-navy font-medium text-sm mb-1.5">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-ae-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-ae-navy font-medium text-sm mb-1.5">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-ae-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-ae-navy font-medium text-sm mb-1.5">How would you like to help?</label>
                    <select
                      id="type"
                      name="type"
                      defaultValue={preselect}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-ae-navy focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal bg-white"
                    >
                      <option value="build">I want to build (engineering, story tellers, economics)</option>
                      <option value="connect">I want to connect (introductions, collaborations)</option>
                      <option value="contribute">I want to contribute (donate, one-time or recurring)</option>
                      <option value="miner">I want to be a miner (run the blockchain &amp; proof of human)</option>
                      <option value="participant">I want to be a participant (tell me when you launch)</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-ae-navy font-medium text-sm mb-1.5">Message (optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-ae-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal resize-none"
                      placeholder="Tell us about yourself and how you'd like to help..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ae-teal text-white py-3 rounded-full font-medium hover:bg-ae-teal-light transition-colors disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </form>
                <p className="text-center text-ae-slate/50 text-xs mt-6">
                  Or email directly:{" "}
                  <a href="mailto:info@alignmenteconomy.org" className="text-ae-teal hover:text-ae-teal-light">
                    info@alignmenteconomy.org
                  </a>
                </p>
              </div>
            )}
          </div>
        </section>
  );
}

export default function GetInvolvedPage() {
  return (
    <>
      <SubpageNav />
      <main className="min-h-screen bg-ae-warm">
        {/* Hero */}
        <section className="py-16 md:py-24 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Get Involved</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you want to build, connect, or contribute in another way,
              we'd love to hear from you.
            </p>
          </div>
        </section>

        <Suspense fallback={<div className="py-16 text-center text-ae-slate">Loading...</div>}>
          <GetInvolvedForm />
        </Suspense>
      </main>
      <SubpageFooter />
    </>
  );
}
