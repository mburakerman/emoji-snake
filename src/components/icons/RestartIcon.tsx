import React from "react";

type Props = {
  width?: number;
  height?: number;
};

export const RestartIcon = ({ width = 40, height = 40 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 72"
    >
      <g
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      >
        <path d="M11.5 45.81a17.26 17.26 0 01-1.5-7.064v-1.108c0-9.463 7.575-17.135 16.92-17.135h30.908M60.494 25.968A17.38 17.38 0 0162 33.071v1.114c0 9.515-7.603 17.229-16.98 17.229H14"></path>
        <path d="M57.828 20.503L49.643 12.289"></path>
        <path d="M49.643 28.716L57.828 20.503"></path>
        <path d="M14 51.414L22.185 43.2"></path>
        <path d="M22.185 59.628L14 51.414"></path>
      </g>
    </svg>
  );
};
