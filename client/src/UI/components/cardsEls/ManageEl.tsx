import { FC } from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

type PropsType = {
  el: {
    icon: IconType;
    label: string;
    val: string | number;
  };
};

const ManageEl: FC<PropsType> = ({ el }) => {
  return (
    <Link
      to="/"
      className="w-[90%] justify-self-center grid grid-cols-[30px_1fr_1fr] gap-5 items-end px-3 border-2 rounded-xl border-orange-500 cursor-pointer el__flow group hover:scale-110 py-1"
    >
      <el.icon className="min-w-[30px] min-h-[30px] el__flow group-hover:text-orange-500" />
      <span className="txt__01 el__flow group-hover:text-orange-500">
        {el.label}
      </span>

      <div className="w-full flex items-end justify-end pr-3">
        <span className="txt__02 el__flow group-hover:text-orange-500 ">
          {el.val}
        </span>
      </div>
      {/* 
      <Link
        to="/"
        className="txt__02 justify-self-end el__flow cursor-pointer hover:text-orange-500 hover:scale-110 border-2 rounded-xl py-1 border-orange-500 w-full max-w-[120px] text-center"
      >
        View
      </Link> */}
    </Link>
  );
};
export default ManageEl;
