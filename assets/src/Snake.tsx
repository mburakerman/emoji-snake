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

type Snake = {
  x: number;
  y: number;
};

export const Snake = () => {
  const [snake, setSnake] = useState<Snake[]>([]);
  const [snakeLength, setSnakeLength] = useState(1);
  const [snakeDirection, setSnakeDirection] = useState("right");
  const [food, setFood] = useState([{ x: 5, y: 7 }]);
  const [gameSpeed, setGameSpeed] = useState(100);
  const [gameLength] = useState(GAME_LENGTH);
  const [gameAnimationTimer, setGameAnimationTimer] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
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

    return () => {
      // @ts-ignore
      clearInterval(gameAnimationTimer);
      window.removeEventListener("keyup", bindSnakeDirections);
    };
  }, [gameDifficulty]);

  const init = () => {
    // @ts-ignore
    clearInterval(gameAnimationTimer);
    setSnake([]);
    setSnakeLength(1);
    setSnake((prevSnake: any) => [getRandomDirection()]);
    setScoreAnimation(false);

    animateSnake();
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

  const addNewHighScore = (scoreData: any) => {
    db.collection("scores")
      .doc()
      .set(scoreData)
      .then(() => {
        fetchScores(gameDifficulties[gameDifficulty]);
      });
  };

  const bindSnake = (x: any, y: any) => {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === x && snake[i].y === y) {
        return true;
      }
    }
  };

  const bindFood = (x: any, y: any) => {
    for (const item of food) {
      if (item.x === x && item.y === y) {
        return true;
      }
    }
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

  const animateSnake = () => {
    setGameAnimationTimer(
      setInterval(() => {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const snakeHead = newSnake[newSnake.length - 1];

          // Calculate the new position of the snake's head based on the direction
          if (snakeDirection === "right") {
            snakeHead.x += 1;
          } else if (snakeDirection === "left") {
            snakeHead.x -= 1;
          } else if (snakeDirection === "up") {
            snakeHead.y -= 1;
          } else if (snakeDirection === "down") {
            snakeHead.y += 1;
          }

          // game area check
          if (snakeHead.x === gameLength) {
            snakeHead.x = 0;
          } else if (snakeHead.x === -1) {
            snakeHead.x = gameLength - 1;
          } else if (snakeHead.y === -1) {
            snakeHead.y = gameLength - 1;
          } else if (snakeHead.y === gameLength) {
            snakeHead.y = 0;
          }

          preventSnakeToBiteItself(newSnake);

          if (newSnake.length > snakeLength) {
            // If the snake is longer than snakeLength, remove the tail segment
            newSnake.shift();
          }

          return newSnake;
        });

        updatePoint();
      }, gameSpeed)
    );
  };

  const preventSnakeToBiteItself = (snakeSegments: string | any[]) => {
    if (snakeSegments.length < 2) {
      return;
    }

    const snakeHead = snakeSegments[snakeSegments.length - 1];
    for (let i = 0; i < snakeSegments.length - 1; i++) {
      // Check if the snake's head collides with any other segment of the snake
      if (
        snakeHead.x === snakeSegments[i].x &&
        snakeHead.y === snakeSegments[i].y
      ) {
        toggleGameOverModal();
        const score = snakeSegments.length - 1;
        // @ts-ignore
        if (score > bestScore.user__score) {
          // showBestScoreAlert();
        }
        break;
      }
    }
  };

  const toggleGameOverModal = () => {
    setIsGameOver(true);
    // @ts-ignore
    clearInterval(gameAnimationTimer);
    setModalTemplate(
      `<p>😷<br />Game Over!<br />Your score is ${snakeLength - 1}.</p>`
    );
    setIsModalVisible(!isModalVisible);
  };

  const updatePoint = () => {
    const snakeHead = snake[snake.length - 1];

    if (food[0].x === snakeHead.x && food[0].y === snakeHead.y) {
      setSnakeLength((prevLength) => prevLength + 1);
      setFood([getRandomDirection()]);
      playAudio(sound.food, 0.1);

      // max score is reached
      if (snakeLength - 1 === MAX_SCORE) {
        // @ts-ignore
        clearInterval(gameAnimationTimer);
        /* Use the appropriate modal library here (e.g., React Modal or custom implementation) to show the alert. */
      }
    }
  };

  const bindSnakeDirections = (e: any) => {
    e.preventDefault();

    const directions: any = {
      37: "left",
      38: "up",
      39: "right",
      40: "down",
    };
    // direction control check
    if (directions[e.keyCode] !== undefined) {
      if (
        (snakeDirection === "right" && directions[e.keyCode] === "left") ||
        (snakeDirection === "left" && directions[e.keyCode] === "right") ||
        (snakeDirection === "down" && directions[e.keyCode] === "up") ||
        (snakeDirection === "up" && directions[e.keyCode] === "down")
      ) {
        return false;
      }

      setSnakeDirection(directions[e.keyCode]);
      playAudio(sound.direction, 0.05);
    }
  };

  const getRandomDirection = () => {
    const maxPosition = gameLength;
    return {
      x: Math.floor(Math.random() * maxPosition),
      y: Math.floor(Math.random() * maxPosition),
    };
  };

  const gameOver = () => {
    setIsGameOver(false);
    setIsModalVisible(!isModalVisible);
    setWantRestart(false);
    init();
  };

  return (
    <StyledContainer className="game">
      <Header
        score={snakeLength - 1}
        bestScore={bestScore}
        isScoreAnimationActive={scoreAnimation}
        areScoresFetched={areScoresFetched}
      />

      <div className="game__area">
        <div className={`game__area-overlay ${isModalVisible ? "active" : ""}`}>
          <button
            className="game__area-overlay-close"
            onClick={() => setIsModalVisible(false)}
            style={{ display: !isGameOver ? "block" : "none" }}
          >
            X
          </button>
          <div
            className="game__area-overlay-content"
            dangerouslySetInnerHTML={{ __html: modalTemplate }}
          ></div>
          <div style={{ display: !wantRestart ? "block" : "none" }}>
            <button
              style={{ display: !isGameOver ? "block" : "none" }}
              onClick={() => setIsModalVisible(false)}
            >
              OK
            </button>
            <button
              style={{ display: isGameOver ? "block" : "none" }}
              onClick={gameOver}
            >
              Try Again
            </button>
          </div>
          <button
            style={{ display: wantRestart ? "block" : "none" }}
            onClick={gameOver}
          >
            OK
          </button>
        </div>
        <ul>
          {Array.from({ length: gameLength }).map((_, colIndex) => (
            <li key={colIndex}>
              {Array.from({ length: gameLength }).map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${
                    bindSnake(colIndex, rowIndex)
                      ? "snake"
                      : bindFood(colIndex, rowIndex)
                      ? "food"
                      : ""
                  } ${
                    characters.snake.fahrettinKoca
                      ? "fahrettinKoca"
                      : characters.snake.donaldJohnTrump
                      ? "donaldJohnTrump"
                      : ""
                  }`}
                ></div>
              ))}
            </li>
          ))}
        </ul>
      </div>

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
