import React from "react";
import { RestartIcon } from "./icons/RestartIcon";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

export const RestartButton = ({ disabled, onClick }: Props) => {
  return (
    <button
      className="button--restart"
      onClick={onClick}
      title="Restart"
      disabled={disabled}
    >
      <RestartIcon />
    </button>
  );
};
