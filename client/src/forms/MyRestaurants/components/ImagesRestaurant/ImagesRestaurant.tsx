import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaImages } from "react-icons/fa";
import { MyRestaurantsAddUpdateFormType } from "./../../../../types/myRestaurants";
import ShowImgToUpload from "../../../../components/inputFields/UploadImg/ShowImgToUpload/ShowImgToUpload";
import CustomInputImgs from "../../../../components/inputFields/UploadImg/CustomInputImgs";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};
const ImagesRestaurant: FC<PropsType> = ({ formContext }) => {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
    setValue,
    // control,
  } = formContext;

  // const { fields, remove } = useFieldArray({ control, name: "images" });

  const images = watch("images");

  return (
    <div className="w-full flex flex-col gap-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <FaImages className="h-[35px] w-[35px]" />
        Restaurant images
      </span>

      <div
        className={`w-full flex flex-row overflow-x-auto snap-x snap-mandatory gap-5 sm:gap-10 hide_scrollbar border-[3px] rounded-xl el__flow ${
          watch("images")?.length
            ? "max-h-[500px] p-5 sm:p-8 border-orange-500 "
            : "max-h-0 border-transparent"
        }`}
      >
        {!!images?.length &&
          [...images].map((_, i) => (
            <ShowImgToUpload
              key={i}
              {...{
                img: images[i],
                trigger,
                images,
                setValue,
                // remove: () => remove(i),
              }}
            />
          ))}
      </div>
      <CustomInputImgs {...{ register, watch }} />

      {errors?.images && (
        <span className="txt__01 text-red-600">{errors.images.message}</span>
      )}
    </div>
  );
};
export default ImagesRestaurant;
