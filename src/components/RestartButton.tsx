import React from "react";
import styled from "styled-components";

import { RestartIcon } from "./icons/RestartIcon";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const StyledButton = styled.button`
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #43465a;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RestartButton = ({ disabled, onClick }: Props) => {
  return (
    <StyledButton onClick={onClick} title="Restart" disabled={disabled}>
      <RestartIcon />
    </StyledButton>
  );
};
