import React from "react";
import { Volume2Icon, VolumeXIcon } from "vue-feather-icons";
import { applyVueInReact } from "vuereact-combined";
// @ts-ignore
import isMobile from "../helpers/is-mobile.js";

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
  const handleClick = () => {
    const updatedSound = { ...sound, isMuted: !sound.isMuted };
    onClick(updatedSound);
  };

  // @ts-ignore
  const mobile = isMobile();

  if (mobile) {
    return null;
  }

  return (
    <button className="button--volume" title="Volume" onClick={handleClick}>
      {sound.isMuted ? <Volume2IconReact /> : <VolumeXIconReact />}
    </button>
  );
};
