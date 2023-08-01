import React from "react";
import styled from "styled-components";

export type Character = "donaldJohnTrump" | "sponge" | "fahrettinKoca";

type CharacterData = {
  name: string;
  value: Character;
};

type Props = {
  selectedCharacter: Character;
  setSelectedCharacter: (value: Character) => void;
};

const data: CharacterData[] = [
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

export const INITIAL_CHARACTER: Character = "sponge";

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

export const Characters = ({
  selectedCharacter,
  setSelectedCharacter,
}: Props) => {
  return (
    <StyledContainer>
      <StyledTitle>Characters</StyledTitle>
      <ul>
        {data.map(({ name, value }) => (
          <StyledCharacter
            selected={selectedCharacter === value}
            key={value}
            onClick={() => setSelectedCharacter(value)}
          >
            {name}
          </StyledCharacter>
        ))}
      </ul>
    </StyledContainer>
  );
};
