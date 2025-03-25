import { FC } from "react";
import { DishType } from "../../../../../types/types";
import { FaMinus, FaPlus } from "react-icons/fa";
import { X } from "lucide-react";

type PropsType = {
  dish: DishType;
};

const ButtonsCart: FC<PropsType> = ({ dish }) => {
  return (
    <div className="w-full max-w-full grid grid-cols-[1fr_75px] mt-3">
      <div className="w-full flex gap-6 items-center justify-center">
        <button className="w-fit p-2 border-2 border-green-600 rounded-xl group hover:scale-120 el__flow flex items-center justify-center cursor-pointer">
          <FaPlus className="min-w-[20px] min-h-[20px] group-hover:text-green-600 el__flow" />
        </button>

        <span className="txt__03">2</span>
        {/* <MiniSpinner /> */}

        <button className="w-fit p-2 border-2 border-yellow-600 rounded-xl group hover:scale-120 el__flow flex items-center justify-center cursor-pointer">
          <FaMinus className="min-w-[20px] min-h-[20px] group-hover:text-yellow-600 el__flow" />
        </button>
      </div>
      <button className="w-fit p-2 border-2 border-red-600 rounded-xl group hover:scale-120 el__flow flex items-center justify-center cursor-pointer justify-self-end">
        <X className="min-w-[20px] min-h-[20px] group-hover:text-red-600 el__flow" />
      </button>
    </div>
  );
};
export default ButtonsCart;
