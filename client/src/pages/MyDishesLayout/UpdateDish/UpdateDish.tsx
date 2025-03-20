import { FC } from "react";
import { useUpdateDish } from "./useUpdateDish";
import { FormProvider } from "react-hook-form";
import MyDishesForm from "../../../UI/forms/MyDishes/MyDishesForm";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import { Navigate } from "react-router-dom";
import DeleteButton from "../../../UI/components/buttons/DeleteButton";

const UpdateDish: FC = () => {
  const {
    formContext,
    handleSave,
    isPendingPage,
    restInfo,
    isSuccessIds,
    canStay,
    handleOpenPopup,
  } = useUpdateDish();

  const isPending = false;

  return (
    <div className="w-full grid grid-cols-1 gap-5 justify-items-center">
      <span className="txt__04">Update Dish</span>

      <div className="justify-self-start">
        <DeleteButton
          {...{ txt: "Delete Dish", handleDelete: handleOpenPopup }}
        />
      </div>

      {!canStay ? (
        <Navigate to="/" replace />
      ) : isPendingPage ? (
        <LoaderPageReact />
      ) : isSuccessIds && restInfo?.length ? (
        <FormProvider {...formContext}>
          <MyDishesForm
            {...{
              formContext,
              handleSave,
              restInfo: restInfo,
              isPending,
            }}
          />
        </FormProvider>
      ) : (
        <ErrEmoji {...{ txt: "We did not any restaurant from your list 🧐" }} />
      )}
    </div>
  );
};
export default UpdateDish;
