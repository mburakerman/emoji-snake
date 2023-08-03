import React from "react";
import styled, { css } from "styled-components";
import { CloseIcon } from "./icons/CloseIcon";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
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

export const Modal = ({
  isModalVisible,
  setIsModalVisible,
  children,
}: Props) => {
  return (
    <StyledContainer active={isModalVisible}>
      <StyledCloseButton onClick={() => setIsModalVisible(false)}>
        <CloseIcon />
      </StyledCloseButton>
      {children}
    </StyledContainer>
  );
};
