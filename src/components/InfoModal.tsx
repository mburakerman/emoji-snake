import React from "react";
import { Modal } from "./Modal";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InfoModal = ({ isModalVisible, setIsModalVisible }: Props) => {
  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <div>
        💡
        <br /> Use your arrow buttons or swipe left, right, top or bottom to
        nagivate.
        <br />
        <br />
        If your score is better than current best score, your score will be
        saved. You can save your name or leave it anonymous.
        <br />
        <br />
        You can also see who has the best score by tapping on best score.
        <br />
        <br />
        Maximum score is 100. <br />
        Have fun!
      </div>
    </Modal>
  );
};
