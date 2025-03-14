/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useUpdateRestaurant } from "./useUpdateRestaurant";
import { FormProvider } from "react-hook-form";
import MyRestaurantsForm from "../../../forms/MyRestaurants/MyRestaurantsForm";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../components/loaders/LoaderPageReact/LoaderPageReact";

const UpdateRestaurant: FC = () => {
  const { formContext, canStay, isPendingInfo, handleSave, isPendingUpdate } =
    useUpdateRestaurant();

  return !canStay ? (
    <Navigate to="/" replace />
  ) : isPendingInfo ? (
    <LoaderPageReact />
  ) : (
    <FormProvider {...formContext}>
      <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
        <span className="txt__04">Update your restaurant</span>

        <MyRestaurantsForm
          {...({ formContext, handleSave, isPending: isPendingUpdate } as any)}
        />
      </div>
    </FormProvider>
  );
};
export default UpdateRestaurant;
