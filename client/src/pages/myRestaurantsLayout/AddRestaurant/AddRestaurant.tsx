import { FC } from "react";
import FormFieldNoIcon from "./../../../components/commonCompForms/FormFieldNoIcon/FormFieldNoIcon";
import { myRestaurantsName } from "../../../config/fieldsArr/myRestaurantsFields";
import { useAddRestaurant } from "./hooks/useAddRestaurant";
import SwapperForm from "./components/SwapperForm/SwapperForm";

const AddRestaurant: FC = () => {
  const { register, errors, watch } = useAddRestaurant();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
      <span className="txt__04">Create new restaurant</span>

      <form className="w-full grid grid-cols-1 justify-items-center gap-y-5">
        <FormFieldNoIcon {...{ field: myRestaurantsName, register, errors }} />

        <SwapperForm {...{ register, errors, watch }} />
      </form>
    </div>
  );
};
export default AddRestaurant;
