export type SmartItem = {
  id: string;
  letter: "S" | "M" | "A" | "R" | "T";
  title: string;
  description: string;
};

export const smartItems: SmartItem[] = [
  {
    id: "sleep",
    letter: "S",
    title: "Sleep",
    description: "Track and improve sleep quality.",
  },
  {
    id: "movement",
    letter: "M",
    title: "Movement",
    description: "Confirm daily physical activity.",
  },
  {
    id: "awareness",
    letter: "A",
    title: "Awareness",
    description: "Daily consistency check",
  },
  {
    id: "routine",
    letter: "R",
    title: "Routine",
    description: "Daily consistency check",
  },
  {
    id: "tracking",
    letter: "T",
    title: "Tracking",
    description: "View habits and long-term trends.",
  },
];