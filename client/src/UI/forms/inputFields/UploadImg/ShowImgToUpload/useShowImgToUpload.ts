import { ImageUploadedType } from "../../../../../types/types";
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

    setValue("images", updatedFiles as File[]);
    trigger("images");
  };

  const handleRemoveExistingImgUploaded = () => {
    const updatedImages = (images as ImageUploadedType[]).filter((image) =>
      img instanceof File ? true : image.public_id !== img?.public_id
    );

    setValue("images", updatedImages);
    trigger("images");
  };

  return {
    handleRemoveExistingFile,
    handleRemoveExistingImgUploaded,
  };
};
