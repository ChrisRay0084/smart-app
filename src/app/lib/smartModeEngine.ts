// lib/smartModeEngine.ts

export type SmartLetter = "S" | "M" | "A" | "R" | "T";
export type SmartMode = "learn" | "confirm";
export type DailySmartMode = Record<SmartLetter, SmartMode>;

const STORAGE_KEY = "bodyforge_smart_daily_mode";
const DATE_KEY = "bodyforge_smart_date";

// -----------------------------
// Stable seeded random generator
// -----------------------------
function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// -----------------------------
// Create deterministic daily seed (stable per day)
// -----------------------------
function getDailySeed(): number {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return Number(today.replaceAll("-", ""));
}

// -----------------------------
// Generate a fresh mode map
// -----------------------------
export function generateDailySmartMode(seed: number = getDailySeed()): DailySmartMode {
  const letters: SmartLetter[] = ["S", "M", "A", "R", "T"];

  const result = {} as DailySmartMode;

  letters.forEach((letter, index) => {
    const value = seededRandom(seed + index * 999);
    result[letter] = value > 0.5 ? "confirm" : "learn";
  });

  return result;
}

// -----------------------------
// MAIN ENTRY (CLIENT SAFE)
// -----------------------------
export function getOrCreateDailySmartMode(): DailySmartMode {
  if (typeof window === "undefined") {
    // SSR fallback (prevents hydration crashes)
    return generateDailySmartMode();
  }

  const todayKey = new Date().toISOString().split("T")[0];

  try {
    const savedDate = localStorage.getItem(DATE_KEY);
    const savedMode = localStorage.getItem(STORAGE_KEY);

    // reuse today's saved mode
    if (savedDate === todayKey && savedMode) {
      return JSON.parse(savedMode) as DailySmartMode;
    }

    // generate new day mode
    const newMode = generateDailySmartMode();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMode));
    localStorage.setItem(DATE_KEY, todayKey);

    return newMode;
  } catch (err) {
    // fallback safety (corrupted storage)
    const fallback = generateDailySmartMode();
    return fallback;
  }
}