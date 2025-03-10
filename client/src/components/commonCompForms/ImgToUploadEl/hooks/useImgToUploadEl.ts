/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsType } from "../ImgToUploadEl";

export const useImgToUploadEl = ({
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

  return {
    handleRemoveExistingFile,
  };
};
