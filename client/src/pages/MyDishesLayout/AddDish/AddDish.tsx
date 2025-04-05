import { FormProvider } from "react-hook-form";
import { useAddDish } from "./useAddDish";
import MyDishesForm from "../../../UI/forms/MyDishes/MyDishesForm";
import { ReturnIdsAPI } from "../../../core/api/APICalls/myDishes";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";

const AddDish = () => {
  useScrollTop();

  const {
    isPendingIds,
    formContext,
    restInfo,
    isSuccessIds,
    handleSave,
    isPending,
    errorIds,
    isErrorIds,
  } = useAddDish();

  return (
    <ParentContentLoading
      {...{ isPending: isPendingIds, isError: isErrorIds, error: errorIds }}
    >
      <div className="w-full grid grid-cols-1 gap-5 justify-items-center">
        <span className="txt__04">Add Dish</span>
        {isSuccessIds && (
          <FormProvider {...formContext}>
            <MyDishesForm
              {...{
                formContext,
                restInfo: restInfo as ReturnIdsAPI[],
                handleSave,
                isPending,
              }}
            />
          </FormProvider>
        )}
      </div>
    </ParentContentLoading>
  );
};
export default AddDish;
