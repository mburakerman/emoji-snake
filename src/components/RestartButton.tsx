import React from "react";

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
      --refresh-icon--
    </button>
  );
};
