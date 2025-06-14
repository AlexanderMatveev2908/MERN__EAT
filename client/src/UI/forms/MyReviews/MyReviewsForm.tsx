/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import { ImageUploadedType } from "../../../types/types";
import { FC } from "react";
import StarsCheck from "./StarsCheck";
import FormFieldNoIcon from "../inputFields/FormFieldNoIcon";
import { fieldReviewTitle } from "../../../core/config/fieldsArr/allFields/reviewsFields";
import CommentForm from "./CommentForm";
import CustomInputImgs from "../inputFields/UploadImg/CustomInputImgs";
import ShowImgToUpload from "../inputFields/UploadImg/ShowImgToUpload/ShowImgToUpload";
import ButtonAnimated from "../../components/buttons/ButtonAnimated";
import { useLocation } from "react-router-dom";

export type AddPutReview = {
  title: string;
  comment: string;
  rating: number;
  images: File[] | ImageUploadedType[];
};

type PropsType = {
  formContext: UseFormReturn<AddPutReview>;
  handleSave: () => void;
  isPending: boolean;
  ratingProp?: number;
};

const MyReviewsForm: FC<PropsType> = ({
  formContext,
  isPending,
  handleSave,
  ratingProp,
}) => {
  const path = useLocation().pathname;

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = formContext;

  const images =
    watch("images")?.[0] instanceof File
      ? [...watch("images")]
      : watch("images");

  return (
    <form onSubmit={handleSave} className="w-full grid mt-10 gap-6">
      <StarsCheck {...{ formContext, ratingProp }} />

      <div className="w-full grid gap-3 md:max-w-1/2">
        <span className="txt__03">Title of review</span>
        <FormFieldNoIcon {...{ register, errors, field: fieldReviewTitle }} />
      </div>

      <CommentForm {...{ formContext }} />

      <div className="w-full grid gap-3">
        <span className="txt__03">Images (optional)</span>

        {!!images?.length && (
          <div className="w-full flex gap-5 overflow-x-scroll hide_scrollbar border-2 border-orange-500 rounded-xl p-3">
            {images.map((el, i) => (
              <ShowImgToUpload
                key={i}
                {...({ images, img: el, setValue } as any)}
              />
            ))}
          </div>
        )}

        <CustomInputImgs {...{ register, watch }} />

        {errors?.images && (
          <span className="text-red-500">{errors.images.message}</span>
        )}
      </div>

      <div className="w-[250px] justify-self-center mt-10">
        <ButtonAnimated
          {...{
            label: `${path.includes("put") ? "Update" : "Leave"} review`,
            isPending,
            type: "submit",
          }}
        />
      </div>
    </form>
  );
};
export default MyReviewsForm;
