/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { GameDifficulty } from "../Snake";

import db from "../../firebaseInit";

export const useBestScores = (difficulty: GameDifficulty) => {
  const [bestScores, setBestScores] = useState<any>([]);
  const [areScoresFetched, setAreScoresFetched] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<any>({});

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setBestScores([]);
        setAreScoresFetched(false);
        setBestScore({});

        const querySnapshot = await db.collection("scores").get();

        const fetchedScores: any = [];
        querySnapshot.forEach((item) => {
          setAreScoresFetched(true);
          const scores = item.data();
          if (
            scores.user__difficulty !== undefined &&
            scores.user__difficulty === difficulty
          ) {
            fetchedScores.push(scores);
          } else if (difficulty === "medium") {
            fetchedScores.push(scores);
          }
        });

        setBestScores(fetchedScores);

        const highestScore = fetchedScores.reduce(
          (prev: any, current: any) =>
            prev.user__score > current.user__score ? prev : current,
          {}
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
