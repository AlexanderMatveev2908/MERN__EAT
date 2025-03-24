import { FormProvider } from "react-hook-form";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import { useAddDish } from "./useAddDish";
import MyDishesForm from "../../../UI/forms/MyDishes/MyDishesForm";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { ReturnIdsAPI } from "../../../core/api/APICalls/myDishes";

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
  } = useAddDish();

  return isPendingIds ? (
    <LoaderPageReact />
  ) : (
    <div className="w-full grid grid-cols-1 gap-5 justify-items-center">
      <span className="txt__04">Add Dish</span>
      {isSuccessIds ? (
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
      ) : (
        <ErrEmoji {...{ err: errorIds as ErrFoodApp }} />
      )}
    </div>
  );
};
export default AddDish;
