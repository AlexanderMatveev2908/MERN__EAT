/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsType } from "./ShowImgToUpload";

export const useShowImgToUpload = ({
  trigger,
  setValue,
  images,
  img,
}: PropsType) => {
  const handleRemoveExistingFile = () => {
    const updatedFiles = [...images].filter((file) => {
      return file !== img;
    });

    setValue("images", updatedFiles as any);
    trigger("images");
  };

  const handleRemoveExistingImgUploaded = () => {
    const updatedImages = (images as any).filter(
      (image) => image._id !== img._id
    );

    setValue("images", updatedImages);
    trigger("images");
  };

  return {
    handleRemoveExistingFile,
    handleRemoveExistingImgUploaded,
  };
};
