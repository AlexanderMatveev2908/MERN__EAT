import { FC } from "react";
import SwapperContent from "./components/SwapperContent";
import { BiWorld } from "react-icons/bi";
import { totLenAddressMyRestaurants } from "../../../../config/fieldsArr/MyRestaurants/makeUpdate";
import ButtonsSwapper from "../../../../components/commonCompForms/ButtonsSwapper";
import { PropsTypeFormContextRestaurants } from "../../MyRestaurantsForm";
import { useAddressForm } from "./useAddressForm";

const AddressForm: FC<PropsTypeFormContextRestaurants> = ({ formContext }) => {
  const { buttonsProps, currForm } = useAddressForm({
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

        <ButtonsSwapper
          {...{
            ...buttonsProps,
            currForm,
            totLen: totLenAddressMyRestaurants,
            hiddenLg: true,
          }}
        />
      </div>
    </div>
  );
};
export default AddressForm;
