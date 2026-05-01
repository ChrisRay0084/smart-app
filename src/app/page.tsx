"use client";

import { useEffect, useState } from "react";
import LearnEngine from "@/components/LearnEngine";
import { storage } from "./lib/storage";
import { getOrCreateDailySmartMode } from "@/app/lib/smartModeEngine";

export default function Home() {
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const [learnTopic, setLearnTopic] = useState<string | null>(null);

  useEffect(() => {
    const lastDate = storage.get<string | null>("smart-last-date", null);
    const today = new Date().toISOString().split("T")[0];

    if (lastDate !== today) {
      storage.set("smart-last-date", today);
      storage.set("smart-confirmed", {});
      setConfirmed({});
    } else {
      setConfirmed(storage.get("smart-confirmed", {}));
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    storage.set("smart-confirmed", confirmed);
  }, [confirmed, isHydrated]);

  const handleLearn = (id: string) => setLearnTopic(id);
  const closeLearn = () => setLearnTopic(null);

  const handleComplete = (id: string) => {
    setConfirmed((prev) => ({ ...prev, [id]: true }));
  };

  const modeMap = getOrCreateDailySmartMode();

  const letters = ["S", "M", "A", "R", "T"] as const;

  const dailyItems = letters.map((letter) => ({
    id: letter,
    letter,
    mode: modeMap[letter],
    title:
      letter === "S"
        ? "Sleep & Recovery"
        : letter === "M"
        ? "Movement & Tracking"
        : letter === "A"
        ? "Awareness"
        : letter === "R"
        ? "Routine"
        : "Tracking",
  }));

  const colorStyles: Record<string, string> = {
    purple: "border-purple-300 text-purple-600 hover:bg-purple-50",
    blue: "border-blue-300 text-blue-600 hover:bg-blue-50",
    green: "border-green-300 text-green-600 hover:bg-green-50",
    orange: "border-orange-300 text-orange-600 hover:bg-orange-50",
    teal: "border-teal-300 text-teal-600 hover:bg-teal-50",
  };

  const startButtonStyles: Record<string, string> = {
  purple: "bg-purple-500 hover:bg-purple-600 text-white",
  blue: "bg-blue-500 hover:bg-blue-600 text-white",
  green: "bg-green-600 hover:bg-green-700 text-white",
  orange: "bg-orange-500 hover:bg-orange-600 text-white",
  teal: "bg-teal-500 hover:bg-teal-600 text-white",
};

  if (!isHydrated) {
    return <div className="p-8 text-gray-500">Loading...</div>;
  }

  return (
    <main className="space-y-10 p-4 sm:p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">

      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            
            <img
              src="/images/smart_logo.png"
              alt="SMART logo"
              className="w-40 h-10"
            />
            <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm mt-1 font-semibold">Daily health + learning system</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center">
          <div className="px-3 py-1 rounded-lg bg-white shadow text-xs sm:text-sm">
            April 28, 2026
          </div>
          <div className="px-3 py-1 rounded-lg bg-orange-100 text-orange-600 text-xs sm:text-sm">
            🔥 4 Day Streak
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-300">
            <img
              src="/images/profile_pic.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* SMART CARDS */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          {dailyItems.map((item) => {
            const isDone = confirmed[item.id];

            return (
              <article key={item.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">

                <div className="flex justify-end">
                  <span className={`text-[14px] px-2 py-1 rounded-full ${isDone ? "bg-green-100 text-green-700" : "bg-gray-200"}`}>
                    {isDone ? "COMPLETE" : "PENDING"}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-white text-xl font-bold
                  ${item.id === "S" ? "bg-purple-500" : item.id === "M" ? "bg-blue-500" : item.id === "A" ? "bg-green-600" : item.id === "R" ? "bg-orange-500" : "bg-teal-400"}`}>
                    {item.letter}
                  </div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                </div>

                <div className="flex justify-center text-2xl mt-4">
                  {item.id === "S" ? (
                    <img src="/images/sleep_icon.png" alt="Sleep" className="w-20 h-20" />
                  ) : item.id === "M" ? (
                    <img src="/images/movement_icon.png" alt="Movement" className="w-20 h-20" />
                  ) : item.id === "A" ? (
                    <img src="/images/awareness_icon.png" alt="Awareness" className="w-20 h-20" />
                  ) : item.id === "R" ? (
                    <img src="/images/routine_icon.png" alt="Routine" className="w-20 h-20" />
                  ) : (
                    <img src="/images/tracking_icon.png" alt="Tracking" className="w-20 h-20" />
                  )}
                </div>

                <p className="text-sm text-gray-600 text-center mt-3">
                  {item.mode === "learn" ? "Learn + test understanding" : "Complete today’s action"}
                </p>

                <button
                  onClick={() => handleLearn(item.id)}
                  className={`
                    mt-4 inline-flex items-center justify-center
                    px-4 py-2 rounded-lg text-md font-bold text-white
                    transition-all duration-200
                    shadow-sm hover:shadow-md
                    active:scale-95

                    ${item.id === "S" ? startButtonStyles.purple : ""}
                    ${item.id === "M" ? startButtonStyles.blue : ""}
                    ${item.id === "A" ? startButtonStyles.green : ""}
                    ${item.id === "R" ? startButtonStyles.orange : ""}
                    ${item.id === "T" ? startButtonStyles.teal : ""}
                  `}
                >
                  {isDone ? "Complete" : "Start"}
                </button>

              </article>
            );
          })}

        </div>
      </section>

      {/* INSIGHTS */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          {[
            {
              title: "Sleep Resource",
              color: "purple",
              icon: <img src="/images/sleep_icon.png" alt="Sleep" className="w-10 h-7" />,
              img: "/images/sleep.jpg",
              text: "Better sleep improves recovery, focus, and energy.",
              link: "https://www.sleepfoundation.org/sleep-hygiene"
            },
            {
              title: "Movement Resource",
              color: "blue",
              icon: <img src="/images/movement_icon.png" alt="Movement" className="w-10 h-7" />,
              img: "/images/movement.jpg",
              text: "Daily movement increases metabolism and consistency.",
              link: "https://www.cdc.gov/physicalactivity/basics/index.htm"
            },
            {
              title: "Awareness Resource",
              color: "green",
              icon: <img src="/images/awareness_icon.png" alt="Awareness" className="w-10 h-7" />,
              img: "/images/awareness.jpg",
              text: "Tracking improves decision-making and discipline.",
              link: "https://positivepsychology.com/building-self-awareness-activities/"
            },
            {
              title: "Routine Resource",
              color: "orange",
              icon: <img src="/images/routine_icon.png" alt="Routine" className="w-10 h-7" />,
              img: "/images/routine.jpg",
              text: "Consistent routines reduce decision fatigue.",
              link: "https://jamesclear.com/habits"
            },
            {
              title: "Tracking Resource",
              color: "teal",
              icon: <img src="/images/tracking_icon.png" alt="Tracking" className="w-10 h-7" />,
              img: "/images/tracking.jpg",
              text: "Tracking builds awareness loops.",
              link: "https://plantoorganize.com/habit-tracking/?v=aee816c341a8"
            },
          ].map((card, i) => (

            <div key={i} className="bg-white rounded-2xl shadow overflow-hidden flex flex-col">

              <img src={card.img} className="w-full h-40 object-cover" />

              <div className="p-4 flex flex-col items-center text-center">

                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                  {card.icon}
                </div>

                <h3 className="font-semibold mt-2">{card.title}</h3>

                <div className={`w-10 h-1 rounded mt-1 ${
                  card.color === "purple" ? "bg-purple-400" :
                  card.color === "blue" ? "bg-blue-400" :
                  card.color === "green" ? "bg-green-500" :
                  card.color === "orange" ? "bg-orange-400" :
                  "bg-teal-400"
                }`} />

                <p className="text-sm text-gray-500 mt-3">{card.text}</p>

                {/* BUTTON STYLE LINK */}
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    mt-4 inline-flex items-center justify-center
                    px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    shadow-sm hover:shadow-md
                    active:scale-95
                    bg-white border
                    ${colorStyles[card.color]}
                  `}
                >
                  Learn more →
                </a>

              </div>

            </div>

          ))}

        </div>
      </section>

      {/* STATS */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {[
            {
              title: "Today’s Focus",
              highlight: "Complete SMART Module",
              sub: "Stay consistent with all 5 pillars",
              img: "/images/focus.jpg",
              color: "text-purple-500",
            },
            {
              title: "System Status",
              highlight: "Stable & Learning",
              sub: "System adapting to your behavior",
              img: "/images/system.jpg",
              color: "text-green-600",
            },
            {
              title: "Progress Trend",
              highlight: "+12% Weekly Growth",
              sub: "Momentum is increasing",
              img: "/images/progress.jpg",
              color: "text-blue-500",
            },
            {
              title: "Focus Level",
              highlight: "High",
              sub: "Minimal distractions detected",
              img: "/images/focuslevel.jpg",
              color: "text-orange-500",
            },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow overflow-hidden flex">

              <img src={stat.img} className="w-1/3 object-contain" />

              <div className="p-4 flex flex-col justify-center">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className={`font-semibold mt-1 ${stat.color}`}>
                  {stat.highlight}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {stat.sub}
                </p>
              </div>

            </div>
          ))}

        </div>
      </section>

      {learnTopic && (
        <LearnEngine
          topic={learnTopic}
          onClose={closeLearn}
          onComplete={handleComplete}
        />
      )}

    </main>
  );
}