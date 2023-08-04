/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect,useState } from "react";

import db from "../firebase";
import { GameDifficulty } from "../Snake";

export type Score = {
  user__difficulty?: GameDifficulty;
  user__id: string;
  user__name: string;
  user__score: number;
};

export type BestScore = Score | null;

export const useBestScores = (difficulty: GameDifficulty) => {
  const [bestScores, setBestScores] = useState<Score[]>([]);
  const [areScoresFetched, setAreScoresFetched] = useState(false);
  const [bestScore, setBestScore] = useState<BestScore>(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setBestScores([]);
        setAreScoresFetched(false);
        setBestScore(null);

        const querySnapshot = await db.collection("scores").get();

        const fetchedScores: Score[] = [];
        querySnapshot.forEach((item) => {
          setAreScoresFetched(true);
          const scores = item.data() as Score;

          // medium is default difficulty
          if (
            difficulty === "medium" ||
            scores.user__difficulty === difficulty
          ) {
            fetchedScores.push(scores);
          }
        });

        setBestScores(fetchedScores);

        const highestScore = fetchedScores.reduce((prev, current) =>
          prev.user__score > current.user__score ? prev : current
        );
        setBestScore(highestScore);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, [difficulty]);

  return { bestScores, areScoresFetched, bestScore };
};
