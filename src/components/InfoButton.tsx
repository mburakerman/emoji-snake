import React from "react";
import styled from "styled-components";

type Props = {
  onClick: (val: string) => void;
};

const StyledCButton = styled.button`
  margin-right: auto;
`;

export const InfoButton = ({ onClick }: Props) => {
  const handleClick = () => {
    const modalTemplate = `<p>💡<br> Use your arrow buttons or swipe left, right, top or bottom to nagivate.</p>
<br />
<p>
  If your score is better than current best score, your score will be saved. You can save your name or leave it anonymous.
  <br />You can also see who has the best score by tapping on best score.
</p>
<p>Maximum score is 100. Have fun!</p>`;
    onClick(modalTemplate);
  };

  return <StyledCButton onClick={handleClick}>--info-icon--</StyledCButton>;
};
