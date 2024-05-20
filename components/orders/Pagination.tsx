import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Image from "next/image";

const classNameButtons =
  "px-3 rounded-full border text-secondary data-[state=on]:bg-white data-[state=on]:text-primary  data-[state=on]:border-primary hover:bg-white hover:border-primary hover:border";

interface handleChange {
  pagination: number;
  setPagination: (value: number) => void;
  totalOrders: number;
  itemsPerPage: number;
}
export const Pagination = ({
  pagination,
  setPagination,
  totalOrders,
  itemsPerPage,
}: handleChange) => {
  return (
    <ToggleGroup
      type="single"
      defaultValue="0"
      className="gap-2"
      value={pagination + ""}
    >
      <ToggleGroupItem
        className={`${classNameButtons} text-black border-transparent max-w-[35px] min-w-[35px] max-h-[35px] min-h-[35px] ${
          pagination === 0 ? "hidden" : ""
        }`}
        title={`arrow-left`}
        value=""
        onClick={() => {
          setPagination(pagination - 1);
        }}
      >
        <Image src="/icons/Chevron-Left.svg" alt="arrow" width={6} height={6} />
      </ToggleGroupItem>
      {Array.from({ length: Math.ceil(totalOrders / itemsPerPage) }, (_, i) => (
        <ToggleGroupItem
          className={`${classNameButtons} text-black border-transparent max-w-[35px] min-w-[35px] max-h-[35px] min-h-[35px]`}
          value={i + ""}
          title={`page-${i + 1}`}
          key={i}
          onClick={() => {
            setPagination(i);
          }}
        >
          {i + 1}
        </ToggleGroupItem>
      ))}
      <ToggleGroupItem
        className={`${classNameButtons} text-black border-transparent max-w-[35px] min-w-[35px] max-h-[35px] min-h-[35px] ${
          pagination + 1 === Math.ceil(totalOrders / itemsPerPage)
            ? "hidden"
            : ""
        }`}
        title={`arrow-left`}
        value=""
        onClick={() => {
          setPagination(pagination + 1);
        }}
      >
        <Image
          src="/icons/Chevron-Left.svg"
          alt="arrow"
          width={6}
          height={6}
          className="rotate-180"
        />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
