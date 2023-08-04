import cuid from "cuid";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import directionSound from "../public/sound/direction.mp3";
import foodSound from "../public/sound/food.mp3";
import { DifficultyButton } from "./components/DifficultyButton";
import { Header } from "./components/Header";
import { InfoButton } from "./components/InfoButton";
import { InfoModal } from "./components/InfoModal";
import { Modal } from "./components/Modal";
import { RestartButton } from "./components/RestartButton";
import { VolumeButton } from "./components/VolumeButton";
import { useBestScores } from "./hooks/useBestScores";
import { useHighScore } from "./hooks/useHighScore";
import { Direction, useTouch } from "./hooks/useTouch";

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 400px;
  max-width: 100%;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;

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

const GAME_LENGTH = 20;

export type GameDifficulty = "easy" | "medium" | "hard";

export type SnakeDirection = "left" | "right" | "up" | "down";

type Coordinates = {
  x: number;
  y: number;
};

const INITIAL_GAME_SPEED = 100;
const INITIAL_SNAKE_LENGTH = 1;
const INITIAL_SNAKE_DIRECTION: SnakeDirection = "right";
const INITIAL_FOOD_COORDINATES = { x: 5, y: 7 };

const CHARACTER = "🐍";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FOODS = ["🍎", "🍄", "🔮", "💣"];

export const Snake = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [snakeCoordinates, setSnakeCoordinates] = useState<Coordinates[]>([]);
  const [snakeLength, setSnakeLength] = useState(INITIAL_SNAKE_LENGTH);
  const [snakeDirection, setSnakeDirection] = useState<SnakeDirection>(
    INITIAL_SNAKE_DIRECTION
  );
  const [foodCoordinates, setFoodCoordinates] = useState<Coordinates>(
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
  const [bestScoreUserName, setBestScoreUserName] = useState("");

  const { bestScore } = useBestScores(gameDifficulty);
  const { addNewHighScore, loading: addNewHighScoreLoading } = useHighScore();

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

    if (
      foodCoordinates.x === snakeHead.x &&
      foodCoordinates.y === snakeHead.y
    ) {
      setSnakeLength((prevLength) => prevLength + 1);
      setFoodCoordinates(getRandomDirection());
      playAudio(sound.food, 0.1);
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
          <br />
          <br />
          {bestScore && snakeLength - 1 > bestScore?.user__score ? (
            <div>
              <p>
                Congrats 🎉
                <br /> You have made the best score!
              </p>
              <input
                placeholder="Save your name"
                type="text"
                value={bestScoreUserName}
                onChange={(event) => {
                  setBestScoreUserName(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  addNewHighScore({
                    user__id: cuid(),
                    user__name: bestScoreUserName || "anonymous",
                    user__score: snakeLength - 1,
                  });
                }}
                disabled={addNewHighScoreLoading}
              >
                Save
              </button>
            </div>
          ) : null}
          <StyledRestartButton
            onClick={() => {
              gameOver();
              setIsGameOverModalVisible(false);
            }}
          >
            Play Again 🐍
          </StyledRestartButton>
        </Modal>

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
                        <>🍎</>
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
        <VolumeButton sound={sound} setSound={setSound} />
        <RestartButton
          onClick={() => setIsRestartModalVisible(!isRestartModalVisible)}
          disabled={isRestartModalVisible || isInfoModalVisible || isGameOver}
        />
      </StyledGameFooter>
    </StyledContainer>
  );
};
