/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useUpdateRestaurant } from "./useUpdateRestaurant";
import { FormProvider } from "react-hook-form";
import MyRestaurantsForm from "../../../UI/forms/MyRestaurants/MyRestaurantsForm";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import DeleteButton from "../../../UI/components/buttons/DeleteButton";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import { ErrFoodApp } from "../../../types/allTypes/API";

const UpdateRestaurant: FC = () => {
  useScrollTop();

  const {
    formContext,
    canStay,
    isPendingInfo,
    handleSave,
    isPendingUpdate,
    handleClickToOpenPopup,
    isSuccessInfo,
    errorInfo,
  } = useUpdateRestaurant();

  return !canStay ? (
    <Navigate to="/" replace />
  ) : isPendingInfo ? (
    <LoaderPageReact />
  ) : isSuccessInfo ? (
    <FormProvider {...formContext}>
      <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
        <span className="txt__04">Update your restaurant</span>

        <div className="w-full flex justify-end">
          <DeleteButton
            {...{
              txt: "Delete restaurant",
              handleDelete: handleClickToOpenPopup,
            }}
          />
        </div>

        <MyRestaurantsForm
          {...({ formContext, handleSave, isPending: isPendingUpdate } as any)}
        />
      </div>
    </FormProvider>
  ) : (
    <ErrEmoji {...{ err: errorInfo as ErrFoodApp }} />
  );
};
export default UpdateRestaurant;
