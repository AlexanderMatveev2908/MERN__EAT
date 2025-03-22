import { FC } from "react";
import { useAddRestaurant } from "./useAddRestaurant";
import { FormProvider } from "react-hook-form";
import MyRestaurantsForm from "../../../UI/forms/MyRestaurants/MyRestaurantsForm";
import { useScrollTop } from "../../../core/hooks/useScrollTop";

const AddRestaurant: FC = () => {
  useScrollTop();

  const { formContext, handleSave, isPending } = useAddRestaurant();

  return (
    <FormProvider {...formContext}>
      <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
        <span className="txt__04">Create new restaurant</span>

        <MyRestaurantsForm {...{ formContext, handleSave, isPending }} />
      </div>
    </FormProvider>
  );
};
export default AddRestaurant;
