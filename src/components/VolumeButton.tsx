import React from "react";
import styled from "styled-components";

import { useGlobalStore } from "../store";
import { MutedVolumeIcon } from "./icons/MutedVolumeIcon";
import { VolumeIcon } from "./icons/VolumeIcon";

const StyledButton = styled.button`
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

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const VolumeButton = () => {
  const isMuted = useGlobalStore((state) => state.isMuted);
  const setIsMuted = useGlobalStore((state) => state.setIsMuted);

  if (isMobile()) {
    return null;
  }

  return (
    <StyledButton title="Volume" onClick={() => setIsMuted(!isMuted)}>
      {isMuted ? <MutedVolumeIcon /> : <VolumeIcon />}
    </StyledButton>
  );
};
