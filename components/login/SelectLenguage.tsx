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

const SelectLenguage = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] focus-visible:ring-0 focus:border-primary focus-visible:ring-offset-0 ">
        <SelectValue placeholder="Lenguaje" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Lenguaje</SelectLabel>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="us">Ingles</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectLenguage;
