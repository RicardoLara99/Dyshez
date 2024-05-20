import * as React from "react";

import { Input } from "./ui/input";

import {
  forwardRef,
  Ref,
  HTMLProps,
  InputHTMLAttributes,
  ImgHTMLAttributes,
  HTMLAttributes,
} from "react";
import Image from "next/image";

// Definir interfaces para cada conjunto de props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface CustomImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  width?: number | `${number}`;
  height?: number | `${number}`;
}
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

interface InputIconProps {
  inputProps: InputProps;
  containerProps: ContainerProps;
  imageProps: CustomImageProps;
}

const InputIcon = forwardRef<HTMLDivElement, InputIconProps>(
  ({ inputProps, containerProps, imageProps }, ref) => {
    const { width, height, src,...restImageProps } = imageProps;
    const parsedWidth = typeof width === 'string' ? parseInt(width) : width;
    const parsedHeight = typeof height === 'string' ? parseInt(height) : height;

    return (
      <div className="relative" {...containerProps} ref={ref}>
        <Image
          width={parsedWidth || 15}
          height={parsedHeight || 15}
          alt={imageProps?.alt || 'inputIcon'}
          src={src || '/at.svg'}
          className="lucide lucide-search absolute left-[.6rem] top-[.8rem] h-4 w-4 text-muted-foreground"
          {...restImageProps}
        />
        <Input {...inputProps} />
      </div>
    );
  }
);
InputIcon.displayName = "InputIcon";

export { InputIcon };
