import { delUserImage } from "@/app/actions/picturesActions";
import { DeleteIcon } from "@/lib/icons/DeleteIcon";
import { Spinner } from "@/lib/icons/Spinner";
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
  image: imageSigned;
  selectedImage?: imageSigned;
  setSelectedImage: (value?: imageSigned) => void;
  handleUpdateImageList?: (value: string) => void;
}

const ImageSquare: React.FC<ImageProps> = ({
  image,
  selectedImage,
  setSelectedImage,
  handleUpdateImageList,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleRemoveImage = async () => {
    try {
      setIsLoading(true);
      if (image?.id && image?.path) {
        const data = await delUserImage(image?.id, image?.path);

        if (data && handleUpdateImageList) {
          if (image.id === selectedImage?.id) {
            setSelectedImage();
          }

          handleUpdateImageList(image?.id);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error handleRemoveImage: ", error);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={`group relative  ${
        image?.id === selectedImage?.id
          ? ` border-4 border-primary `
          : "border-4 border-transparent "
      }  shadow-login cursor-pointer flex justify-center align-middle text-center items-center rounded-lg min-w-[124px] w-full h-full max-w-[124px] text-secondary max-h-[124px] overflow-hidden  hover:text-primary hover:border-primary  `}
    >
      {isLoading && (
        <div className="animate-spin absolute  p-5">
          <Spinner color="var(--primary)" />
        </div>
      )}
      <Image
        src={image?.signedUrl}
        alt={image?.path + ""}
        width={124}
        height={124}
        priority={true}
        onLoad={handleLoadingComplete}
        className=" object-full w-full h-full"
        onClick={() => {
          if (setSelectedImage && image) {
            setSelectedImage(image);
          }
        }}
      />
      <div
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white border-2 border-black p-2 hover:border-primary rounded-lg"
        onClick={handleRemoveImage}
      >
        {isLoading ? (
          <div className="animate-spin">
            <Spinner color="var(--primary)" />
          </div>
        ) : (
          <DeleteIcon />
        )}
      </div>
    </div>
  );
};

export default ImageSquare;
