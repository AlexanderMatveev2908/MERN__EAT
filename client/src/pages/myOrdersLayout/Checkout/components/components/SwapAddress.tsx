import { FC, SetStateAction, useEffect, useState } from "react";
import {
  fieldsAddressForm_all,
  fieldsDividedByAreaCheckout,
  totLenCheckoutSwap,
} from "../../../../../core/config/fieldsArr/allFields/checkout/fieldsCheckout";
import FormFieldNoIcon from "../../../../../UI/forms/inputFields/FormFieldNoIcon";
import ButtonsSwapper from "../../../../../UI/components/ButtonsSwapper";
import { AddressFormType } from "../../useCheckout";
import { UseFormReturn } from "react-hook-form";

type PropsType = {
  formContext: UseFormReturn<AddressFormType>;
  currForm: number;
  setCurrForm: React.Dispatch<SetStateAction<number>>;
};

const SwapAddress: FC<PropsType> = ({ formContext, currForm, setCurrForm }) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const {
    register,
    formState: { errors },
    watch,
  } = formContext;

  const vals = watch();
  useEffect(() => {
    const handleSwapErr = () => {
      const currArea = fieldsDividedByAreaCheckout[currForm];

      let isValid = true;

      for (const key in vals) {
        const elInArea = currArea.find((el) => el.field === key);

        if (elInArea && !elInArea?.reg?.test(vals[key])) {
          isValid = false;
          break;
        }
      }

      setIsNextDisabled(!isValid);
      setIsPrevDisabled(!currForm);
    };

    handleSwapErr();
  }, [watch, currForm, vals]);

  const handlePrev = () => (!currForm ? null : setCurrForm((prev) => prev - 1));
  const handleNext = () =>
    currForm >= totLenCheckoutSwap || isNextDisabled
      ? null
      : setCurrForm((prev) => prev + 1);

  return (
    <div className="w-full grid gap-4" id="swapFormOrders">
      <span className="txt__03 justify-self-center">Your profile details</span>

      <div className="w-full p-6 border-[3px] border-orange-500 max-w-[600px] rounded-xl grid place-content-center gap-10">
        <div className="w-full overflow-hidden py-5">
          <div
            className="w-full grid grid-cols-3 min-w-[300%] transition-all duration-500"
            style={{
              transform: `translateX(-${
                (currForm * 100) / totLenCheckoutSwap
              }%)`,
            }}
          >
            {Object.entries(
              fieldsAddressForm_all
              //   eslint-disable-next-line
            ).map(([_, v], i) => (
              <div
                key={v.id}
                className={`w-full grid justify-items-center h-fit items-start gap-6 sm:px-3 transition-all duration-300 ${
                  i === currForm ? "opacity-100" : "opacity-0"
                }`}
              >
                {v.sudFields.map((el) => (
                  <FormFieldNoIcon
                    key={el.id}
                    {...{ register, errors, field: el }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <ButtonsSwapper
            {...{
              handleNext,
              handlePrev,
              totLen: totLenCheckoutSwap,
              hiddenLg: false,
              isNextDisabled,
              isPrevDisabled,
              currForm,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default SwapAddress;
