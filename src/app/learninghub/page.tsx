"use client";

import { smartImages } from "@/app/lib/smartImages";

const modules = [
  {
    id: "0",
    topic: "Sleep & Recovery",
    summary: "How sleep impacts energy, recovery, and focus.",
    links: [
      {
        label: "Sleep Foundation Guide",
        url: "https://www.sleepfoundation.org/sleep-hygiene",
      },
      {
        label: "CDC Sleep Basics",
        url: "https://www.cdc.gov/sleep/about_sleep/index.html",
      },
    ],
  },
  {
    id: "1",
    topic: "Movement & Activity",
    summary: "How daily movement builds long-term health.",
    links: [
      {
        label: "CDC Physical Activity Guide",
        url: "https://www.cdc.gov/physicalactivity/basics/index.htm",
      },
      {
        label: "WHO Activity Guidelines",
        url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
      },
    ],
  },
  {
    id: "2",
    topic: "Awareness",
    summary: "How attention and mindfulness shape behavior.",
    links: [
      {
        label: "Mindfulness Guide",
        url: "https://www.mindful.org/meditation/mindfulness-getting-started/",
      },
      {
        label: "APA Mindfulness",
        url: "https://www.apa.org/topics/mindfulness",
      },
    ],
  },
  {
    id: "3",
    topic: "Routine",
    summary: "How structure builds discipline and consistency.",
    links: [
      {
        label: "Daily Routines",
        url: "https://jamesclear.com/daily-routines",
      },
      {
        label: "Atomic Habits",
        url: "https://jamesclear.com/habits",
      },
    ],
  },
  {
    id: "4",
    topic: "Tracking",
    summary: "How feedback loops improve progress.",
    links: [
      {
        label: "Habit Tracker Guide",
        url: "https://jamesclear.com/habit-tracker",
      },
      {
        label: "Atomic Habits System",
        url: "https://jamesclear.com/atomic-habits",
      },
    ],
  },

  // =========================
  // NEW CARDS (6 ADDED)
  // =========================

  {
    id: "5",
    topic: "Nutrition Basics",
    summary: "Understanding food quality, macros, and energy balance.",
    links: [
      {
        label: "Healthy Eating Guide (WHO)",
        url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
      },
      {
        label: "Nutrition Basics (Harvard)",
        url: "https://www.hsph.harvard.edu/nutritionsource/",
      },
    ],
  },
  {
    id: "6",
    topic: "Hydration",
    summary: "How water intake affects energy, focus, and performance.",
    links: [
      {
        label: "Water Intake Guide",
        url: "https://www.cdc.gov/nutrition/data-statistics/plain-water-the-healthier-choice.html",
      },
      {
        label: "Hydration Science",
        url: "https://www.healthline.com/nutrition/how-much-water-should-you-drink-per-day",
      },
    ],
  },
  {
    id: "7",
    topic: "Stress Management",
    summary: "Techniques to reduce stress and improve mental clarity.",
    links: [
      {
        label: "Stress Management Tips",
        url: "https://www.apa.org/topics/stress",
      },
      {
        label: "Coping Strategies",
        url: "https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-management/art-20044261",
      },
    ],
  },
  {
    id: "8",
    topic: "Focus & Productivity",
    summary: "How to eliminate distractions and improve deep work.",
    links: [
      {
        label: "Deep Work Concepts",
        url: "https://www.calnewport.com/books/deep-work/",
      },
      {
        label: "Productivity Science",
        url: "https://todoist.com/productivity-methods",
      },
    ],
  },
  {
    id: "9",
    topic: "Goal Setting",
    summary: "How to set clear, measurable, achievable goals.",
    links: [
      {
        label: "SMART Goals Guide",
        url: "https://www.mindtools.com/a4wo118/smart-goals",
      },
      {
        label: "Goal Setting Psychology",
        url: "https://positivepsychology.com/goal-setting/",
      },
    ],
  },
  {
    id: "10",
    topic: "Mental Resilience",
    summary: "Building discipline, consistency, and mental toughness.",
    links: [
      {
        label: "Resilience Training",
        url: "https://www.apa.org/topics/resilience",
      },
      {
        label: "Mental Toughness Guide",
        url: "https://www.verywellmind.com/what-is-mental-toughness-2795023",
      },
    ],
  },
];

// 🎨 COLOR SYSTEM
const colorMap = [
  "purple",
  "blue",
  "green",
  "orange",
  "teal",
  "purple",
  "blue",
  "green",
  "orange",
  "teal",
  "purple",
];

const buttonStyles: Record<string, string> = {
  purple: "border-purple-300 text-purple-600 hover:bg-purple-50",
  blue: "border-blue-300 text-blue-600 hover:bg-blue-50",
  green: "border-green-300 text-green-600 hover:bg-green-50",
  orange: "border-orange-300 text-orange-600 hover:bg-orange-50",
  teal: "border-teal-300 text-teal-600 hover:bg-teal-50",
};

export default function LearningHubPage() {
  return (
    <main className="space-y-10 p-4 sm:p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">

      {/* HEADER */}
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold">
          SMART Learning Hub
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Learn concepts before applying them
        </p>
      </header>

      {/* GRID */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch">

          {modules.map((m, i) => {
            const color = colorMap[i];

            return (
              <div
                key={m.id}
                className="bg-white rounded-2xl shadow overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform"
              >

                {/* IMAGE */}
                <div className="h-36 w-full">
                  <img
                    src={smartImages[m.id]}
                    alt={m.topic}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col text-center flex-1">

                  <h3 className="font-semibold text-sm">
                    {m.topic}
                  </h3>

                  <div
                    className={`w-10 h-1 rounded mt-1 mx-auto ${
                      color === "purple"
                        ? "bg-purple-400"
                        : color === "blue"
                        ? "bg-blue-400"
                        : color === "green"
                        ? "bg-green-500"
                        : color === "orange"
                        ? "bg-orange-400"
                        : "bg-teal-400"
                    }`}
                  />

                  <p className="text-sm text-gray-500 mt-3 flex-1">
                    {m.summary}
                  </p>

                  {/* BUTTONS */}
                  {m.links.length > 0 && (
                    <div className="mt-auto pt-4 space-y-2">

                      {m.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`
                            inline-flex items-center justify-center
                            w-full px-4 py-2 rounded-lg
                            text-sm font-medium border bg-white
                            shadow-sm hover:shadow-md
                            active:scale-95 transition
                            ${buttonStyles[color]}
                          `}
                        >
                          {l.label} →
                        </a>
                      ))}

                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>
      </section>

    </main>
  );
}