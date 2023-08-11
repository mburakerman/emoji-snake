import { useEffect, useState } from "react";

import db from "../firebase";
import { GameDifficulty, INITIAL_GAME_DIFFICULTY } from "../Snake";
import { useGlobalStore } from "../store";

export type Score = {
  user__difficulty?: GameDifficulty;
  user__id: string;
  user__name: string;
  user__score: number;
};

export type BestScore = Score | null;

export const useBestScores = (difficulty: GameDifficulty) => {
  const [isFetched, setIsFetched] = useState(false);
  const setBestScore = useGlobalStore((state) => state.setBestScore);

  const fetchBestScores = async () => {
    try {
      setIsFetched(false);

      const querySnapshot = await db.collection("tests").get();

      const fetchedScores: Score[] = [];
      querySnapshot.forEach((item) => {
        setIsFetched(true);
        const scores = item.data() as Score;

        if (
          difficulty === INITIAL_GAME_DIFFICULTY ||
          scores.user__difficulty === difficulty
        ) {
          fetchedScores.push(scores);
        }
      });

      const highestScore = fetchedScores.reduce((prev, current) =>
        prev.user__score > current.user__score ? prev : current
      );
      setBestScore(highestScore);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBestScores();
  }, [difficulty]);

  return { isFetched, fetchBestScores };
};
