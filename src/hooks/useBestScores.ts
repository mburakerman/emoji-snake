/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { GameDifficulty } from "../Snake";

import db from "../firebaseInit";

type Score = {
  user__difficulty: GameDifficulty;
  user__score: number;
};

export const useBestScores = (difficulty: GameDifficulty) => {
  const [bestScores, setBestScores] = useState<Score[]>([]);
  const [areScoresFetched, setAreScoresFetched] = useState(false);
  const [bestScore, setBestScore] = useState<Score | null>(null);

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

        const highestScore = fetchedScores.reduce(
          (prev: Score, current: Score) =>
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
