import React from "react";
import { VolumeIcon } from "./icons/VolumeIcon";
import { MutedVolumeIcon } from "./icons/MutedVolumeIcon";

type SoundProps = {
  isMuted: boolean;
};

type Props = {
  sound: SoundProps;
  onClick: (val: SoundProps) => void;
};

export const VolumeButton = ({ sound, onClick }: Props) => {
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const handleClick = () => {
    const updatedSound = { ...sound, isMuted: !sound.isMuted };
    onClick(updatedSound);
  };

  if (isMobile()) {
    return null;
  }

  return (
    <button className="button--volume" title="Volume" onClick={handleClick}>
      {sound.isMuted ? <MutedVolumeIcon /> : <VolumeIcon />}
    </button>
  );
};
