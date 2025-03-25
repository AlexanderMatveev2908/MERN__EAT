import { FC } from "react";
import SummaryItem from "./components/SummaryItem";
import ButtonAnimated from "../../../../UI/components/buttons/ButtonAnimated";
import DeleteButton from "../../../../UI/components/buttons/DeleteButton";
import ShowCalcCart from "./components/ShowCalcCart";
import FormFieldNoIcon from "../../../../UI/forms/inputFields/FormFieldNoIcon";
import { fieldCoupon } from "../../../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { useForm } from "react-hook-form";

const Summary: FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<{ coupon: string }>({
    mode: "onChange",
  });

  return (
    <div className="w-full grid grid-cols-1 gap-4 border-[3px] border-orange-500 rounded-xl px-5 py-3 pb-6 mb-6">
      <span className="txt__03 justify-self-center">Your Order</span>

      <ul className="w-full grid gap-3">
        <SummaryItem />
        <SummaryItem />
      </ul>

      <ShowCalcCart />

      <form className="w-full grid gap-6">
        <FormFieldNoIcon {...{ field: fieldCoupon, register, errors }} />

        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-0 sm:grid-cols-2 items-center">
          <div className="w-[200px] justify-self-center flex ic">
            <ButtonAnimated {...{ label: "Checkout", type: "button" }} />
          </div>

          <div className="w-[200px] justify-self-center">
            <DeleteButton
              {...{ txt: "Clear", handleDelete: () => console.log("to do") }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Summary;
