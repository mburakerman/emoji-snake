/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import db from "../firebaseInit";

export const useHighScore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const addNewHighScore = async (scoreData: any) => {
    try {
      setLoading(true);
      setError(null);

      await db.collection("scores").add(scoreData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { addNewHighScore, loading, error };
};
