import React from "react";
import { Volume2Icon, VolumeXIcon } from "vue-feather-icons";
import { applyVueInReact } from "vuereact-combined";

const Volume2IconReact = applyVueInReact(Volume2Icon);
const VolumeXIconReact = applyVueInReact(VolumeXIcon);

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
      {sound.isMuted ? <Volume2IconReact /> : <VolumeXIconReact />}
    </button>
  );
};
