/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useUpdateRestaurant } from "./useUpdateRestaurant";
import { FormProvider } from "react-hook-form";
import MyRestaurantsForm from "../../../UI/forms/MyRestaurants/MyRestaurantsForm";
import DeleteButton from "../../../UI/components/buttons/DeleteButton";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";

const UpdateRestaurant: FC = () => {
  useScrollTop();

  const {
    formContext,
    canStay,
    isPendingInfo,
    handleSave,
    isPendingUpdate,
    handleClickToOpenPopup,
    isErrorInfo,
    errorInfo,
    currFormAddress,
    setCurrFormAddress,
  } = useUpdateRestaurant();

  return (
    <ParentContentLoading
      {...{
        isPending: isPendingInfo,
        isError: isErrorInfo,
        error: errorInfo,
        canStay,
      }}
    >
      <FormProvider {...formContext}>
        <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
          <span className="txt__04">Update your restaurant</span>

          <div className="w-fit justify-self-end">
            <DeleteButton
              {...{
                txt: "Delete restaurant",
                handleDelete: handleClickToOpenPopup,
              }}
            />
          </div>

          <MyRestaurantsForm
            {...({
              formContext,
              handleSave,
              isPending: isPendingUpdate,
              currFormAddress,
              setCurrFormAddress,
            } as any)}
          />
        </div>
      </FormProvider>
    </ParentContentLoading>
  );
};
export default UpdateRestaurant;
