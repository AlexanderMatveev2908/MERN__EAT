import { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";
import { REG_MONGO } from "../../../core/config/constants/regex";
import {
  getReviewAPI,
  updateReview,
} from "../../../core/api/APICalls/myReviews";
import { useQueryCustom } from "../../../core/hooks/useQueryCustom";
import { isObjOk } from "../../../utils/allUtils/validateData";
import AverageStars from "../../../UI/components/AverageStars";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { FormProvider, useForm } from "react-hook-form";
import MyReviewsForm, {
  AddPutReview,
} from "../../../UI/forms/MyReviews/MyReviewsForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { prepareFormDataMyReviews } from "../../../utils/allUtils/prepareFormData";

const UpdateReview: FC = () => {
  const revId = useParams()?.revId;
  const canStay = REG_MONGO.test(revId ?? "");

  const formContext = useForm<AddPutReview>({
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const cbSuccess = useCallback(
    (data) => {
      const { setValue } = formContext;

      setValue("title", data.review.title);
      setValue("comment", data.review.comment);
      setValue("rating", data.review.rating);
      setValue("images", data.review.images);
    },
    [formContext]
  );

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      updateReview({ revId: revId as string, formData }),
    onSuccess: () => {
      showToastMsg("Review updated", "SUCCESS");
      setTimeout(() => {
        window.scroll({ top: 0, behavior: "smooth" });
      }, 250);
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => queryClient.removeQueries({ queryKey: ["infoRev"] }),
  });

  const handleSave = formContext.handleSubmit((formDataHook) => {
    const { formData } = prepareFormDataMyReviews(formDataHook);
    mutate(formData);
  });

  useScrollTop();
  const { isPendingRev, isErrorRev, errorRev, dataRev } = useQueryCustom({
    cbAPI: () => getReviewAPI(revId ?? ""),
    enabled: canStay,
    alias: "rev",
    key: "infoRev",
    cbSuccess,
  });

  const { review } = dataRev ?? {};

  return (
    <ParentContentLoading
      {...{
        canStay,
        isPending: isPendingRev,
        isError: isErrorRev,
        error: errorRev,
      }}
    >
      {isObjOk(review) && (
        <div className="w-full grid gap-8 justify-items-center">
          <span className="txt__04">{review.restaurant.name}</span>

          <AverageStars {...{ rest: review.restaurant }} />

          <FormProvider {...formContext}>
            <MyReviewsForm {...{ formContext, handleSave, isPending }} />
          </FormProvider>
        </div>
      )}
    </ParentContentLoading>
  );
};
export default UpdateReview;
