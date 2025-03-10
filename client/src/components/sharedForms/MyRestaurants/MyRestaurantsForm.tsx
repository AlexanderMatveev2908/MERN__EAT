import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import FormFieldNoIcon from "../../commonCompForms/FormFieldNoIcon/FormFieldNoIcon";
import SwapperForm from "./components/SwapperForm/SwapperForm";
import { MyRestaurantsAddUpdateFormType } from "../../../types/myRestaurants";
import { myRestaurantsName } from "../../../config/fieldsArr/myRestaurantsFields";
import ContactForm from "./components/ContactForm/ContactForm";
import OpenHours from "./components/OpenHours/OpenHours";
import { MdDriveFileRenameOutline } from "react-icons/md";
import CatForm from "./components/CatForm/CatForm";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};

const MyRestaurantsForm: FC<PropsType> = ({ formContext }) => {
  const {
    register,
    formState: { errors },
  } = formContext;
  return (
    <form className="w-full grid grid-cols-1 justify-items-center gap-y-10">
      <div className="w-full justify-self-start grid lg:grid-cols-2 gap-y-3 gap-x-10">
        <span className="txt__03 el__sub_title_my_restaurants_form">
          <MdDriveFileRenameOutline className="h-[35px] w-[35px]" />
          Restaurant name
        </span>
        <FormFieldNoIcon {...{ field: myRestaurantsName, register, errors }} />
      </div>

      <SwapperForm {...{ formContext }} />

      <ContactForm {...{ formContext }} />

      <OpenHours {...{ formContext }} />

      <CatForm {...{ formContext }} />
    </form>
  );
};
export default MyRestaurantsForm;
