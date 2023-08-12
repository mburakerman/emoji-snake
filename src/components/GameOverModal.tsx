import cuid from "cuid";
import React, { useState } from "react";
import styled from "styled-components";

import { useBestScores } from "../hooks/useBestScores";
import { useSaveBestScore } from "../hooks/useSaveBestScore";
import { GameDifficulty, StyledRestartButton } from "../Snake";
import { useGlobalStore } from "../store";
import { Modal, ModalProps } from "./Modal";

type Props = {
  score: number;
  gameDifficulty: GameDifficulty;
  gameOver: () => void;
} & Pick<ModalProps, "isModalVisible" | "setIsModalVisible">;

const StyledAddBestScoreInput = styled.input`
  border: none;
  padding: 3px 6px;
  border-radius: 4px;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledAddBestScoreButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 4px;
  background-color: #50fa7b;
`;

export const GameOverModal = ({
  isModalVisible,
  setIsModalVisible,
  score,
  gameDifficulty,
  gameOver,
}: Props) => {
  const [bestScoreUserName, setBestScoreUserName] = useState("");
  const { saveBestScore, loading: addNewHighScoreLoading } = useSaveBestScore();
  const bestScore = useGlobalStore((state) => state.bestScore);
  const { fetchBestScores } = useBestScores();

  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      hideCloseIcon={true}
    >
      😔 <br /> Game Over! <br />
      Your score is {score}.
      <br />
      <br />
      {bestScore && score > bestScore?.user__score ? (
        <div>
          <p>
            Congrats 🎉
            <br /> You have made the best score!
          </p>
          <StyledAddBestScoreInput
            placeholder="Save your name"
            type="text"
            value={bestScoreUserName}
            onChange={(event) => {
              setBestScoreUserName(event.target.value);
            }}
          />
          <StyledAddBestScoreButton
            onClick={async () => {
              await saveBestScore({
                user__id: cuid(),
                user__name: bestScoreUserName || "anonymous",
                user__score: score,
                user__difficulty: gameDifficulty,
              });
              setBestScoreUserName("");
              gameOver();
              fetchBestScores();
              setIsModalVisible(false);
            }}
            disabled={addNewHighScoreLoading}
          >
            Save
          </StyledAddBestScoreButton>
        </div>
      ) : null}
      <StyledRestartButton
        onClick={() => {
          gameOver();
          setIsModalVisible(false);
        }}
      >
        Play Again 🐍
      </StyledRestartButton>
    </Modal>
  );
};
