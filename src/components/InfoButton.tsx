import React from "react";
import styled from "styled-components";

import { InfoIcon } from "./icons/InfoIcon";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

const StyledButton = styled.button`
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #43465a;
  margin-right: auto;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const InfoButton = ({ onClick, disabled }: Props) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} title="Info">
      <InfoIcon />
    </StyledButton>
  );
};
