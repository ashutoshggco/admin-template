import React from "react";

function FilterButtonIcon(color) {
  return (
    <div style={{ paddingRight: "0.5rem" }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 16"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 5.24998H17.5V6.74998H2.5V5.24998ZM5.875 10H14.125V11.5H5.875V10ZM8.125 14.75H11.875V16.25H8.125V14.75ZM0.25 0.5H19.75V2H0.25V0.5Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

export default FilterButtonIcon;
