import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSwapperForm } from "./hooks/useSwapperForm";
import ButtonsForm from "./components/ButtonsForm/ButtonsForm";
import SwapperContent from "./components/SwapperContent/SwapperContent";
import { MyRestaurantsAddUpdateFormType } from "./../../../../types/myRestaurants";
import { BiWorld } from "react-icons/bi";
import { totLenAddressMyRestaurants } from "./../../../../config/fieldsArr/myRestaurantsFields";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};

const SwapperForm: FC<PropsType> = ({ formContext }) => {
  const { buttonsProps, currForm } = useSwapperForm({
    watch: formContext.watch,
  });

  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <BiWorld className="w-[35px] h-[35px]" />
        Restaurant Address
      </span>

      <div className="w-full grid grid-cols-1 border-[3px] rounded-xl border-orange-500 lg:border-0 lg:p-0 p-5 pb-10 gap-y-8">
        <SwapperContent {...{ currForm, formContext }} />

        <ButtonsForm
          {...{ ...buttonsProps, currForm, totLen: totLenAddressMyRestaurants }}
        />
      </div>
    </div>
  );
};
export default SwapperForm;
