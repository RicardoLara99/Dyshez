import { uploadImages } from "@/app/actions/picturesActions";
import { Spinner } from "@/lib/icons/Spinner";
import { toBase64 } from "@/lib/utils";
import React, { useState } from "react";

interface ImageProps {
  handleUpdateImageList: () => void;
}

const ImageUploader: React.FC<ImageProps> = ({ handleUpdateImageList }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const base64Files = await Promise.all(
        newFiles.map((file) => toBase64(file))
      );
      const data = await uploadImages(base64Files);
      if (data) {
        handleUpdateImageList();
      }
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`group border border-secondary shadow-login cursor-pointer flex justify-center align-middle text-center items-center rounded-lg w-full h-full max-w-[124px] min-w-[124px] text-secondary max-h-[124px] overflow-hidden  hover:text-primary hover:border-primary  `}
    >
      {isLoading ? (
        <>
          <div className="animate-spin absolute top-0 right-0 p-5 sm:relative sm:p-0">
            <Spinner color="var(--primary)" />
          </div>
        </>
      ) : (
        <>
          <label
            className="font-secondary text-xl font-bold cursor-pointer p-2"
            htmlFor="imageUpload"
          >
            +
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleSelectImage}
          />
        </>
      )}
    </div>
  );
};

export default ImageUploader;
