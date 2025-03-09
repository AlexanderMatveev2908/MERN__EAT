/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useSwapperForm } from "./hooks/useSwapperForm";
import ButtonsForm from "./components/ButtonsForm/ButtonsForm";
import SwapperContent from "./components/SwapperContent/SwapperContent";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormRegister<any>;
};

const SwapperForm: FC<PropsType> = ({ register, errors, watch }) => {
  const { buttonsProps, currForm } = useSwapperForm({ watch });

  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03">Restaurant Address</span>

      <div className="w-full grid grid-cols-1 border-[3px] rounded-xl border-orange-500 lg:border-0 lg:p-0 p-5 pb-10 gap-y-8">
        <SwapperContent {...{ currForm, register, errors }} />

        <ButtonsForm {...{ ...buttonsProps, currForm }} />
      </div>
    </div>
  );
};
export default SwapperForm;
