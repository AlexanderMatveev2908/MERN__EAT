import { ImageUploadedType } from "../../../../../types/types";
import { PropsType } from "./ShowImgToUpload";

export const useShowImgToUpload = ({
  indexForm,
  setValue,
  images,
  img,
}: PropsType) => {
  const val =
    indexForm || indexForm === 0 ? `items.${indexForm}.images` : "images";

  const handleRemoveExistingFile = () => {
    const updatedFiles = [...images].filter((file) => {
      return file !== img;
    });

    setValue(val, updatedFiles as File[], { shouldValidate: true });
  };

  const handleRemoveExistingImgUploaded = () => {
    const updatedImages = (images as ImageUploadedType[]).filter((image) =>
      img instanceof File ? true : image.public_id !== img?.public_id
    );

    setValue(val, updatedImages, { shouldValidate: true });
  };

  return {
    handleRemoveExistingFile,
    handleRemoveExistingImgUploaded,
  };
};
