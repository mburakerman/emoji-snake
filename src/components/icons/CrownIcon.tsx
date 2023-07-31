import React from "react";

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

export const CrownIcon = ({
  width = 25,
  height = 25,
  className: className,
}: Props) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 72 72"
    >
      <g>
        <path fill="#FFF" d="M4 51.624H68V58.891000000000005H4z"></path>
        <circle cx="35.996" cy="16.008" r="5" fill="#FFF"></circle>
        <path fill="#F1B31C" d="M4 51.624H68V58.891000000000005H4z"></path>
        <path fill="#FCEA2B" d="M7 11a5 5 0 010 10M65 21a5 5 0 010-10"></path>
        <path
          fill="#FCEA2B"
          d="M64.967 17.494c0 9.082-7.361 16.443-16.442 16.443h-.287c-9.081 0-11.443-7.361-11.443-16.443h-2.074c0 9.082-2.361 16.443-11.442 16.443h.164c-5.312 0-10.036-2.519-13.042-6.427A16.37 16.37 0 017 17.494V11v40.624h58V11"
        ></path>
        <circle cx="35.996" cy="16.008" r="5" fill="#FCEA2B"></circle>
      </g>
      <g
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      >
        <path d="M4 51.624H68V58.891000000000005H4z"></path>
        <path d="M7 11L7 51.624 65 51.624 65 11"></path>
        <path d="M7 11a5 5 0 010 10M23.443 33.937c-5.312 0-10.036-2.519-13.042-6.427A16.371 16.371 0 017 17.494M64.967 17.494c0 9.082-7.361 16.443-16.442 16.443"></path>
        <circle cx="35.996" cy="16.008" r="5"></circle>
        <path d="M65 21a5 5 0 010-10"></path>
        <path d="M4 51.624H68V58.891000000000005H4z"></path>
        <path d="M7 11a5 5 0 010 10M65 21a5 5 0 010-10"></path>
        <path d="M34.597 20.874c-.588 7.46-3.396 13.063-11.318 13.063h.164c-5.312 0-10.036-2.519-13.042-6.427A16.37 16.37 0 017 17.494V11v40.624h58V11"></path>
        <path d="M64.967 17.494c0 9.082-7.361 16.443-16.442 16.443h-.287c-7.906 0-10.72-5.58-11.315-13.016"></path>
        <circle cx="35.996" cy="16.008" r="5"></circle>
      </g>
    </svg>
  );
};
