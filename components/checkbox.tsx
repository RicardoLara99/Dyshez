import * as React from "react";

import { forwardRef } from "react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckBoxProps {
  id: string;
  text: string;
  classContainer?: string;
}

const CheckBox = forwardRef<HTMLDivElement, CheckBoxProps>(
  ({ id, text, classContainer }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center space-x-2 justify-center",
          classContainer
        )}
      >
        <Checkbox id={id} required />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {text}
        </label>
      </div>
    );
  }
);
CheckBox.displayName = "CheckBox";

export { CheckBox };
