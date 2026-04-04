"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const evidenceTypes = [
  { id: "face_scan", label: "Face Scan", icon: "👤", description: "3D facial recognition", pctValue: 15 },
  { id: "fingerprint", label: "Fingerprint", icon: "🔏", description: "Biometric fingerprint", pctValue: 15 },
  { id: "government_id", label: "Government ID", icon: "🪪", description: "Passport, national ID, or driver's license", pctValue: 20 },
  { id: "photo", label: "Live Photo", icon: "📷", description: "Photo with randomized prompt", pctValue: 10 },
  { id: "voice", label: "Voice Print", icon: "🎙️", description: "Voice biometric recording", pctValue: 10 },
];

export function HumanScore({
  score,
  interactive = false,
}: {
  score: number;
  interactive?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showVouchPicker, setShowVouchPicker] = useState(false);
  const router = useRouter();
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Mock: which evidence has been submitted
  const submitted = ["face_scan", "government_id"];

  // Mock people who could vouch for you
  const potentialVouchers = [
    { handle: "@sarah_c", name: "Sarah Chen", score: 95 },
    { handle: "@james_r", name: "James Rivera", score: 91 },
    { handle: "@maria_g", name: "Maria Gonzalez", score: 88 },
    { handle: "@tom_b", name: "Tom Brennan", score: 82 },
    { handle: "@priya_s", name: "Priya Sharma", score: 79 },
  ];

  return (
    <div>
      <button
        onClick={() => interactive && setExpanded(!expanded)}
        className={`flex items-center gap-4 ${interactive ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
      >
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="8" />
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#2b6a6a" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-ae-navy">{score}%</span>
          </div>
        </div>
        <div>
          <p className="font-semibold text-ae-navy">Human Score</p>
          <p className="text-sm text-gray-500">
            {interactive ? "Tap to increase your score" : "Verified identity"}
          </p>
        </div>
      </button>

      {interactive && expanded && (
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-ae-navy text-sm">Upload Evidence</h3>
          <p className="text-xs text-gray-500">Each type of evidence adds to your score. Tag what you're submitting.</p>

          <div className="space-y-2">
            {evidenceTypes.map((ev) => {
              const done = submitted.includes(ev.id);
              return (
                <div key={ev.id} className={`flex items-center justify-between p-4 rounded-xl ${done ? "bg-green-50" : "bg-gray-50"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${done ? "bg-green-100" : "bg-gray-100"}`}>
                      {done ? (
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <span>{ev.icon}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ae-navy">{ev.label}</p>
                      <p className="text-xs text-gray-400">{ev.description}</p>
                    </div>
                  </div>
                  {done ? (
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+{ev.pctValue}% done</span>
                  ) : (
                    <button className="text-xs font-medium text-ae-teal bg-ae-teal/10 px-3 py-1.5 rounded-full hover:bg-ae-teal/20 transition-colors">
                      Upload
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vouching section */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-ae-navy text-sm">Social Vouching</h3>
                <p className="text-xs text-gray-400">2 of 10 vouches received (+30% possible)</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowVouchPicker(!showVouchPicker); }}
                className="text-xs font-medium text-ae-teal bg-ae-teal/10 px-3 py-1.5 rounded-full hover:bg-ae-teal/20 transition-colors"
              >
                {showVouchPicker ? "Close" : "Request Vouches"}
              </button>
            </div>

            {showVouchPicker && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 mb-2">Select people to ask for a vouch:</p>
                {potentialVouchers.map((person) => (
                  <div key={person.handle} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-ae-teal/10 flex items-center justify-center text-xs font-bold text-ae-teal">
                        {person.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ae-navy">{person.name}</p>
                        <p className="text-xs text-gray-400">{person.handle} · {person.score}% human</p>
                      </div>
                    </div>
                    <button className="text-xs bg-ae-teal text-white px-3 py-1.5 rounded-lg hover:bg-ae-teal-light transition-colors">
                      Request
                    </button>
                  </div>
                ))}
                <button
                  onClick={(e) => { e.stopPropagation(); router.push("/dashboard/vouching"); }}
                  className="text-xs text-ae-teal hover:underline mt-2"
                >
                  Go to Vouching page for more options
                </button>
              </div>
            )}
          </div>

          <div className="bg-ae-warm rounded-xl p-4">
            <p className="text-xs text-ae-slate leading-relaxed">
              Your Human Score determines your daily point allocation.
              At {score}%, you receive {Math.round(1440 * score / 100)} of 1,440 Active points per day.
              Daily airdrop happens at 4:00 AM ET. Rebase runs right before.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
