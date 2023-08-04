import React from "react";
import styled from "styled-components";

import { InfoIcon } from "./icons/InfoIcon";

type Props = {
  onClick: () => void;
};

const StyledContainer = styled.button`
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #43465a;
  margin-right: auto;

  &:disabled {
    opacity: 0.5;
  }
`;

export const InfoButton = ({ onClick }: Props) => {
  return (
    <StyledContainer onClick={onClick}>
      <InfoIcon />
    </StyledContainer>
  );
};
