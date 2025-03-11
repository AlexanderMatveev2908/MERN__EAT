/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useAddRestaurant } from "./useAddRestaurant";
import { FormProvider } from "react-hook-form";
import MyRestaurantsForm from "../../../forms/MyRestaurants/MyRestaurantsForm";

const AddRestaurant: FC = () => {
  const { formContext, handleSave } = useAddRestaurant();

  return (
    <FormProvider {...formContext}>
      <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
        <span className="txt__04">Create new restaurant</span>

        <MyRestaurantsForm {...({ formContext, handleSave } as any)} />
      </div>
    </FormProvider>
  );
};
export default AddRestaurant;
