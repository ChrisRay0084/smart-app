"use client";

import { useEffect, useState } from "react";
import { storage } from "@/app/lib/storage";

type Letter = "S" | "M" | "A" | "R" | "T";

type LetterProgress = {
  completed: number;
  correct: number;
};

type SmartProgress = Record<Letter, LetterProgress>;

const KEY = "smart-progress";

const letters: Letter[] = ["S", "M", "A", "R", "T"];

const labels: Record<Letter, string> = {
  S: "Sleep & Recovery",
  M: "Movement",
  A: "Awareness",
  R: "Routine",
  T: "Tracking",
};

// 🎨 MATCH MAIN DASHBOARD COLORS
const colorMap: Record<Letter, string> = {
  S: "bg-purple-500",
  M: "bg-blue-500",
  A: "bg-green-600",
  R: "bg-orange-500",
  T: "bg-teal-500",
};

export default function ProgressPage() {
  const [data, setData] = useState<SmartProgress | null>(null);

  useEffect(() => {
    const stored = storage.get<SmartProgress | null>(KEY, null);

    if (!stored) {
      const empty: SmartProgress = {
        S: { completed: 0, correct: 0 },
        M: { completed: 0, correct: 0 },
        A: { completed: 0, correct: 0 },
        R: { completed: 0, correct: 0 },
        T: { completed: 0, correct: 0 },
      };

      setData(empty);
      return;
    }

    setData(stored);
  }, []);

  if (!data) {
    return <div className="p-8 text-gray-500">Loading progress...</div>;
  }

  // -----------------------------
  // CALCULATIONS
  // -----------------------------
  const totalCompleted = letters.reduce(
    (sum, l) => sum + data[l].completed,
    0
  );

  const totalCorrect = letters.reduce(
    (sum, l) => sum + data[l].correct,
    0
  );

  const overallAccuracy =
    totalCompleted === 0
      ? 0
      : Math.round((totalCorrect / totalCompleted) * 100);

  return (
    <main className="space-y-10 p-4 sm:p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">

      {/* HEADER (MATCHED) */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold">Progress Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">
          Your SMART system performance overview
        </p>
      </header>

      {/* OVERALL STATS (MATCH STYLE) */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-sm text-gray-500">Total Completed</p>
            <h3 className="text-2xl font-bold mt-1">{totalCompleted}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-sm text-gray-500">Correct Answers</p>
            <h3 className="text-2xl font-bold mt-1">{totalCorrect}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-sm text-gray-500">Accuracy</p>
            <h3 className="text-2xl font-bold mt-1">
              {overallAccuracy}%
            </h3>
          </div>

        </div>
      </section>

      {/* SMART BREAKDOWN (CARD SYSTEM LIKE HOME) */}
      <section>
        <h2 className="text-lg font-semibold mb-4">SMART Breakdown</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          {letters.map((letter) => {
            const p = data[letter];

            const accuracy =
              p.completed === 0
                ? 0
                : Math.round((p.correct / p.completed) * 100);

            return (
              <div
                key={letter}
                className="bg-white rounded-2xl shadow p-4 flex flex-col"
              >

                {/* TOP */}
                <div className="flex items-center gap-2">

                  <div className={`w-10 h-10 rounded-lg text-white flex items-center justify-center font-bold ${colorMap[letter]}`}>
                    {letter}
                  </div>

                  <h3 className="text-sm font-semibold">
                    {labels[letter]}
                  </h3>

                </div>

                {/* STATS */}
                <div className="mt-3 text-sm text-gray-600">
                  <p>Completed: {p.completed}</p>
                  <p>Correct: {p.correct}</p>
                </div>

                {/* PROGRESS */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Accuracy</span>
                    <span>{accuracy}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2 ${colorMap[letter]}`}
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* INSIGHT (MATCHED CARD STYLE) */}
      <section>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Insight</h2>

          <p className="text-sm text-gray-600">
            {overallAccuracy >= 80
              ? "🔥 Strong consistency. You're performing at a high level."
              : overallAccuracy >= 50
              ? "⚡ You're building momentum. Focus on consistency."
              : "🧠 Early stage. Small wins will build your system."}
          </p>
        </div>
      </section>

    </main>
  );
}