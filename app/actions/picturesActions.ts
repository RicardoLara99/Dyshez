"use server";
import { createClient } from "@/utils/supabase/server";

export const uploadImages = async (files: (string | ArrayBuffer | null)[]) => {
  try {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();

    if (user) {
      for await (const base64File of files) {
        if (typeof base64File === "string") {
          const buffer = Buffer.from(base64File.split(",")[1], "base64");
          const fileName = `${user?.user?.id}/${Date.now()}.jpg`;

          const { data: dataImage, error: errorImage } = await supabase.storage
            .from("Pictures")
            .upload(fileName, buffer, {
              cacheControl: "3600",
              upsert: false,
              contentType: "image/jpeg",
            });
          if (errorImage) {
            return false;
          }

          const { error: errorUser } = await supabase.from("pictures").insert({
            picture: dataImage.path,
          });

          if (errorUser) {
            return false;
          }
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error uploadImages: ", error);
    return false;
  }
};

export const getUserImagesSrc = async () => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("pictures")
      .select("id, picture");

    if (error) {
      return false;
    }

    const { data: imagesSigneds, error: signedError } = await supabase.storage
      .from("Pictures")
      .createSignedUrls(
        data.map((image) => {
          return image.picture;
        }),
        3600
      );

    if (signedError) {
      return false;
    }

    return imagesSigneds
      .filter((image) => !image.error)
      .map((image) => {
        return {
          ...image,
          id: data.find((reg) => reg.picture === image.path)?.id,
        };
      });
  } catch (error) {
    console.error("Error getUserImagesSrc: ", error);
    return false;
  }
};

export const delUserImage = async (id: string, path: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("pictures")
      .delete()
      .eq("id", id);
    if (error) {
      return false;
    }

    const { data: dataBucket, error: errorBucket } = await supabase.storage
      .from("Pictures")
      .remove([path]);

    if (errorBucket) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error delUserImage: ", error);
    return false;
  }
};
