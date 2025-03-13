/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useUpdateRestaurant } from "./useUpdateRestaurant";
import { FormProvider } from "react-hook-form";
import MyRestaurantsForm from "../../../forms/MyRestaurants/MyRestaurantsForm";

const UpdateRestaurant: FC = () => {
  const { formContext } = useUpdateRestaurant();

  return (
    <FormProvider {...formContext}>
      <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
        <span className="txt__04">Create new restaurant</span>

        <MyRestaurantsForm {...({ formContext } as any)} />
      </div>
    </FormProvider>
  );
};
export default UpdateRestaurant;
