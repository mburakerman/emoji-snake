import React from "react";

import { Modal, ModalProps } from "./Modal";

type Props = Pick<ModalProps, "isModalVisible" | "setIsModalVisible">;

export const InfoModal = ({ isModalVisible, setIsModalVisible }: Props) => {
  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <div>
        💡
        <br /> Use your arrow buttons or swipe left, right, top or bottom to
        move.
        <br />
        👊🏼 <br /> If you beat the top score, you can save your name.
        <br />
        🔮 <br /> Discover the top scorer by hovering over the best score area.
        <br />
        <br />
        🦄 <br /> Have fun!
      </div>
    </Modal>
  );
};
