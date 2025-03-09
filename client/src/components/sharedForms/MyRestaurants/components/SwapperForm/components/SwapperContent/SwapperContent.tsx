import { FC } from "react";
import FormFieldNoIcon from "../../../../../../../components/commonCompForms/FormFieldNoIcon/FormFieldNoIcon";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddRestaurantFormType } from "../../../../../../../types/myRestaurants";
import {
  myRestaurantsAddress_0,
  myRestaurantsAddress_1,
} from "../../../../../../../config/fieldsArr/myRestaurantsFields";

type PropsType = {
  currForm: number;
  register: UseFormRegister<AddRestaurantFormType>;
  errors: FieldErrors;
};

const SwapperContent: FC<PropsType> = ({ currForm, register, errors }) => {
  return (
    <div className="overflow-hidden">
      <div
        className="w-[200%] flex transition-all duration-500 justify-items-start items-start h-fit lg:grid lg:grid-cols-2 lg:w-full lg:gap-10"
        style={{
          transform: `translateX(-${currForm * 50}%)`,
          maxHeight: currForm === 0 ? "600px" : "275px",
        }}
      >
        <div className="w-full flex gap-y-5 flex-col max-h-fit sm:px-5 lg:p-0">
          {myRestaurantsAddress_0.map((el) => (
            <FormFieldNoIcon key={el.id} {...{ register, errors, field: el }} />
          ))}
        </div>

        <div className="w-full flex gap-y-5 flex-col max-h-fit sm:px-5 lg:p-0">
          {myRestaurantsAddress_1.map((el) => (
            <FormFieldNoIcon key={el.id} {...{ register, errors, field: el }} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SwapperContent;
