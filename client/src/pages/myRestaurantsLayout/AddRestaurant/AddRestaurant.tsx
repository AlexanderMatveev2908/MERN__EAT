import { FC } from "react";
import { useAddRestaurant } from "./hooks/useAddRestaurant";
import { FormProvider } from "react-hook-form";
import MyRestaurantsForm from "../../../forms/MyRestaurants/MyRestaurantsForm";

const AddRestaurant: FC = () => {
  const { formContext } = useAddRestaurant();

  return (
    <FormProvider {...formContext}>
      <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
        <span className="txt__04">Create new restaurant</span>

        <MyRestaurantsForm {...{ formContext }} />
      </div>
    </FormProvider>
  );
};
export default AddRestaurant;
