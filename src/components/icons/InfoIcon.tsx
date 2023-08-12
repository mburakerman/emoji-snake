import React from "react";

type Props = {
  width?: number;
  height?: number;
};

export const InfoIcon = ({ width = 40, height = 40 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 72"
    >
      <path
        fill="#d0cfce"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M59.035 60h-46.07a.968.968 0 01-.965-.965v-46.07c0-.53.434-.965.965-.965h46.07c.53 0 .965.434.965.965v46.07c0 .53-.434.965-.965.965z"
      ></path>
      <g>
        <path
          fill="none"
          stroke="#000"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M59.035 60h-46.07a.968.968 0 01-.965-.965v-46.07c0-.53.434-.965.965-.965h46.07c.53 0 .965.434.965.965v46.07c0 .53-.434.965-.965.965z"
        ></path>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M36.5 31.5L36.5 46.5"
        ></path>
        <circle cx="36.5" cy="26" r="1.5"></circle>
      </g>
    </svg>
  );
};
