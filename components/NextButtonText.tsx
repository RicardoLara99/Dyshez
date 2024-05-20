import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface NextButtonTextProps {
  actionButton: (...args: any[]) => any;
  textButton: string;
  paragh: string;
  redirect?: {
    text: string;
    url: string;
    action?: () => void;
  };
}

export const NextButtonText: React.FC<NextButtonTextProps> = ({
  actionButton,
  textButton,
  paragh,
  redirect,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-sm text-center gap-4 text-secondary mt-6">
      <Button className="rounded-full gap-2" formAction={actionButton}>
        {textButton}
        <Image
          src="/icons/Arrow-Right.svg"
          alt="arrow"
          width={15}
          height={13}
        />
      </Button>
      <p>
        {paragh}{" "}
        {redirect && (
          <a
            className="text-primary cursor-pointer"
            href={redirect.url}
            onClick={redirect.action ? redirect.action : () => {}}
          >
            {redirect.text}
          </a>
        )}
      </p>
    </div>
  );
};
