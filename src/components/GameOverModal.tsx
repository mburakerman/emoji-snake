import cuid from "cuid";
import React, { useState } from "react";
import styled from "styled-components";

import { useAddBestScore } from "../hooks/useAddBestScore";
import { useBestScores } from "../hooks/useBestScores";
import { GameDifficulty, StyledRestartButton } from "../Snake";
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
  const { addBestScore, loading: addNewHighScoreLoading } = useAddBestScore();
  const { bestScore, fetchBestScores } = useBestScores(gameDifficulty);

  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
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
              await addBestScore({
                user__id: cuid(),
                user__name: bestScoreUserName || "anonymous",
                user__score: score,
              });
              setBestScoreUserName("");
              setIsModalVisible(false);
              gameOver();
              fetchBestScores();
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
