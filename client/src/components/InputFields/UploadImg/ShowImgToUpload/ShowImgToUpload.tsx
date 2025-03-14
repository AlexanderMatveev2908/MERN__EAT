/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Trash2 } from "lucide-react";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../types/restAdmin";
import { useShowImgToUpload } from "./useShowImgToUpload";

export type PropsType = {
  img: any;
  trigger: UseFormTrigger<MyRestaurantsAddUpdateFormType>;
  images: any[];
  setValue: UseFormSetValue<MyRestaurantsAddUpdateFormType>;
};

const ShowImgToUpload: FC<PropsType> = ({ img, trigger, images, setValue }) => {
  const { handleRemoveExistingFile, handleRemoveExistingImgUploaded } =
    useShowImgToUpload({
      img,
      trigger,
      images,
      setValue,
    });

  return (
    <div
      onClick={
        img instanceof File
          ? handleRemoveExistingFile
          : handleRemoveExistingImgUploaded
      }
      className="min-w-[150px] max-w-[150px] h-[150px] sm:min-w-[200px] sm:max-w-[200px] sm:h-[200px] rounded-xl snap-center relative group cursor-pointer"
    >
      {img && (
        <img
          className="w-full h-full"
          src={
            img instanceof File ? URL.createObjectURL(img as File) : img?.url
          }
          alt=""
        />
      )}
      <div className="absolute inset-0 bg-black/70 opacity-0 el__flow group-hover:opacity-100"></div>

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full flex justify-center items-center z-20 gap-4 el__flow opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100  group-hover:scale-120">
        <Trash2 className="w-[30px] h-[30px] text-red-600" />

        <span className="txt__01 text-red-600">Remove</span>
      </div>
    </div>
  );
};
export default ShowImgToUpload;
