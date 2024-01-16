import React from "react";

type Props = {
  width?: number;
  height?: number;
};

export const MutedVolumeIcon = ({ width = 40, height = 40 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 72"
      data-testid="muted-volume-icon"
    >
      <g strokeMiterlimit="10">
        <path
          fill="#d0cfce"
          stroke="#d0cfce"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M33.77 47.413l16.436 13.128V11.375L33.77 24.721"
        ></path>
        <path
          fill="#d0cfce"
          stroke="#d0cfce"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M33.715 24.801L33.715 46.051"
        ></path>
        <path
          fill="#9b9b9a"
          stroke="#9b9b9a"
          strokeWidth="1.938"
          d="M32.793 24.721H20.855c-1.554.005-2.812 1.345-2.817 3v16.692c.005 1.655 1.263 2.995 2.817 3h11.938"
        ></path>
      </g>
      <g
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M50.22 45.488l-.001-34.113-16.435 13.346h-4.128M20.23 24.843a3.01 3.01 0 00-2.158 2.878v16.692a3.01 3.01 0 003 3h12.712L50.22 60.541v-5.659"></path>
        <path d="M33.784 25.333L33.784 29"></path>
        <path d="M33.784 39L33.784 47.051"></path>
        <path d="M11.605 11.783L60.105 60.282"></path>
      </g>
    </svg>
  );
};
