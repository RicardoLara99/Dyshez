import React from "react";
interface color {
  asc: boolean;
  active:boolean;
}
export const OrderArrows = ({ asc, active }: color) => {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"

    >
      <path
        d="M4.71228 10.2306V2.85672L6.05368 4.19812L6.95998 3.28992L4.07008 0.400024L1.18018 3.28992L2.08838 4.19812L3.42978 2.85672V10.2306H4.71228Z"
        fill={asc  && active ?"#E3026F":"#A6A6A6"}
        stroke={asc && active ?"#E3026F":"#A6A6A6"}
        strokeWidth="0.3"
      />
      <path
        d="M11.919 12.7101L11.0108 11.8019L9.66936 13.1433V5.76941H8.38686V13.1433L7.04546 11.8019L6.13916 12.7101L9.02906 15.6L11.919 12.7101Z"
        fill={!asc && active ?"#E3026F":"#A6A6A6"}
        stroke={!asc  && active?"#E3026F":"#A6A6A6"}
        strokeWidth="0.3"
      />
    </svg>
  );
};
