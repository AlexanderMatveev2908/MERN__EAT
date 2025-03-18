import { ImageUploadedType } from "../../../../../types/types";
import { PropsType } from "./ImgUploadMultiplesForms";

export const useImgUploadMultiplesForms = ({
  setValue,
  images,
  img,
  indexForm,
}: PropsType) => {
  const handleRemoveExistingFile = () => {
    const updatedFiles = [...images].filter((file) => {
      return file !== img;
    });

    setValue(`items.${indexForm}.images`, updatedFiles as File[], {
      shouldValidate: true,
    });
  };

  const handleRemoveExistingImgUploaded = () => {
    const updatedImages = (images as ImageUploadedType[]).filter((image) =>
      img instanceof File ? true : image.public_id !== img?.public_id
    );

    setValue(`items.${indexForm}.images`, updatedImages, {
      shouldValidate: true,
    });
  };

  return {
    handleRemoveExistingFile,
    handleRemoveExistingImgUploaded,
  };
};
