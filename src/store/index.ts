import { create } from "zustand";

import { BestScore } from "../hooks/useBestScores";

type GlobalStore = {
  bestScore: BestScore;
  setBestScore: (value: BestScore) => void;
};

export const useGlobalStore = create<GlobalStore>()((set) => ({
  bestScore: null,
  setBestScore: (value) => set(() => ({ bestScore: value })),
}));
