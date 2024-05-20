import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
interface filter {
  status: string;
  count: number;
}
interface handleChange {
  filters: filter[];
  handleChangeActiveFilter: (value: string) => void;
}
const classNameButtons =
  "px-3 rounded-full border text-secondary data-[state=on]:bg-white data-[state=on]:text-primary  data-[state=on]:border-primary hover:bg-white hover:border-primary hover:border";

export const Filters = ({
  filters,
  handleChangeActiveFilter,
}: handleChange) => {
  return (
    <ToggleGroup type="single" defaultValue="1" className="flex-wrap">
      <ToggleGroupItem
        className={classNameButtons}
        value="1"
        title="All"
        onClick={() => {
          handleChangeActiveFilter("");
        }}
      >
        All
      </ToggleGroupItem>
      {filters.map(({ status, count }, i) => (
        <ToggleGroupItem
          className={classNameButtons}
          value={i + 2 + ""}
          title="Accepted"
          key={`filter-${i}`}
          onClick={() => {
            handleChangeActiveFilter(status);
          }}
        >
          {status} ({count})
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
