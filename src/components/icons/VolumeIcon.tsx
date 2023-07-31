import React from "react";

type Props = {
  width?: number;
  height?: number;
};

export const VolumeIcon = ({ width = 40, height = 40 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 72"
    >
      <g>
        <path
          fill="#9b9b9a"
          d="M12.08 44.411V27.717a2 2 0 012-2H25.79V46.41H14.08a2 2 0 01-2-1.998z"
        ></path>
        <path
          fill="#d0cfce"
          d="M42.268 58.433l-14.5-11.579a.974.974 0 00.061-.3v-21.25a.92.92 0 00-.024-.117l14.46-11.74.003 44.986z"
        ></path>
      </g>
      <g fill="none" stroke="#000" strokeLinecap="round" strokeWidth="2">
        <path
          strokeLinejoin="round"
          d="M43.219 11.375L26.784 24.721H14.072a3.01 3.01 0 00-3 3v16.692a3.01 3.01 0 003 3h12.712L43.22 60.541l-.001-49.166z"
        ></path>
        <path strokeLinejoin="round" d="M26.784 25.333L26.784 46.583"></path>
        <path
          strokeMiterlimit="10"
          d="M54.674 24.612a18.91 18.91 0 010 22.692M50.369 28.782a11.96 11.96 0 010 14.352M58.869 19.782a26.96 26.96 0 010 32.352"
        ></path>
      </g>
    </svg>
  );
};
