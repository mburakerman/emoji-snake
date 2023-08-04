import React from "react";
import styled from "styled-components";

import { MutedVolumeIcon } from "./icons/MutedVolumeIcon";
import { VolumeIcon } from "./icons/VolumeIcon";

type Sound = {
  food: string;
  direction: string;
  isMuted: boolean;
};

type Props = {
  sound: Sound;
  setSound: (val: Sound) => void;
};

const StyledContainer = styled.button`
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #43465a;
  margin-right: 10px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const VolumeButton = ({ sound, setSound }: Props) => {
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const handleClick = () => {
    const updatedSound = { ...sound, isMuted: !sound.isMuted };
    setSound(updatedSound);
  };

  if (isMobile()) {
    return null;
  }

  return (
    <StyledContainer title="Volume" onClick={handleClick}>
      {sound.isMuted ? <MutedVolumeIcon /> : <VolumeIcon />}
    </StyledContainer>
  );
};
