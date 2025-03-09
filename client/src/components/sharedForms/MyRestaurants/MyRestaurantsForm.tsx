/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import FormFieldNoIcon from "../../commonCompForms/FormFieldNoIcon/FormFieldNoIcon";
import SwapperForm from "./components/SwapperForm/SwapperForm";
import { AddRestaurantFormType } from "../../../types/myRestaurants";
import { myRestaurantsName } from "../../../config/fieldsArr/myRestaurantsFields";
import ContactForm from "./components/ContactForm/ContactForm";

type PropsType = {
  register: UseFormRegister<AddRestaurantFormType>;
  errors: FieldErrors;
  watch: UseFormWatch<AddRestaurantFormType>;
};

const MyRestaurantsForm: FC<PropsType> = ({ register, errors, watch }) => {
  return (
    <form className="w-full grid grid-cols-1 justify-items-center gap-y-10">
      <div className="w-full justify-self-start grid lg:grid-cols-2 gap-y-3 gap-x-10">
        <span className="txt__03">Restaurant name</span>
        <FormFieldNoIcon {...{ field: myRestaurantsName, register, errors }} />
      </div>

      <SwapperForm {...{ register, errors, watch }} />

      <ContactForm {...{ register, errors }} />
    </form>
  );
};
export default MyRestaurantsForm;
