"use client";

import { useEffect, useRef, useState } from "react";
import { smartMap } from "@/app/lib/smartMap";
import { learnContent } from "@/data/learnContent";
import { smartOptions } from "@/data/smartOptions";
import { getOrCreateDailySmartMode } from "@/app/lib/smartModeEngine";
import { updateProgress } from "@/app/lib/smartProgress";

type Props = {
  topic: string | null;
  onClose: () => void;
  onComplete?: (id: string) => void;
};

type SmartLetter = "S" | "M" | "A" | "R" | "T";

export default function LearnEngine({ topic, onClose, onComplete }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState<any[]>([]);
  const [results, setResults] = useState<boolean[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  if (!topic) return null;

  const currentLetter = topic as SmartLetter;
  const modeMap = getOrCreateDailySmartMode();
  const mode = modeMap[currentLetter];
  const categoryKey = smartMap[currentLetter];

  const learnSet = learnContent[categoryKey]?.questions ?? [];

  // ---------------- SESSION ----------------
  useEffect(() => {
    if (mode !== "learn") return;

    const shuffled = [...learnSet].sort(() => Math.random() - 0.5);
    const sessionLength = Math.floor(Math.random() * 4) + 2;

    setSessionQuestions(shuffled.slice(0, sessionLength));
    setQuestionIndex(0);
    setResults([]);
  }, [currentLetter]);

  const question = sessionQuestions[questionIndex];

  const confirmAction =
    mode === "confirm"
      ? smartOptions[currentLetter].confirm[
          Math.floor(Math.random() * smartOptions[currentLetter].confirm.length)
        ]
      : null;

  // ---------------- ANSWER ----------------
  const handleAnswer = (option: string, answer: string) => {
    const isCorrect = option === answer;
    setSelected(option);
    setShowFeedback(true);
    setResults((prev) => [...prev, isCorrect]);
  };

  // ---------------- NEXT ----------------
  const handleNextLearn = () => {
    setSelected(null);
    setShowFeedback(false);

    const next = questionIndex + 1;

    if (next < sessionQuestions.length) {
      setQuestionIndex(next);
    } else {
      handleFinish();
    }
  };

  // ---------------- FINISH ----------------
  const handleFinish = () => {
    if (mode === "learn") {
      const correctCount = results.filter(Boolean).length;
      const total = results.length;
      updateProgress(currentLetter, correctCount === total);
    }

    if (mode === "confirm") {
      updateProgress(currentLetter, true);
    }

    onComplete?.(currentLetter);
    onClose();
    previousFocusRef.current?.focus();
  };

  useEffect(() => {
    if (topic && modalRef.current) modalRef.current.focus();
  }, [topic]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  const progress =
    sessionQuestions.length > 0
      ? ((questionIndex + (showFeedback ? 1 : 0)) /
          sessionQuestions.length) *
        100
      : 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-300 p-5 text-white">
          <h2 className="text-lg font-bold">
            SMART - {currentLetter} ({mode.toUpperCase()})
          </h2>

          <p className="text-md opacity-80 font-light">
            {mode === "learn"
              ? `Question ${questionIndex + 1} of ${sessionQuestions.length}`
              : "Single smart action"}
          </p>

          {/* PROGRESS BAR */}
          {mode === "learn" && (
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          {/* LEARN MODE */}
          {mode === "learn" && question && (
            <>
              <h3 className="text-lg font-semibold text-gray-800">
                {question.question}
              </h3>

              <div className="space-y-2">
                {question.options.map((opt: string) => {
                  const isCorrect = opt === question.answer;
                  const isSelected = opt === selected;

                  return (
                    <button
                      key={opt}
                      onClick={() =>
                        !showFeedback && handleAnswer(opt, question.answer)
                      }
                      disabled={showFeedback}
                      className={`w-full p-3 rounded-xl border text-left transition-all
                        ${
                          showFeedback
                            ? isCorrect
                              ? "bg-green-100 border-green-500"
                              : isSelected
                              ? "bg-red-100 border-red-500"
                              : "bg-gray-50"
                            : "hover:bg-gray-100 border-gray-200"
                        }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className="mt-4 p-4 rounded-xl border bg-gray-50">
                  <p className="font-semibold">
                    {selected === question.answer
                      ? "✅ Correct"
                      : "❌ Incorrect"}
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    {question.explanation}
                  </p>

                  <button
                    onClick={handleNextLearn}
                    className="mt-4 text-indigo-600 font-medium"
                  >
                    {questionIndex === sessionQuestions.length - 1
                      ? "Finish"
                      : "Continue →"}
                  </button>
                </div>
              )}
            </>
          )}

          {/* CONFIRM MODE */}
          {mode === "confirm" && confirmAction && (
            <>
              <h3 className="text-lg font-medium">{confirmAction}</h3>

              {!showFeedback ? (
                <button
                  onClick={() => setShowFeedback(true)}
                  className="w-full bg-blue-500 hover:bg-green-700 text-white font-bold p-3 rounded-xl transition"
                >
                  Mark Complete
                </button>
              ) : (
                <div className="p-4 bg-green-50 rounded-xl text-green-700 font-medium">
                  ✅ Completed
                </div>
              )}
            </>
          )}

          {/* FOOTER ACTIONS */}
          <div className="flex justify-between pt-4">
            <button
              onClick={handleFinish}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}