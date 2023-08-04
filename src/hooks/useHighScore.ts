import { useState } from "react";

import db from "../firebase";
import { Score } from "./useBestScores";

export const useHighScore = () => {
  const [loading, setLoading] = useState(false);

  const addNewHighScore = async (scoreData: Score) => {
    try {
      setLoading(true);

      await db.collection("tests").add(scoreData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { addNewHighScore, loading };
};
