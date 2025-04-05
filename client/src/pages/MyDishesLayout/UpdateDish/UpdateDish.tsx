import { FC } from "react";
import { useUpdateDish } from "./useUpdateDish";
import { FormProvider } from "react-hook-form";
import MyDishesForm from "../../../UI/forms/MyDishes/MyDishesForm";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import { Navigate } from "react-router-dom";
import DeleteButton from "../../../UI/components/buttons/DeleteButton";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { ReturnIdsAPI } from "../../../core/api/APICalls/myDishes";
import { msgHelpersFrontBack } from "../../../core/hooks/useHandleErr";

const UpdateDish: FC = () => {
  useScrollTop();

  const {
    formContext,
    handleSave,
    isPendingPage,
    restInfo,
    isSuccess,
    canStay,
    handleOpenPopup,
    isPending,
    errorInfo,
  } = useUpdateDish();

  return (
    <div className="w-full grid grid-cols-1 gap-5 justify-items-center">
      <span className="txt__04">Update Dish</span>

      {isSuccess && (
        <div className="justify-self-start">
          <DeleteButton
            {...{ txt: "Delete Dish", handleDelete: handleOpenPopup }}
          />
        </div>
      )}

      {!canStay ? (
        <Navigate to="/" replace />
      ) : isPendingPage ||
        msgHelpersFrontBack.includes(
          (errorInfo as ErrFoodApp)?.response?.data?.msg ?? ""
        ) ? (
        <LoaderPageReact />
      ) : isSuccess ? (
        <FormProvider {...formContext}>
          <MyDishesForm
            {...{
              formContext,
              handleSave,
              restInfo: restInfo as ReturnIdsAPI[],
              isPending,
            }}
          />
        </FormProvider>
      ) : (
        <ErrEmoji
          {...{
            err: errorInfo as ErrFoodApp,
          }}
        />
      )}
    </div>
  );
};
export default UpdateDish;
