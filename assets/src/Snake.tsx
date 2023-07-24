/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Hammer from "hammerjs";
import { applyVueInReact } from "vuereact-combined";
// @ts-ignore
import db from "../firebaseInit.js";

import { Header } from "./components/Header";
import { DifficultyButton } from "./components/DifficultyButton";
import { InfoButton } from "./components/InfoButton";
import { RestartButton } from "./components/RestartButton";
import { VolumeButton } from "./components/VolumeButton";
import { Characters } from "./components/Characters";

const StyledContainer = styled.div``;

const MAX_SCORE = 100;
const GAME_LENGTH = 20;

type GameDifficulty = "easy" | "medium" | "hard";

export const Snake = () => {
  const [snake, setSnake] = useState([]);
  const [snakeLength, setSnakeLength] = useState(1);
  const [snakeDirection, setSnakeDirection] = useState("right");
  const [food, setFood] = useState([{ x: 5, y: 7 }]);
  const [gameSpeed, setGameSpeed] = useState(100);
  const [gameLength] = useState(GAME_LENGTH);
  const [gameAnimationTimer, setGameAnimationTimer] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameDifficulties] = useState<GameDifficulty[]>([
    "easy",
    "medium",
    "hard",
  ]);
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

  useEffect(() => {
    fetchScores(gameDifficulties[gameDifficulty]);
    init();

    // Clean up
    return () => {
      //clearInterval(gameAnimationTimer);
      //window.removeEventListener("keyup", bindSnakeDirections);
    };
  }, [gameDifficulty]);

  const init = () => {
    //clearInterval(gameAnimationTimer);
    setSnake([]);
    setSnakeLength(1);
    //setSnake((prevSnake) => [getRandomDirection()]);
    setScoreAnimation(false);

    //animateSnake();
  };

  useEffect(() => {
    // @ts-ignore
    const swipeGestures = new Hammer(document.querySelector(".game"));
    swipeGestures.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

    swipeGestures.on("swipeleft", () => {
      if (snakeDirection === "right") return;
      setSnakeDirection("left");
      playAudio(sound.direction, 0.05);
    });
    swipeGestures.on("swiperight", () => {
      if (snakeDirection === "left") return;
      setSnakeDirection("right");
      playAudio(sound.direction, 0.05);
    });
    swipeGestures.on("swipeup", () => {
      if (snakeDirection === "down") return;
      setSnakeDirection("up");
      playAudio(sound.direction, 0.05);
    });
    swipeGestures.on("swipedown", () => {
      if (snakeDirection === "up") return;
      setSnakeDirection("down");
      playAudio(sound.direction, 0.05);
    });
  }, [snakeDirection]);

  const fetchScores = (difficulty: GameDifficulty) => {
    setBestScores([]);
    setAreScoresFetched(false);
    setBestScore({});

    db.collection("scores")
      .get()
      .then((query: any) => {
        const fetchedScores: any = [];
        query.forEach((item: any) => {
          setAreScoresFetched(true);
          const scores = item.data();
          if (scores.user__difficulty !== undefined) {
            if (scores.user__difficulty === difficulty) {
              fetchedScores.push(scores);
            }
          } else {
            if (difficulty === "medium") {
              fetchedScores.push(scores);
            }
          }
        });

        setBestScores(fetchedScores);
        setBestScore(
          fetchedScores.reduce(
            (
              prev: { user__score: number },
              current: { user__score: number }
            ) => (prev.user__score > current.user__score ? prev : current)
          )
        );
      })
      .catch((error: Error) => {
        console.error("Error fetching scores:", error);
      });
  };

  // @ts-ignore
  const playAudio = (audioSource, audioVolume: number) => {
    if (sound.isMuted) return;
    const audio = new Audio(audioSource);
    audio.volume = audioVolume;
    audio.play();
  };

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
