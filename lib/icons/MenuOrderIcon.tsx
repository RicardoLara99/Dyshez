import React from "react";
interface color {
    color: string;
  }
export const MenuOrderIcon = ({color}:color) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.12496 4.66684V6.35433H10.6249V4.66684C10.6249 3.42584 9.61595 2.41686 8.37495 2.41686C7.13394 2.41686 6.12496 3.42584 6.12496 4.66684ZM4.43747 8.04182H2.18749V15.3543C2.18749 16.2859 2.94334 17.0418 3.87498 17.0418H12.8749C13.8065 17.0418 14.5624 16.2859 14.5624 15.3543V8.04182H12.3124V10.0106C12.3124 10.4781 11.9362 10.8543 11.4687 10.8543C11.0011 10.8543 10.6249 10.4781 10.6249 10.0106V8.04182H6.12496V10.0106C6.12496 10.4781 5.74879 10.8543 5.28122 10.8543C4.81364 10.8543 4.43747 10.4781 4.43747 10.0106V8.04182ZM4.43747 6.35433V4.66684C4.43747 2.49069 6.19879 0.72937 8.37495 0.72937C10.5511 0.72937 12.3124 2.49069 12.3124 4.66684V6.35433H14.5624C15.494 6.35433 16.2499 7.11019 16.2499 8.04182V15.3543C16.2499 17.2175 14.7382 18.7292 12.8749 18.7292H3.87498C2.01171 18.7292 0.5 17.2175 0.5 15.3543V8.04182C0.5 7.11019 1.25585 6.35433 2.18749 6.35433H4.43747Z"
        fill={color}
      />
    </svg>
  );
};