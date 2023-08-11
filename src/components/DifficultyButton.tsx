import React from "react";
import styled from "styled-components";

type Props = {
  changeDifficulty: () => void;
  disabled: boolean;
  children: React.ReactNode;
};

const StyledButton = styled.button`
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #43465a;
  margin-right: 10px;
  text-transform: capitalize;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DifficultyButton = ({
  changeDifficulty,
  children,
  disabled,
}: Props) => {
  return (
    <StyledButton onClick={changeDifficulty} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
