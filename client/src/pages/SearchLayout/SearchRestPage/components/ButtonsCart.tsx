import { FC } from "react";
import { DishType } from "../../../../types/types";
import { FaMinus, FaPlus } from "react-icons/fa";
import { X } from "lucide-react";

type PropsType = {
  dish: DishType;
};

const ButtonsCart: FC<PropsType> = ({ dish }) => {
  return (
    <div className="w-full grid md:grid-cols-[1fr_100px] mt-3 gap-6">
      <div className="w-full flex gap-6 items-center justify-center">
        <button className="w-fit p-2 border-2 border-green-600 rounded-xl group hover:scale-110 el__flow flex items-center justify-center cursor-pointer">
          <FaPlus className="icon__base group-hover:text-green-600 el__flow" />
        </button>

        <span className="txt__04">2</span>

        <button className="w-fit p-2 border-2 border-yellow-600 rounded-xl group hover:scale-110 el__flow flex items-center justify-center cursor-pointer">
          <FaMinus className="icon__base group-hover:text-yellow-600 el__flow" />
        </button>
      </div>
      <button className="w-fit p-2 border-2 border-red-600 rounded-xl group hover:scale-110 el__flow flex items-center justify-center cursor-pointer justify-self-end">
        <X className="icon__base group-hover:text-red-600 el__flow" />
      </button>
    </div>
  );
};
export default ButtonsCart;
