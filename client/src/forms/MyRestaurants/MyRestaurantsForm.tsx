/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import SwapperForm from "./components/SwapperForm/SwapperForm";
import { MyRestaurantsAddUpdateFormType } from "./../../types/myRestaurants";
import ContactForm from "./components/ContactForm/ContactForm";
import OpenHours from "./components/OpenHours/OpenHours";
import CatForm from "./components/CatForm/CatForm";
import NameRestaurant from "./components/NameRestaurant/NameRestaurant";
import ImagesRestaurant from "./components/ImagesRestaurant/ImagesRestaurant";
import Delivery from "./components/Delivery/Delivery";
import ButtonAnimated from "../../components/buttons/ButtonAnimated";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
  handleSave: (data: MyRestaurantsAddUpdateFormType) => void;
};

export type PropsTypeFormContextRestaurants = {
  formContext: PropsType["formContext"];
};

const MyRestaurantsForm: FC<PropsType> = ({ formContext, handleSave }) => {
  return (
    <form
      onSubmit={handleSave as any}
      className="w-full grid grid-cols-1 justify-items-center gap-y-10"
    >
      <NameRestaurant {...{ formContext }} />

      <ImagesRestaurant {...{ formContext }} />

      <SwapperForm {...{ formContext }} />

      <ContactForm {...{ formContext }} />

      <OpenHours {...{ formContext }} />

      <CatForm {...{ formContext }} />

      <Delivery {...{ formContext }} />

      <div className="w-full max-w-[300px]">
        <ButtonAnimated
          {...{
            label: "Create Restaurant",
            type: "submit",
            styleTxt: "txt__02 relative z-10",
          }}
        />
      </div>
    </form>
  );
};
export default MyRestaurantsForm;
