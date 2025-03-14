/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

type PropsType = {
  register: UseFormRegister<any>;
};

const SearchField: FC<PropsType> = ({ register }) => {
  const location = useLocation();
  const target = location.pathname.includes("my-restaurants")
    ? "your restaurant"
    : "";

  return (
    <label className="w-full grid grid-cols-1 justify-items-start gap-2 relative">
      <input
        type="text"
        placeholder={`Tell us about ${target} 🧐`}
        className="focus__base el__flow outline-none border-2 border-orange-500 rounded-full w-full px-5 pr-14 py-2 txt__01"
        {...register("search")}
      />
      <FaSearch className="absolute top-1/2 -translate-y-1/2 right-[20px] w-[25px] h-[25px] text-orange-500 pointer-events-none" />
    </label>
  );
};
export default SearchField;
