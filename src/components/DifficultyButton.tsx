import React from "react";
import styled from "styled-components";

type Props = {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
};

const StyledCButton = styled.button`
  margin-right: 10px;
  text-transform: capitalize;
`;

export const DifficultyButton = ({ onClick, children, disabled }: Props) => {
  return (
    <StyledCButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledCButton>
  );
};
