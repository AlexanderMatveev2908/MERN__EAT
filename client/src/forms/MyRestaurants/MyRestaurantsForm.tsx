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

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};

export type PropsTypeFormContextRestaurants = {
  formContext: PropsType["formContext"];
};

const MyRestaurantsForm: FC<PropsType> = ({ formContext }) => {
  return (
    <form className="w-full grid grid-cols-1 justify-items-center gap-y-10">
      <NameRestaurant {...{ formContext }} />

      <ImagesRestaurant {...{ formContext }} />

      <SwapperForm {...{ formContext }} />

      <ContactForm {...{ formContext }} />

      <OpenHours {...{ formContext }} />

      <CatForm {...{ formContext }} />

      <Delivery {...{ formContext }} />
    </form>
  );
};
export default MyRestaurantsForm;
