import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../../types/myRestaurants";
import {
  myRestaurantsAddress_0,
  myRestaurantsAddress_1,
} from "../../../../../config/fieldsArr/MyRestaurants/makeUpdate";
import FormFieldNoIcon from "../../../../../components/InputFields/FormFieldNoIcon";

type PropsType = {
  currForm: number;
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};

const SwapperContent: FC<PropsType> = ({ currForm, formContext }) => {
  const {
    register,
    formState: { errors },
  } = formContext;
  return (
    <div className="overflow-hidden py-5">
      <div
        className="w-[200%] flex transition-all duration-500 justify-items-start items-start h-fit lg:grid lg:grid-cols-2 lg:w-full lg:gap-10"
        style={{
          transform: `translateX(-${currForm * 50}%)`,
          maxHeight: currForm === 0 ? "600px" : "275px",
        }}
      >
        <div className="w-full flex gap-y-5 flex-col max-h-fit px-2 sm:px-5 lg:p-0">
          {myRestaurantsAddress_0.map((el) => (
            <FormFieldNoIcon key={el.id} {...{ register, errors, field: el }} />
          ))}
        </div>

        <div className="w-full flex gap-y-5 flex-col max-h-fit px-2 sm:px-5 lg:p-0">
          {myRestaurantsAddress_1.map((el) => (
            <FormFieldNoIcon key={el.id} {...{ register, errors, field: el }} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SwapperContent;
