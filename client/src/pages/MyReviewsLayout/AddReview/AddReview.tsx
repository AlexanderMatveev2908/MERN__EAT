import { FC, useCallback } from "react";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { useNavigate, useParams } from "react-router-dom";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useQueryCustom } from "../../../core/hooks/useQueryCustom";
import {
  createReviewAPI,
  getRestInfoAPI,
} from "../../../core/api/APICalls/myReviews";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";
import { isObjOk } from "../../../utils/allUtils/validateData";
import AverageStars from "../../../UI/components/AverageStars";
import { FormProvider, useForm } from "react-hook-form";
import MyReviewsForm, {
  AddPutReview,
} from "../../../UI/forms/MyReviews/MyReviewsForm";
import { prepareFormDataMyReviews } from "../../../utils/allUtils/prepareFormData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { ErrFoodApp } from "../../../types/allTypes/API";
import SpinnerBtnReact from "../../../UI/components/loaders/SpinnerBtnReact/SpinnerBtnReact";

const AddReview: FC = () => {
  const restId = useParams()?.restId;
  const navigate = useNavigate();
  const canStay = REG_MONGO.test(restId ?? "");

  const queryClient = useQueryClient();

  useScrollTop();
  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  // eslint-disable-next-line
  const cbSuccess = useCallback((_) => {}, []);

  const { isPendingRest, isErrorRest, errorRest, dataRest } = useQueryCustom({
    cbAPI: () => getRestInfoAPI(restId ?? ""),
    enabled: canStay,
    alias: "rest",
    key: "restInfoRev",
    cbSuccess,
  });

  const { restaurant: rest } = dataRest ?? {};

  const formContext = useForm<AddPutReview>({
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      createReviewAPI({ restId: restId ?? "", formData }),
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["restInfoRev"] });
      showToastMsg("Review created", "SUCCESS");
      navigate(`/my-reviews/put/${data.revId}`);
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
  });

  const handleSave = formContext.handleSubmit((formDataHook) => {
    const { formData } = prepareFormDataMyReviews(formDataHook);

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    mutate(formData);
  });

  return (
    <ParentContentLoading
      {...{
        isPending: false,
        isError: isErrorRest,
        error: errorRest,
        canStay,
      }}
    >
      <>
        {isPendingRest ? (
          <div className="mt-20">
            <SpinnerBtnReact />
          </div>
        ) : (
          isObjOk(rest) && (
            <div className="w-full grid gap-8 justify-items-center">
              <span className="txt__04">{rest.name}</span>

              <AverageStars {...{ rest }} />
            </div>
          )
        )}

        <FormProvider {...formContext}>
          <MyReviewsForm {...{ formContext, handleSave, isPending }} />
        </FormProvider>
      </>
    </ParentContentLoading>
  );
};
export default AddReview;
