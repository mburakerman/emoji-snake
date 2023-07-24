/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import styled from "styled-components";
import { applyVueInReact } from "vuereact-combined";

import { Header } from "./components/Header";
import { DifficultyButton } from "./components/DifficultyButton";
import { InfoButton } from "./components/InfoButton";
import { RestartButton } from "./components/RestartButton";
import { VolumeButton } from "./components/VolumeButton";
import { Characters } from "./components/Characters";

const StyledContainer = styled.div``;

const MAX_SCORE = 100;
const GAME_LENGTH = 20;

export const Snake = () => {
  const [snake, setSnake] = useState([]);
  const [snakeLength, setSnakeLength] = useState(1);
  const [snakeDirection, setSnakeDirection] = useState("right");
  const [food, setFood] = useState([{ x: 5, y: 7 }]);
  const [gameSpeed, setGameSpeed] = useState(100);
  const [gameLength] = useState(GAME_LENGTH);
  const [gameAnimationTimer, setGameAnimationTimer] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameDifficulties] = useState(["easy", "medium", "hard"]);
  const [gameDifficulty, setGameDifficulty] = useState(1);
  const [scoreAnimation, setScoreAnimation] = useState(false);
  const [modalTemplate, setModalTemplate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [wantRestart, setWantRestart] = useState(false);
  const [sound, setSound] = useState({
    food: require("./assets/sound/food.mp3"),
    direction: require("./assets/sound/direction.mp3"),
    isMuted: false,
  });
  const [bestScores, setBestScores] = useState([]);
  const [areScoresFetched, setAreScoresFetched] = useState(false);
  const [bestScore, setBestScore] = useState({});
  const [characters, setCharacters] = useState({
    snake: {
      sponge: true,
      fahrettinKoca: false,
      donaldJohnTrump: false,
    },
  });

  const toggleRestartModal = () => {
    setModalTemplate(`<p>🧼<br> Restart?</p>`);
    setIsModalVisible(!isModalVisible);
    setWantRestart(true);
  };

  const toggleDifficulty = () => {
    setGameDifficulty((prevDifficulty) => {
      let newDifficulty = prevDifficulty + 1;
      if (newDifficulty > 2) {
        newDifficulty = 0;
      }

      const initSpeed = 100;
      if (newDifficulty === 0) {
        setGameSpeed(initSpeed + 20);
      } else if (newDifficulty === 1) {
        setGameSpeed(initSpeed);
      } else {
        setGameSpeed(initSpeed - 20);
      }

      //fetchScores(gameDifficulties[newDifficulty]);
      return newDifficulty;
    });
  };

  return (
    <StyledContainer className="game">
      <Header
        score={snakeLength - 1}
        bestScore={bestScore}
        isScoreAnimationActive={scoreAnimation}
        areScoresFetched={areScoresFetched}
      />

      <div className="game__footer">
        <InfoButton
          onClick={(val) => {
            setModalTemplate(val);
            setIsModalVisible(!isModalVisible);
          }}
        />
        <DifficultyButton
          onClick={toggleDifficulty}
          disabled={snakeLength - 1 > 0}
        >
          {gameDifficulties[gameDifficulty]}
        </DifficultyButton>

        <VolumeButton sound={sound} onClick={(val) => setSound(val as any)} />
        <RestartButton onClick={toggleRestartModal} disabled={isModalVisible} />
      </div>

      <Characters
        characters={characters}
        onClick={(val) => setCharacters(val as any)}
      />
    </StyledContainer>
  );
};
