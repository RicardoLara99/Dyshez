import React from "react";
interface color {
  color: string;
}
export const MenuLogoutIcon = ({ color }: color) => {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 6.75L18 9L16 11.25" fill={color} />
      <path
        d="M13.273 13.7728C10.6369 16.4088 6.36307 16.4088 3.72703 13.7728C1.09099 11.1367 1.09099 6.86289 3.72703 4.22685C6.36307 1.59081 10.6369 1.59081 13.273 4.22685M16 6.75L18 9L16 11.25M17.875 9H8.50001"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
};
