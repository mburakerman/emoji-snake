import React from "react";
import { RefreshCwIcon } from "vue-feather-icons";
import { applyVueInReact } from "vuereact-combined";

const RefreshIcon = applyVueInReact(RefreshCwIcon);

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
      <RefreshIcon />
    </button>
  );
};
