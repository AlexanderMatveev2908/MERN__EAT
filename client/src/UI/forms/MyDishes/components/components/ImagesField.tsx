import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaImages } from "react-icons/fa";
import { DishMenuFormType } from "../../../../../types/types";
import ShowImgToUpload from "../../../inputFields/UploadImg/ShowImgToUpload/ShowImgToUpload";
import CustomInputImgs from "./../../../inputFields/UploadImg/CustomInputImgs";

type PropsType = {
  formContext: UseFormReturn<DishMenuFormType>;
  indexForm: number;
};

const ImagesField: FC<PropsType> = ({ formContext, indexForm }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formContext;

  const images = watch(`items.${indexForm}.images`);

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <FaImages className="h-[35px] w-[35px]" />
        Dish images
      </span>

      <div
        className={`w-full flex flex-row overflow-x-auto border-[3px] snap-x snap-mandatory gap-5 sm:gap-10 hide_scrollbar rounded-xl el__flow ${
          watch(`items.${indexForm}.images`)?.length
            ? "max-h-[500px] p-3 sm:p-6 border-orange-500 mb-2"
            : "max-h-0 border-transparent p-0"
        }`}
      >
        {!!images?.length &&
          [...images].map((_, i) => (
            <ShowImgToUpload
              key={i}
              {...{
                img: images[i],
                images,
                setValue,
                indexForm,
              }}
            />
          ))}
      </div>

      <CustomInputImgs {...{ register, watch, indexForm }} />

      {errors?.items?.[indexForm]?.images && (
        <span className="txt__01 text-red-600">
          {errors?.items?.[indexForm].images.message}
        </span>
      )}
    </div>
  );
};
export default ImagesField;
