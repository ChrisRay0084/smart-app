// /app/lib/smartProgress.ts

import { storage } from "./storage";

export type Letter = "S" | "M" | "A" | "R" | "T";

export type LetterProgress = {
  completed: number;
  correct: number;
};

export type SmartProgress = Record<Letter, LetterProgress>;

const KEY = "smart-progress";

const defaultProgress: SmartProgress = {
  S: { completed: 0, correct: 0 },
  M: { completed: 0, correct: 0 },
  A: { completed: 0, correct: 0 },
  R: { completed: 0, correct: 0 },
  T: { completed: 0, correct: 0 },
};

// -----------------------------
// GET
// -----------------------------
export function getProgress(): SmartProgress {
  return storage.get<SmartProgress>(KEY, defaultProgress);
}

// -----------------------------
// UPDATE
// -----------------------------
export function updateProgress(
  letter: Letter,
  isCorrect?: boolean
) {
  const data = getProgress();

  data[letter].completed += 1;

  if (isCorrect) {
    data[letter].correct += 1;
  }

  storage.set(KEY, data);

  return data;
}