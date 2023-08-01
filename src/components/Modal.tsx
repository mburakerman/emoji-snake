import React from "react";
import styled, { css } from "styled-components";
import { CloseIcon } from "./icons/CloseIcon";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isGameOver: boolean;
  gameOver: () => void;
  modalTemplate: string;
  wantRestart: boolean;
};

const StyledContainer = styled.div<{ active: boolean }>`
  position: absolute;
  background-color: rgba(32, 33, 44, 0.9);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 15px;
  text-align: center;
  visibility: hidden;
  opacity: 0;
  transition: all 0.1s linear;

  ${({ active }) =>
    active &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

const StyledTryAgainButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 10px;
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

export const Modal = ({
  isModalVisible,
  setIsModalVisible,
  isGameOver,
  gameOver,
  modalTemplate,
  wantRestart,
}: Props) => {
  return (
    <StyledContainer active={isModalVisible}>
      {!isGameOver ? (
        <StyledCloseButton onClick={() => setIsModalVisible(false)}>
          <CloseIcon />
        </StyledCloseButton>
      ) : null}

      <div dangerouslySetInnerHTML={{ __html: modalTemplate }}></div>

      {wantRestart ? (
        <StyledRestartButton onClick={gameOver}>Restart</StyledRestartButton>
      ) : isGameOver ? (
        <StyledTryAgainButton onClick={gameOver}>
          Try Again
        </StyledTryAgainButton>
      ) : null}
    </StyledContainer>
  );
};
