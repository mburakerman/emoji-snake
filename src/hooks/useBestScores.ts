import { useEffect, useState } from "react";

import db from "../firebase";
import { GameDifficulty, INITIAL_GAME_DIFFICULTY } from "../Snake";

export type Score = {
  user__difficulty?: GameDifficulty;
  user__id: string;
  user__name: string;
  user__score: number;
};

export type BestScore = Score | null;

export const useBestScores = (difficulty: GameDifficulty) => {
  const [areScoresFetched, setAreScoresFetched] = useState(false);
  const [bestScore, setBestScore] = useState<BestScore>(null);

  const fetchBestScores = async () => {
    try {
      setAreScoresFetched(false);
      setBestScore(null);

      const querySnapshot = await db.collection("tests").get();

      const fetchedScores: Score[] = [];
      querySnapshot.forEach((item) => {
        setAreScoresFetched(true);
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

  return { areScoresFetched, bestScore, fetchBestScores };
};
