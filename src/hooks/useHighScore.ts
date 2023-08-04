import { useState } from "react";

import db from "../firebase";

export const useHighScore = () => {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addNewHighScore = async (scoreData: any) => {
    try {
      setLoading(true);

      await db.collection("scores").add(scoreData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { addNewHighScore, loading };
};
