import Image from "next/image";
import React, { useState } from "react";

interface imageSigned {
  error: string | null;
  path: string | null;
  signedURL?: string;
  signedUrl: string;
  id: string;
}
interface ImageProps {
  selectedImage: imageSigned;
}

const ImagePreview: React.FC<ImageProps> = ({ selectedImage }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col gap-8 align-middle justify-top items-center w-full pt-4">
      <div className=" text-center font-bold text-sm leading-4 tracking-widest">
        PREVIEW 1:1
        <div className="overflow-hidden w-[165px] h-[165px] relative rounded-lg">
          <Image
            src={selectedImage.signedUrl}
            alt="1:1"
            width={165}
            height={165}
            className="object-fill w-full h-full"
          />
        </div>
      </div>
      <div className=" text-center font-bold text-sm leading-4 tracking-widest">
        PREVIEW 16:9
        <div className="overflow-hidden w-[316px] h-[165px] relative rounded-lg">
          <Image
            src={selectedImage.signedUrl}
            alt="16:9"
            width={316}
            height={165}
            className="object-fill w-full h-full"
          />
        </div>
      </div>
      <div className=" text-center font-bold text-sm leading-4 tracking-widest">
        PREVIEW 9:16
        <div className="overflow-hidden w-[165px] h-[316px] relative rounded-lg">
          <Image
            src={selectedImage.signedUrl}
            alt="16:9"
            width={165}
            height={316}
            className="object-fill w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
