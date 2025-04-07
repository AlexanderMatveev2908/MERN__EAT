/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import { ImageUploadedType } from "../../../types/types";
import { FC } from "react";
import StarsCheck from "./StarsCheck";
import FormFieldNoIcon from "../inputFields/FormFieldNoIcon";
import { fieldReviewTitle } from "../../../core/config/fieldsArr/allFields/reviewsFields";
import CommentForm from "./CommentForm";

export type AddPutReview = {
  title: string;
  text: string;
  rating: number;
  images: File[] | ImageUploadedType[];
};

type PropsType = {
  formContext: UseFormReturn<AddPutReview>;
};

const MyReviewsForm: FC<PropsType> = ({ formContext }) => {
  const {
    register,
    formState: { errors },
  } = formContext;

  return (
    <div className="w-full grid mt-10 gap-6">
      <StarsCheck {...{ formContext }} />

      <div className="w-full grid gap-3 md:max-w-1/2">
        <span className="txt__03">Title of review</span>
        <FormFieldNoIcon {...{ register, errors, field: fieldReviewTitle }} />
      </div>

      <CommentForm {...{ formContext }} />
    </div>
  );
};
export default MyReviewsForm;
