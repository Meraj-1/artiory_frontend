"use client";
import React from "react";

interface Props {
  className?: string;
}

const ProfileIcon: React.FC<Props> = ({ className }) => {
  return (
    <>
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <circle
        cx="16"
        cy="16"
        r="15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
      <path
        d="M26,27c0-5.523-4.477-10-10-10s-10,4.477-10,10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
      <circle
        cx="16"
        cy="11"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
      </svg>
    </>
  );
};

export default ProfileIcon;
