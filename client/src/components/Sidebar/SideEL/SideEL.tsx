/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { makeConditionalStyle, NonLoggedSideLink } from "../sidebarArr";

type PropsType = {
  handleSideClick: (path: string, from?: string) => void;
  type: string | null;
  location: any;
  el: NonLoggedSideLink;
};

const SideEL: FC<PropsType> = ({ handleSideClick, type, location, el }) => {
  return (
    <button
      key={el.id}
      onClick={() => handleSideClick(el.path, el?.from)}
      className={`w-full flex gap-3 group max-w-fit items-center el__after_below sideLink ${makeConditionalStyle(
        { location, el, type }
      )}`}
    >
      <el.svg className="icon__sidebar" />

      <span className="cursor-pointer txt__02 group-hover:text-orange-500 transition-all duration-300">
        {el.label}
      </span>
    </button>
  );
};
export default SideEL;
