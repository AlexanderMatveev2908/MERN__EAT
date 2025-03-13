/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

type PropsType = {
  el: {
    id: string;
    label: string;
    val: number;
    icon: IconType;
  };
};

const ManageEl: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full grid grid-cols-[120px_50px_1fr] items-center py-1">
      <div className="flex w-full items-center gap-3">
        <el.icon className="min-w-[30px] min-h-[30px]" />
        <span className="txt__02">{el.label}</span>
      </div>

      <span className="txt__02 text-center">{el.val}</span>

      <Link
        to="/"
        className="txt__02 justify-self-end transition-all duration-300 cursor-pointer hover:text-orange-500 hover:scale-110 border-2 rounded-xl py-1 border-orange-500 w-[90%] text-center"
      >
        View
      </Link>
    </div>
  );
};
export default ManageEl;
