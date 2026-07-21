"use client";
import React from "react";
import clsx from "clsx";

interface WaveDividerProps {
  bgColor?: string;   // section background color
  flip?: boolean;     // use downward wave if true, upward otherwise
  className?: string; // extra classes for positioning/overlap
}

const WaveDivider: React.FC<WaveDividerProps> = ({
  bgColor = "#ffffff",
  flip = false,
  className = "",
}) => {
  const upwardPath = "M1922.9,15.15c-51.47-11.44-86.87-15.15-185.55-15.15-155.09,0-155.09,43.75-310.18,43.75S1272.08,0,1116.99,0s-155.09,43.75-310.17,43.75S651.73,0,496.64,0s-155.09,43.75-310.18,43.75C92.12,43.75,51.35,15.23,0,.53v149.63h1922.9V15.15Z";
  const downwardPath = "M0,134.73c51.97,11.6,87.2,15.35,186.47,15.35,155.09,0,155.09-43.75,310.18-43.75s155.09,43.75,310.18,43.75,155.09-43.75,310.17-43.75,155.09,43.75,310.18,43.75,155.09-43.75,310.18-43.75c93.78,0,134.63,28.18,185.55,42.95V.08H0v134.65Z";

  return (
    <div
      className={clsx("w-full overflow-hidden leading-none relative", className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1922.9 150.16"
        className="w-full"
        style={{ aspectRatio: '1922.9 / 150.16' }}
      >
        <path
          fill={bgColor}
          d={flip ? upwardPath : downwardPath}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;