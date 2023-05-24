import React from "react";

function DownArrow({ color, onClick, strokeWidth }) {
  return (
    <svg
      onClick={onClick}
      width="15"
      height="10"
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke={color ? color : "#96989A"}
        stroke-width={strokeWidth ? strokeWidth : 2}
        stroke-linecap="round"
      />
    </svg>
  );
}

export default DownArrow;
