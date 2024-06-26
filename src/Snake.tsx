import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSound from "use-sound";

import directionSound from "../public/sound/direction.mp3";
import foodSound from "../public/sound/food.mp3";
import { DifficultyButton } from "./components/DifficultyButton";
import { GameOverModal } from "./components/GameOverModal";
import { Header } from "./components/Header";
import { InfoButton } from "./components/InfoButton";
import { InfoModal } from "./components/InfoModal";
import { Modal } from "./components/Modal";
import { RestartButton } from "./components/RestartButton";
import { VolumeButton } from "./components/VolumeButton";
import { Direction, useTouch } from "./hooks/useTouch";
import { useGlobalStore } from "./store";

const StyledContainer = styled.div`
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
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

const StyledGameFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
`;

export const StyledRestartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 10px;
`;

const GAME_LENGTH = 20;

export type GameDifficulty = "easy" | "medium" | "hard";

export type SnakeDirection = "left" | "right" | "up" | "down";

type Coordinates = {
  x: number;
  y: number;
};

export const INITIAL_GAME_DIFFICULTY: GameDifficulty = "medium";
const INITIAL_GAME_SPEED = 100;
const INITIAL_SNAKE_LENGTH = 1;
const INITIAL_SNAKE_DIRECTION: SnakeDirection = "right";
const INITIAL_FOOD_COORDINATES = { x: 5, y: 7 };

const CHARACTER = "🐍";

export const FOODS = [
  {
    score: 1,
    food: "🍎",
  },
  {
    score: 2,
    food: "🍄",
  },
  {
    score: 3,
    food: "🔮",
  },
];

const SECOND_FOOD_VISIBILITY_SCORE = 10;
const THIRD_FOOD_VISIBILITY_SCORE = 10;

export const Snake = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isMuted = useGlobalStore((state) => state.isMuted);

  const [playDirectionSound, directionSoundData] = useSound(directionSound, {
    volume: isMuted ? 0 : 0.1,
  });
  const [playFoodSound] = useSound(foodSound, {
    volume: isMuted ? 0 : 0.1,
  });

  const [snakeCoordinates, setSnakeCoordinates] = useState<Coordinates[]>([]);
  const [snakeLength, setSnakeLength] = useState(INITIAL_SNAKE_LENGTH);
  const [snakeDirection, setSnakeDirection] = useState<SnakeDirection>(
    INITIAL_SNAKE_DIRECTION
  );
  const [foodCoordinates, setFoodCoordinates] = useState<Coordinates>(
    INITIAL_FOOD_COORDINATES
  );
  const [currentFood, setCurrentFood] = useState(FOODS[0]);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED);
  const [gameLength] = useState(GAME_LENGTH);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState<GameDifficulty>(
    INITIAL_GAME_DIFFICULTY
  );
  const [isRestartModalVisible, setIsRestartModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isGameOverModalVisible, setIsGameOverModalVisible] = useState(false);

  useEffect(() => {
    init();
  }, [gameDifficulty, gameSpeed]);

  const init = () => {
    setSnakeCoordinates([]);
    setSnakeLength(INITIAL_SNAKE_LENGTH);
    setSnakeCoordinates(() => [getRandomDirection()]);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [directionSoundData]);

  const handleKeyPress = (event: KeyboardEvent) => {
    const validKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    const { key } = event;

    if (!validKeys.includes(key)) {
      return;
    }

    const direction = key.replace("Arrow", "").toLowerCase() as SnakeDirection;
    setSnakeDirection(direction);
    playDirectionSound();
  };

  const handleTouchDirection = (direction: Direction) => {
    setSnakeDirection(direction);
  };
  useTouch(ref, handleTouchDirection);

  const moveSnake = () => {
    setSnakeCoordinates((prevSnake) => {
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

  const preventSnakeToBiteItself = (snakeSegments: Coordinates[]) => {
    if (snakeSegments.length < 2) {
      return;
    }

    const snakeHead = snakeSegments[snakeSegments.length - 1];
    for (let i = 0; i < snakeSegments.length - 1; i++) {
      if (
        snakeHead.x === snakeSegments[i].x &&
        snakeHead.y === snakeSegments[i].y
      ) {
        setIsGameOver(true);
        setIsGameOverModalVisible(true);
        break;
      }
    }
  };

  const updatePoint = async () => {
    const snakeHead = snakeCoordinates[snakeCoordinates.length - 1];
    const isFoodEaten =
      foodCoordinates.x === snakeHead.x && foodCoordinates.y === snakeHead.y;

    if (isFoodEaten) {
      setSnakeLength((prevLength) => prevLength + currentFood.score);
      setFoodCoordinates(getRandomDirection());
      playFoodSound();

      const score = snakeLength - 1;

      if (
        score > SECOND_FOOD_VISIBILITY_SCORE &&
        score <= THIRD_FOOD_VISIBILITY_SCORE
      ) {
        const availableFoods = FOODS.slice(0, -1);
        const randomFood =
          availableFoods[Math.floor(Math.random() * availableFoods.length)];
        setCurrentFood(randomFood);
      } else if (score > THIRD_FOOD_VISIBILITY_SCORE) {
        const randomFood = FOODS[Math.floor(Math.random() * FOODS.length)];
        setCurrentFood(randomFood);
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
    <StyledContainer ref={ref}>
      <Header score={snakeLength - 1} />
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
        <GameOverModal
          isModalVisible={isGameOverModalVisible}
          setIsModalVisible={setIsGameOverModalVisible}
          gameDifficulty={gameDifficulty}
          gameOver={gameOver}
          score={snakeLength - 1}
        />

        <StyledGameArea>
          {Array.from({ length: gameLength }).map((_, colIndex) => {
            return (
              <li key={colIndex}>
                {Array.from({ length: gameLength }).map((_, rowIndex) => {
                  const isSnakeBound = snakeCoordinates.some(
                    ({ x, y }) => x === colIndex && y === rowIndex
                  );
                  const isFoodBound =
                    foodCoordinates.x === colIndex &&
                    foodCoordinates.y === rowIndex;

                  return (
                    <div key={rowIndex}>
                      {isSnakeBound ? (
                        <>{CHARACTER}</>
                      ) : isFoodBound ? (
                        <>{currentFood.food}</>
                      ) : null}
                    </div>
                  );
                })}
              </li>
            );
          })}
        </StyledGameArea>
      </StyledGameAreaContainer>

      <StyledGameFooter>
        <InfoButton
          onClick={() => setIsInfoModalVisible(!isInfoModalVisible)}
          disabled={isRestartModalVisible || isGameOver}
        />
        <DifficultyButton
          changeDifficulty={changeDifficulty}
          disabled={snakeLength - 1 > 0}
        >
          {gameDifficulty}
        </DifficultyButton>
        <VolumeButton />
        <RestartButton
          onClick={() => setIsRestartModalVisible(!isRestartModalVisible)}
          disabled={isRestartModalVisible || isInfoModalVisible || isGameOver}
        />
      </StyledGameFooter>
    </StyledContainer>
  );
};
