/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ButtonBasic from "../../../../../components/buttons/ButtonBasic/ButtonBasic";
import {
  myRestaurantsAddress_0,
  myRestaurantsAddress_1,
} from "../../../../../config/fieldsArr/myRestaurantsFields";
import FormFieldNoIcon from "../../../../../components/commonCompForms/FormFieldNoIcon/FormFieldNoIcon";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useSwapperForm } from "./hooks/useSwapperForm";
import ButtonsForm from "./ButtonsForm/ButtonsForm";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormRegister<any>;
};

const SwapperForm: FC<PropsType> = ({ register, errors, watch }) => {
  const { buttonsProps, currForm } = useSwapperForm({ watch });

  return (
    <div className="w-full grid grid-cols-1 gap-y-3">
      <span className="txt__03">Restaurant Address</span>

      <div className="w-full grid grid-cols-1 border-[3px] rounded-xl border-orange-500 p-5 pb-10 gap-y-8 relative">
        <div className="overflow-hidden">
          <div
            className="w-[200%] flex transition-all duration-500 justify-items-start items-start h-fit"
            style={{
              transform: `translateX(-${currForm * 50}%)`,
              maxHeight: currForm === 0 ? "600px" : "275px",
            }}
          >
            <div className="w-full flex gap-y-3 flex-col max-h-fit px-5">
              {myRestaurantsAddress_0.map((el) => (
                <FormFieldNoIcon
                  key={el.id}
                  {...{ register, errors, field: el }}
                />
              ))}
            </div>

            <div className="w-full flex gap-y-3 flex-col max-h-fit px-5">
              {myRestaurantsAddress_1.map((el) => (
                <FormFieldNoIcon
                  key={el.id}
                  {...{ register, errors, field: el }}
                />
              ))}
            </div>
          </div>
        </div>
        <ButtonsForm {...{ ...buttonsProps, currForm }} />
      </div>
    </div>
  );
};
export default SwapperForm;
