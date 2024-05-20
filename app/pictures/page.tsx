"use client";
import React, { useEffect, useState } from "react";
import ImageSquare from "../../components/pictures/Image";
import { getUserImagesSrc } from "@/app/actions/picturesActions";
import { Spinner } from "@/lib/icons/Spinner";
import ImageUploader from "../../components/pictures/ImageUpload";
import ImagePreview from "../../components/pictures/ImagePreview";

interface imageSigned {
  error: string | null;
  path: string | null;
  signedURL?: string;
  signedUrl: string;
  id: string;
}
export default function Index() {
  const [imageList, setImageList] = useState<imageSigned[]>([]);
  const [selectedImage, setSelectedImage] = useState<imageSigned>();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const handleUpdateImageList = (idRemoved?: string) => {
    if (idRemoved) {
      setImageList(imageList.filter(({ id }) => id != idRemoved));
    } else {
      setReload(!reload);
    }
  };

  useEffect(() => {
    const getImageList = async () => {
      try {
        setIsLoading(true);
        const data = await getUserImagesSrc();
        if (data && data?.length) {
          console.log('Data images: ',data)
          setImageList(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("#Error getImageList: ", error);
      }
    };
    getImageList();
  }, [reload]);

  return (
    <main className="flex flex-row shadow-login min-h-full w-[100%] overflow-hidden h-full">
      <div className=" pl-6 pr-0 pb-0 min-h-[100vh] w-full lg:ml-16">
        <h1 className="font-bold text-2xl text-center lg:text-left pt-5">
          Pictures
        </h1>

        <div className="flex flex-col p-4 lg:flex-row h-full min-h-full gap-4">
          <div className="flex w-full lg:w-[50%] lg:flex-wrap p-6 gap-4 content-start overflow-x-auto lg:overflow-y-auto">
            {isLoading ? (
              <>
                <div className="animate-spin absolute top-0 right-0 p-5 sm:relative sm:p-0">
                  <Spinner color="var(--primary)" />
                </div>
              </>
            ) : (
              <>
                <ImageUploader handleUpdateImageList={handleUpdateImageList} />
                {imageList.map((image, i) => (
                  <ImageSquare
                    image={image}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    key={`userImage-${i}`}
                    handleUpdateImageList={handleUpdateImageList}
                  />
                ))}
              </>
            )}
          </div>
          <div className="flex w-full lg:w-[50%] bg-secondary-foreground p-4 h-full">
            {selectedImage && <ImagePreview selectedImage={selectedImage} />}
          </div>
        </div>
      </div>
    </main>
  );
}
