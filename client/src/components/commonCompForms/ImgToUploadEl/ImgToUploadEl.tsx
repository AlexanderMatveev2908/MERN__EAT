/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { MyRestaurantsAddUpdateFormType } from "../../../types/myRestaurants";
import { Trash2 } from "lucide-react";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { useImgToUploadEl } from "./useImgToUploadEl";
import { ImageUploadedType } from "../../../types/API";

export type PropsType = {
  img: File | ImageUploadedType;
  trigger: UseFormTrigger<MyRestaurantsAddUpdateFormType>;
  images: File[] | ImageUploadedType[];
  setValue: UseFormSetValue<MyRestaurantsAddUpdateFormType>;
};

const ImgToUploadEl: FC<PropsType> = ({ img, trigger, images, setValue }) => {
  const { handleRemoveExistingFile } = useImgToUploadEl({
    img,
    trigger,
    images,
    setValue,
  });

  return (
    <div
      onClick={handleRemoveExistingFile}
      className="min-w-[100px] max-w-[100px] sm:min-w-[200px] sm:max-w-[200px] h-[100px] sm:h-[200px] snap-center relative group cursor-pointer"
    >
      {img && (
        <img
          className="w-full h-full"
          src={URL.createObjectURL(img as File)}
          alt=""
        />
      )}
      <div className="absolute inset-0 bg-black/70 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full flex justify-center items-center z-20 gap-4 transition-all duration-300 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100  group-hover:scale-120">
        <Trash2 className="w-[30px] h-[30px] text-red-600" />

        <span className="txt__01 text-red-600">Remove</span>
      </div>
    </div>
  );
};
export default ImgToUploadEl;
