/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "./components/Header";
import { DifficultyButton } from "./components/DifficultyButton";
import { InfoButton } from "./components/InfoButton";
import { RestartButton } from "./components/RestartButton";
import { VolumeButton } from "./components/VolumeButton";
import { Modal } from "./components/Modal";
import { InfoModal } from "./components/InfoModal";
import { useBestScores } from "./hooks/useBestScores";
import { useHighScore } from "./hooks/useHighScore";
// @ts-ignore
import foodSound from "../public/sound/food.mp3";
// @ts-ignore
import directionSound from "../public/sound/direction.mp3";

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 400px;
  max-width: 100%;

  @media screen and (max-width: 500px) {
    width: 340px;
  }
`;

const StyledGameAreaContainer = styled.div`
  position: relative;
  margin: 10px 0;
  overflow: hidden;
`;

const StyledGameArea = styled.ul`
  display: flex;

  li {
    list-style: none;
    min-width: 20px;
    min-height: 20px;
    border-right: 0;

    @media screen and (max-width: 500px) {
      min-width: 17px;
      min-height: 17px;
    }

    > div {
      background-color: #2d2f3d;
      width: 20px;
      height: 20px;

      @media screen and (max-width: 500px) {
        width: 17px;
        height: 17px;
      }
    }
  }
`;

const StyledGameFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledRestartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 10px;
`;

const MAX_SCORE = 100;
const GAME_LENGTH = 20;

export type GameDifficulty = "easy" | "medium" | "hard";

type SnakeDirection = "left" | "right" | "up" | "down";

type Snake = {
  x: number;
  y: number;
};

const INITIAL_GAME_SPEED = 100;
const INITIAL_SNAKE_LENGTH = 1;
const INITIAL_SNAKE_DIRECTION: SnakeDirection = "right";
const INITIAL_FOOD_COORDINATES = { x: 5, y: 7 };

const CHARACTER = "🐍";
const FOODS = ["🍎", "🍄", "🔮", "💣"];

export const Snake = () => {
  const [snake, setSnake] = useState<Snake[]>([]);
  const [snakeLength, setSnakeLength] = useState(INITIAL_SNAKE_LENGTH);
  const [snakeDirection, setSnakeDirection] = useState<SnakeDirection>(
    INITIAL_SNAKE_DIRECTION
  );
  const [foodCoordinates, setFoodCoordinates] = useState(
    INITIAL_FOOD_COORDINATES
  );
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED);
  const [gameLength] = useState(GAME_LENGTH);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameDifficulty, setGameDifficulty] =
    useState<GameDifficulty>("medium");
  const [isRestartModalVisible, setIsRestartModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isGameOverModalVisible, setIsGameOverModalVisible] = useState(false);
  const [sound, setSound] = useState({
    food: foodSound,
    direction: directionSound,
    isMuted: false,
  });

  const { areScoresFetched, bestScore } = useBestScores(gameDifficulty);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { addNewHighScore } = useHighScore();

  useEffect(() => {
    init();
  }, [gameDifficulty, gameSpeed]);

  const init = () => {
    setSnake([]);
    setSnakeLength(INITIAL_SNAKE_LENGTH);
    setSnake(() => [getRandomDirection()]);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    const validKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    const { key } = event;

    if (!validKeys.includes(key)) {
      return;
    }

    const direction = key.replace("Arrow", "").toLowerCase() as SnakeDirection;
    setSnakeDirection(direction);
    playAudio(sound.direction, 0.05);
  };

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const snakeHead = { ...newSnake[newSnake.length - 1] };

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

      newSnake.push(snakeHead);
      if (newSnake.length > snakeLength) {
        newSnake.shift();
      }

      return newSnake;
    });

    updatePoint();
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
    if (foodCoordinates.x === x && foodCoordinates.y === y) {
      return true;
    }
  };

  const playAudio = (audioSource: string, audioVolume: number) => {
    if (sound.isMuted) return;
    const audio = new Audio(audioSource);
    audio.volume = audioVolume;
    audio.play();
  };

  const changeDifficulty = () => {
    setGameDifficulty((prevDifficulty) => {
      let newDifficulty = prevDifficulty;

      switch (prevDifficulty) {
        case "easy":
          newDifficulty = "medium";
          setGameSpeed(INITIAL_GAME_SPEED);
          break;

        case "medium":
          newDifficulty = "hard";
          setGameSpeed(INITIAL_GAME_SPEED - 20);
          break;

        case "hard":
          newDifficulty = "easy";
          setGameSpeed(INITIAL_GAME_SPEED + 20);
          break;

        default:
          newDifficulty = "medium";
          setGameSpeed(INITIAL_GAME_SPEED);
      }

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
        setIsGameOver(true);
        setIsGameOverModalVisible(true);
        const score = snakeSegments.length - 1;
        // @ts-ignore
        if (score > bestScore.user__score) {
          // showBestScoreAlert();
        }
        break;
      }
    }
  };

  const updatePoint = async () => {
    const snakeHead = snake[snake.length - 1];

    if (
      foodCoordinates.x === snakeHead.x &&
      foodCoordinates.y === snakeHead.y
    ) {
      setSnakeLength((prevLength) => prevLength + 1);
      setFoodCoordinates(getRandomDirection());
      playAudio(sound.food, 0.1);

      // max score is reached
      if (snakeLength - 1 === MAX_SCORE) {
        /* Use the appropriate modal library here (e.g., React Modal or custom implementation) to show the alert. */
      }
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
    init();
  };

  return (
    <StyledContainer>
      <Header score={snakeLength - 1} bestScore={bestScore} />
      <StyledGameAreaContainer>
        <Modal
          isModalVisible={isRestartModalVisible}
          setIsModalVisible={setIsRestartModalVisible}
        >
          💫 <br /> Restart?
          <StyledRestartButton
            onClick={() => {
              gameOver();
              setIsRestartModalVisible(false);
            }}
          >
            Restart
          </StyledRestartButton>
        </Modal>
        <InfoModal
          isModalVisible={isInfoModalVisible}
          setIsModalVisible={setIsInfoModalVisible}
        />
        <Modal
          isModalVisible={isGameOverModalVisible}
          setIsModalVisible={setIsGameOverModalVisible}
        >
          😔 <br /> Game Over! <br />
          Your score is {snakeLength - 1}.
          <StyledRestartButton
            onClick={() => {
              gameOver();
              setIsRestartModalVisible(false);
            }}
          >
            Play Again 🐍
          </StyledRestartButton>
        </Modal>

        <StyledGameArea>
          {Array.from({ length: gameLength }).map((_, colIndex) => (
            <li key={colIndex}>
              {Array.from({ length: gameLength }).map((_, rowIndex) => (
                <div key={rowIndex}>
                  {bindSnake(colIndex, rowIndex) ? (
                    <>{CHARACTER}</>
                  ) : bindFood(colIndex, rowIndex) ? (
                    <>🍎</>
                  ) : null}
                </div>
              ))}
            </li>
          ))}
        </StyledGameArea>
      </StyledGameAreaContainer>
      <StyledGameFooter>
        <InfoButton
          onClick={() => setIsInfoModalVisible(!isInfoModalVisible)}
        />
        <DifficultyButton
          changeDifficulty={changeDifficulty}
          disabled={snakeLength - 1 > 0}
        >
          {gameDifficulty}
        </DifficultyButton>
        <VolumeButton sound={sound} setSound={setSound} />
        <RestartButton
          onClick={() => setIsRestartModalVisible(!isRestartModalVisible)}
          disabled={isRestartModalVisible}
        />
      </StyledGameFooter>
    </StyledContainer>
  );
};
