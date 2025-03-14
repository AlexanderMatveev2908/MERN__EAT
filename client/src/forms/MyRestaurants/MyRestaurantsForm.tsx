/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "./../../types/myRestaurants";
import ContactForm from "./components/ContactForm/ContactForm";
import OpenHours from "./components/OpenHours/OpenHours";
import CatForm from "./components/CatForm/CatForm";
import NameRestaurant from "./components/NameRestaurant/NameRestaurant";
import ImagesRestaurant from "./components/ImagesRestaurant/ImagesRestaurant";
import Delivery from "./components/Delivery/Delivery";
import ButtonAnimated from "../../components/buttons/ButtonAnimated";
import AddressForm from "./components/AddressForm/AddressForm";
import { useLocation } from "react-router-dom";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
  handleSave: (data: MyRestaurantsAddUpdateFormType) => void;
  isPending: boolean;
};

export type PropsTypeFormContextRestaurants = {
  formContext: PropsType["formContext"];
};

const MyRestaurantsForm: FC<PropsType> = ({
  formContext,
  handleSave,
  isPending,
}) => {
  const location = useLocation();

  return (
    <form
      onSubmit={handleSave as any}
      className="w-full grid grid-cols-1 justify-items-center gap-y-10"
    >
      <NameRestaurant {...{ formContext }} />

      <ImagesRestaurant {...{ formContext }} />

      <AddressForm {...{ formContext }} />

      <ContactForm {...{ formContext }} />

      <OpenHours {...{ formContext }} />

      <CatForm {...{ formContext }} />

      <Delivery {...{ formContext }} />

      <div className="max-w-[300px] justify-center mt-10">
        <ButtonAnimated
          {...{
            label: `${
              location.pathname.includes("update") ? "Update" : "Create"
            } Restaurant`,
            type: "submit",
            styleTxt: "txt__02",
            isPending,
          }}
        />
      </div>
    </form>
  );
};
export default MyRestaurantsForm;
