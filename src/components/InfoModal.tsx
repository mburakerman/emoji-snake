import React from "react";
import { styled } from "styled-components";

import { FOODS } from "../Snake";
import { Modal, ModalProps } from "./Modal";

type Props = Pick<ModalProps, "isModalVisible" | "setIsModalVisible">;

const StyledContent = styled.div`
  font-size: 15px;

  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

export const InfoModal = ({ isModalVisible, setIsModalVisible }: Props) => {
  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <StyledContent>
        💡
        <br /> Use your arrow buttons or swipe left, right, top or bottom to
        move.
        <br />
        👊🏼 <br /> If you beat the top score, you can save your name.
        <br />
        ⚡️ <br /> Discover the top scorer by hovering over the best score area.
        <br />
        <br />
        ⬇️ Score info ⬇️
        <br />
        {FOODS.map((item) => {
          return (
            <span key={item.food}>
              {item.food}: {item.score}{" "}
            </span>
          );
        })}
        <br />
        <br />
        🦄 <br /> Have fun!
      </StyledContent>
    </Modal>
  );
};
