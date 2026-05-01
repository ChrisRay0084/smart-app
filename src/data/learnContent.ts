export type LearnQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
};

export type LearnContent = {
  id: string;
  title: string;
  questions: LearnQuestion[];
};

export const learnContent: Record<string, LearnContent> = {
  sleep: {
    id: "sleep",
    title: "Sleep & Recovery",
    questions: [
      {
        question: "How many hours of sleep do most adults need?",
        options: ["45", "5–6", "7–9", "10–12"],
        answer: "7–9",
        explanation: "7–9 hours supports cognitive and physical recovery."
      },
      {
        question: "What improves sleep quality the most?",
        options: ["Irregular schedule", "Consistent sleep time", "Caffeine late night", "Long naps"],
        answer: "Consistent sleep time",
        explanation: "Consistency regulates circadian rhythm."
      },
      {
        question: "When is deep sleep most important?",
        options: ["Early night", "Morning", "Afternoon", "Random times"],
        answer: "Early night",
        explanation: "Deep sleep is concentrated in early cycles."
      },
      {
        question: "What harms sleep quality?",
        options: ["Blue light before bed", "Dark room", "Cool temperature", "Routine"],
        answer: "Blue light before bed"
      },
      {
        question: "Best pre-sleep habit?",
        options: ["Scrolling phone", "Reading", "Caffeine", "Heavy exercise"],
        answer: "Reading"
      },
      {
        question: "Ideal room temperature for sleep?",
        options: ["Hot", "Cool", "Very hot", "Random"],
        answer: "Cool"
      },
      {
        question: "What is sleep debt?",
        options: ["Too much sleep", "Missing sleep over time", "Dreaming", "Resting"],
        answer: "Missing sleep over time"
      },
      {
        question: "Does alcohol improve sleep?",
        options: ["Yes", "No", "Sometimes", "Always"],
        answer: "No"
      },
      {
        question: "What improves recovery?",
        options: ["Sleep consistency", "Energy drinks", "Late meals", "No rest"],
        answer: "Sleep consistency"
      },
      {
        question: "Best time to wake up?",
        options: ["Random", "Same daily time", "Late afternoon", "After 12 hours"],
        answer: "Same daily time"
      },
    ],
  },

  movement: {
    id: "movement",
    title: "Movement & Activity",
    questions: [
      {
        question: "How much weekly physical activity is recommended?",
        options: ["30 min total", "1 hour", "150 minutes", "500 minutes"],
        answer: "150 minutes",
        explanation: "Guidelines recommend ~150 minutes of moderate activity per week."
      },
      {
        question: "What is considered moderate exercise?",
        options: ["Walking fast", "Sleeping", "Sitting", "Eating"],
        answer: "Walking fast"
      },
      {
        question: "Best time to move your body?",
        options: ["Any consistent time", "Never", "Only weekends", "Random once a month"],
        answer: "Any consistent time"
      },
      {
        question: "What improves daily energy?",
        options: ["Light movement", "No movement", "Only caffeine", "Overresting"],
        answer: "Light movement"
      },
      {
        question: "What happens when you sit too long?",
        options: ["Stiffness increases", "Strength increases", "Fat loss accelerates", "Nothing"],
        answer: "Stiffness increases"
      },
      {
        question: "Best beginner movement habit?",
        options: ["Walking", "Sprinting daily", "No activity", "Random lifting"],
        answer: "Walking"
      },
      {
        question: "What improves consistency?",
        options: ["Small daily movement", "Extreme workouts only", "Inactivity", "Random effort"],
        answer: "Small daily movement"
      },
      {
        question: "Movement helps mental health by?",
        options: ["Reducing stress", "Increasing confusion", "Doing nothing", "Worsening mood"],
        answer: "Reducing stress"
      },
      {
        question: "Best way to avoid burnout?",
        options: ["Balanced movement", "Overtraining daily", "No rest ever", "Random effort"],
        answer: "Balanced movement"
      },
      {
        question: "Core benefit of movement?",
        options: ["Energy + health", "Fatigue only", "Weakness", "Stress increase"],
        answer: "Energy + health"
      }
    ]
  },

  awareness: {
    id: "awareness",
    title: "Mental Awareness",
    questions: [
      {
        question: "What is awareness?",
        options: ["Ignoring thoughts", "Observing thoughts", "Sleeping", "Overthinking"],
        answer: "Observing thoughts"
      },
      {
        question: "Best daily habit?",
        options: ["Journaling", "Avoid thinking", "Distraction", "None"],
        answer: "Journaling"
      },
      {
        question: "What reduces stress?",
        options: ["Breathing", "Multitasking", "Rush thinking", "Avoid breaks"],
        answer: "Breathing"
      },
      {
        question: "Mindfulness means?",
        options: ["Present awareness", "Future focus", "Avoiding reality", "Sleep"],
        answer: "Present awareness"
      },
      {
        question: "What increases mental clarity?",
        options: ["Journaling", "Overstimulation", "No sleep", "Chaos"],
        answer: "Journaling"
      },
      {
        question: "Best reflection time?",
        options: ["End of day", "Never", "Random stress", "Morning rush"],
        answer: "End of day"
      },
      {
        question: "What reduces anxiety?",
        options: ["Controlled breathing", "Avoiding rest", "Overthinking", "Noise"],
        answer: "Controlled breathing"
      },
      {
        question: "What builds awareness?",
        options: ["Observation", "Avoidance", "Distraction", "Ignoring feelings"],
        answer: "Observation"
      },
      {
        question: "Emotional awareness is?",
        options: ["Recognizing emotions", "Ignoring emotions", "Suppression", "Confusion"],
        answer: "Recognizing emotions"
      },
      {
        question: "Best mental reset?",
        options: ["Walk", "Scrolling", "Stress thinking", "Caffeine"],
        answer: "Walk"
      },
    ],
  },

  routine: {
    id: "routine",
    title: "Routine & Structure",
    questions: [
      {
        question: "What is a routine?",
        options: ["Random actions", "Consistent daily structure", "No schedule", "Chaos"],
        answer: "Consistent daily structure"
      },
      {
        question: "Why are routines powerful?",
        options: ["They reduce decision fatigue", "They increase confusion", "They waste time", "They do nothing"],
        answer: "They reduce decision fatigue"
      },
      {
        question: "Best morning habit?",
        options: ["Consistent wake-up time", "Random wake time", "Skipping morning", "No structure"],
        answer: "Consistent wake-up time"
      },
      {
        question: "What breaks routines?",
        options: ["Inconsistency", "Structure", "Planning", "Habits"],
        answer: "Inconsistency"
      },
      {
        question: "Why plan your day?",
        options: ["Clarity + focus", "Stress increase", "Confusion", "Less productivity"],
        answer: "Clarity + focus"
      },
      {
        question: "Best way to build routine?",
        options: ["Start small", "Go extreme", "Random effort", "No repetition"],
        answer: "Start small"
      },
      {
        question: "What improves discipline?",
        options: ["Repetition", "Chaos", "Random actions", "Avoidance"],
        answer: "Repetition"
      },
      {
        question: "Evening routine helps with?",
        options: ["Better sleep", "Less focus", "Stress increase", "Energy spikes"],
        answer: "Better sleep"
      },
      {
        question: "What kills consistency fastest?",
        options: ["No structure", "Small habits", "Tracking", "Planning"],
        answer: "No structure"
      },
      {
        question: "Best routine type?",
        options: ["Simple and repeatable", "Complex and changing", "No routine", "Random schedule"],
        answer: "Simple and repeatable"
      }
    ]
  },

  tracking: {
    id: "tracking",
    title: "Habit Tracking",
    questions: [
      {
        question: "Why track habits?",
        options: ["To forget", "To build awareness", "To stress", "To avoid goals"],
        answer: "To build awareness"
      },
      {
        question: "Best tracking method?",
        options: ["Consistency logs", "Random memory", "Guessing", "Avoiding"],
        answer: "Consistency logs"
      },
      {
        question: "What improves habits?",
        options: ["Tracking", "Ignoring", "Chaos", "No feedback"],
        answer: "Tracking"
      },
      {
        question: "What is habit stacking?",
        options: ["Linking habits", "Random habits", "No structure", "Avoidance"],
        answer: "Linking habits"
      },
      {
        question: "Best time to track?",
        options: ["End of day", "Never", "Random", "Morning stress"],
        answer: "End of day"
      },
      {
        question: "What builds discipline?",
        options: ["Tracking consistency", "Avoidance", "Breaks only", "Random effort"],
        answer: "Tracking consistency"
      },
      {
        question: "What is feedback loop?",
        options: ["Track → adjust → improve", "Ignore progress", "Random change", "No system"],
        answer: "Track → adjust → improve"
      },
      {
        question: "Why visual progress matters?",
        options: ["Motivation", "Confusion", "Stress", "No effect"],
        answer: "Motivation"
      },
      {
        question: "What kills consistency?",
        options: ["No tracking", "Daily logs", "Structure", "Routine"],
        answer: "No tracking"
      },
      {
        question: "Best habit system?",
        options: ["Simple + consistent", "Complex chaos", "No system", "Random effort"],
        answer: "Simple + consistent"
      },
    ],
  },
};