import { useState } from "react";

import db from "../firebase";
import { Score } from "./useBestScores";

export const useSaveBestScore = () => {
  const [loading, setLoading] = useState(false);

  const saveBestScore = async (scoreData: Score) => {
    try {
      setLoading(true);
      await db.collection("tests").add(scoreData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { saveBestScore, loading };
};