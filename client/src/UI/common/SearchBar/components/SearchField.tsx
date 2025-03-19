/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { REG_SEARCH } from "../../../../core/config/constants/regex";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

const SearchField: FC<PropsType> = ({ register, errors }) => {
  const location = useLocation();
  const target = location.pathname.includes("my-restaurants")
    ? "restaurant"
    : location.pathname.includes("my-dishes")
    ? "dish"
    : "";

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="w-full grid grid-cols-1 justify-items-start gap-2 relative">
        <input
          type="text"
          placeholder={`Search a ${target} ...`}
          className="focus__base el__flow outline-none border-2 border-orange-500 rounded-full w-full px-5 pr-14 py-2 txt__01"
          {...register("search", {
            pattern: {
              value: REG_SEARCH,
              message: "Invalid search length or chars 🥸",
            },
          })}
        />
        <FaSearch className="absolute top-1/2 -translate-y-1/2 right-[20px] w-[25px] h-[25px] text-orange-500 pointer-events-none" />
      </label>

      {errors?.search && (
        <span className="txt__01 text-red-600">
          {errors?.search?.message as string}
        </span>
      )}
    </div>
  );
};
export default SearchField;
