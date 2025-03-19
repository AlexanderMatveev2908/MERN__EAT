import { FormProvider } from "react-hook-form";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import { useAddDish } from "./useAddDish";
import MyDishesForm from "../../../UI/forms/MyDishes/MyDishesForm";
import ErrEmoji from "../../../UI/components/ErrEmoji";

const AddDish = () => {
  const {
    isPendingIds,
    formContextMyDishesAddItem: formContext,
    dataIds,
    isSuccessIds,
    handleSave,
    isPending,
  } = useAddDish();

  console.log(formContext.watch());

  return isPendingIds ? (
    <LoaderPageReact />
  ) : (
    <div className="w-full grid grid-cols-1 gap-5 justify-items-center">
      <span className="txt__04">Add Dish</span>
      {isSuccessIds && dataIds?.infoRestaurants?.length ? (
        <FormProvider {...formContext}>
          <MyDishesForm
            {...{
              formContext,
              restInfo: dataIds.infoRestaurants,
              handleSave,
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
export default AddDish;
