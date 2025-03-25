import { FC } from "react";
import SummaryItem from "./components/SummaryItem";
import ButtonAnimated from "../../../../UI/components/buttons/ButtonAnimated";
import DeleteButton from "../../../../UI/components/buttons/DeleteButton";
import ShowCalcCart from "./components/SHowCalcCart";

const Summary: FC = () => {
  return (
    <div className="w-full grid grid-cols-1 gap-4 border-[3px] border-orange-500 rounded-xl px-5 py-3 mb-10">
      <span className="txt__03 justify-self-center">Your Order</span>

      <ul className="w-full grid gap-3">
        <SummaryItem />
        <SummaryItem />
      </ul>

      <ShowCalcCart />

      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-0 sm:grid-cols-2 items-center">
        <div className="w-[175px] justify-self-center flex ic">
          <ButtonAnimated {...{ label: "Checkout", type: "button" }} />
        </div>

        <div className="w-[175px] justify-self-center">
          <DeleteButton
            {...{ txt: "Clear", handleDelete: () => console.log("to do") }}
          />
        </div>
      </div>
    </div>
  );
};
export default Summary;
