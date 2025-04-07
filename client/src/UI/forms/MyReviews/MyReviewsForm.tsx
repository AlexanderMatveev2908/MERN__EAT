import { UseFormReturn } from "react-hook-form";
import { ImageUploadedType } from "../../../types/types";
import { FC } from "react";
import { FaRegStar } from "react-icons/fa";
import StarsCheck from "./StarsCheck";

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
  return (
    <div className="w-full grid mt-10">
      <StarsCheck {...{ formContext }} />
    </div>
  );
};
export default MyReviewsForm;
