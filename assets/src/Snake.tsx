/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "./components/Header";
import { DifficultyButton } from "./components/DifficultyButton";
import { InfoButton } from "./components/InfoButton";
import { RestartButton } from "./components/RestartButton";
import { VolumeButton } from "./components/VolumeButton";
import { Characters } from "./components/Characters";
import { useBestScores } from "./hooks/useBestScores";
import { useHighScore } from "./hooks/useHighScore";

const StyledContainer = styled.div``;

const MAX_SCORE = 100;
const GAME_LENGTH = 20;

export type GameDifficulty = "easy" | "medium" | "hard";

type Snake = {
  x: number;
  y: number;
};

const INITIAL_SNAKE_LENGTH = 1;

export const Snake = () => {
  const [snake, setSnake] = useState<Snake[]>([]);
  const [snakeLength, setSnakeLength] = useState(INITIAL_SNAKE_LENGTH);
  const [snakeDirection, setSnakeDirection] = useState("right");
  const [food, setFood] = useState([{ x: 5, y: 7 }]);
  const [gameSpeed, setGameSpeed] = useState(100);
  const [gameLength] = useState(GAME_LENGTH);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const [characters, setCharacters] = useState({
    snake: {
      sponge: true,
      fahrettinKoca: false,
      donaldJohnTrump: false,
    },
  });

  const { areScoresFetched, bestScore } = useBestScores(
    gameDifficulties[gameDifficulty]
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { addNewHighScore } = useHighScore();

  useEffect(() => {
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
    setSnakeLength(INITIAL_SNAKE_LENGTH);
    setSnake(() => [getRandomDirection()]);
    setScoreAnimation(false);
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      // @ts-ignore
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const snakeHead = newSnake[newSnake.length - 1];

      // Calculate the new position of the snake's head based on the direction
      if (snakeDirection === "right") {
        snakeHead.x += 1;
      } else if (snakeDirection === "left") {
        console.log("left");
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
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const validKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    const { key } = event;

    if (!validKeys.includes(key)) {
      return;
    }

    const direction = key.replace("Arrow", "").toLowerCase();
    setSnakeDirection(direction);
    playAudio(sound.direction, 0.05);
  };

  useEffect(() => {
    if (!isGameOver) {
      const gameInterval = setInterval(moveSnake, gameSpeed);
      return () => clearInterval(gameInterval);
    }
  }, [moveSnake, gameSpeed, isGameOver]);

  const bindSnake = (x: number, y: number) => {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === x && snake[i].y === y) {
        return true;
      }
    }
  };

  const bindFood = (x: number, y: number) => {
    for (const item of food) {
      if (item.x === x && item.y === y) {
        return true;
      }
    }
  };

  const playAudio = (audioSource: string, audioVolume: number) => {
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
