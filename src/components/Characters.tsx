import React from "react";
import styled from "styled-components";

type Characters = {
  snake: {
    // sponge: boolean;
    // fahrettinKoca: boolean;
    // donaldJohnTrump: boolean;
    [key: string]: boolean;
  };
};
type Props = {
  characters: Characters;
  onClick: (value: Characters) => void;
};

const StyledContainer = styled.div`
  margin: 20px auto 0px;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const StyledTitle = styled.div`
  margin-top: 0;
  margin-bottom: 4px;
  font-size: 18px;
`;

const StyledCharacter = styled.li<{ selected: boolean }>`
  margin-right: 10px;
  margin-bottom: 5px;
  font-size: 15px;
  cursor: pointer;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`;

const data = [
  {
    name: "Donald Trump",
    value: "donaldJohnTrump",
  },
  {
    name: "Sponge",
    value: "sponge",
  },
  {
    name: "Fahrettin Koca",
    value: "fahrettinKoca",
  },
];

export const Characters = ({ characters, onClick }: Props) => {
  const toggleSnakeCharacter = (character: string) => {
    characters.snake.sponge = false;
    characters.snake.donaldJohnTrump = false;
    characters.snake.fahrettinKoca = false;

    if (character === "donaldJohnTrump") {
      characters.snake.donaldJohnTrump = !characters.snake.donaldJohnTrump;
    } else if (character === "fahrettinKoca") {
      characters.snake.fahrettinKoca = !characters.snake.fahrettinKoca;
    } else {
      characters.snake.sponge = !characters.snake.sponge;
    }

    onClick({ ...characters });
  };

  const selectedCharacter = Object.keys(characters.snake).find(
    (key) => characters.snake[key] === true
  );

  return (
    <StyledContainer>
      <StyledTitle>Characters</StyledTitle>
      <ul>
        {data.map(({ name, value }) => (
          <StyledCharacter
            selected={String(selectedCharacter) === value}
            key={value}
            onClick={() => toggleSnakeCharacter(value)}
          >
            {name}
          </StyledCharacter>
        ))}
      </ul>
    </StyledContainer>
  );
};
