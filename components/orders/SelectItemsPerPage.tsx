import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface handleChange {
  itemsPerPage: string;
  handleChangeItemsPerPage: (value: string) => void;
}
export const SelectItemsPerPage = ({
  itemsPerPage,
  handleChangeItemsPerPage,
}: handleChange) => {
  return (
    <Select value={itemsPerPage + ""} onValueChange={handleChangeItemsPerPage}>
      <SelectTrigger className=" focus-visible:ring-0 focus:border-primary focus-visible:ring-offset-0 ">
        <SelectValue placeholder="Resultados por pagina" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Resultados por página</SelectLabel>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
