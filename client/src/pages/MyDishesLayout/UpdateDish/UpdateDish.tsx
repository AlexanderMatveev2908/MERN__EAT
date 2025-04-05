import { FC } from "react";
import { useUpdateDish } from "./useUpdateDish";
import { FormProvider } from "react-hook-form";
import MyDishesForm from "../../../UI/forms/MyDishes/MyDishesForm";
import { ReturnIdsAPI } from "../../../core/api/APICalls/myDishes";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";
import DeleteButton from "../../../UI/components/buttons/DeleteButton";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";

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
    isPendingUpdate,
    errorInfo,
    errorIds,
    isErrorIds,
    isErrorInfo,
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

      <ParentContentLoading
        {...{
          isPending: isPendingPage,
          isError: isErrorIds || isErrorInfo,
          error: errorIds || errorInfo,
          canStay,
        }}
      >
        <FormProvider {...formContext}>
          <MyDishesForm
            {...{
              formContext,
              handleSave,
              restInfo: restInfo as ReturnIdsAPI[],
              isPending: isPendingUpdate,
            }}
          />
        </FormProvider>
      </ParentContentLoading>
    </div>
  );
};
export default UpdateDish;
