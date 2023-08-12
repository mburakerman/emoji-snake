import { useEffect, useState } from "react";

import db, { COLLECTION_NAME } from "../firebase";
import { GameDifficulty } from "../Snake";
import { useGlobalStore } from "../store";

export type Score = {
  user__difficulty?: GameDifficulty;
  user__id: string;
  user__name: string;
  user__score: number;
};

export type BestScore = Score | null;

export const useBestScores = () => {
  const [isFetched, setIsFetched] = useState(false);
  const setBestScore = useGlobalStore((state) => state.setBestScore);

  const fetchBestScores = async () => {
    try {
      setIsFetched(false);

      const querySnapshot = await db.collection(COLLECTION_NAME).get();

      const fetchedScores: Score[] = [];
      querySnapshot.forEach((item) => {
        setIsFetched(true);
        const scores = item.data() as Score;
        fetchedScores.push(scores);
      });

      const highestScore = fetchedScores.reduce((prev, current) =>
        prev.user__score > current.user__score ? prev : current
      );
      setBestScore(highestScore);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetched(true);
    }
  };

  useEffect(() => {
    fetchBestScores();
  }, []);

  return { isFetched, fetchBestScores };
};
