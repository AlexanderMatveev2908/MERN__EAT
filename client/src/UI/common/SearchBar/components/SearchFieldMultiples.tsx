/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { REG_SEARCH } from "../../../../core/config/constants/regex";
import { searchRestFieldsSearch } from "../../../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { myDishesFieldsSearch } from "../../../../core/config/fieldsArr/allFields/MyDishes/filterSort";
import { myRestFieldsSearch } from "../../../../core/config/fieldsArr/fields";
import { tailwindBreak } from "../../../../core/config/constants/breakpoints";

type PropsType = {
  formContext: UseFormReturn<any>;
  i?: number;
  searchVal?: {
    searchVal: string;
    search: string;
  };
};

const SearchFieldMultiple: FC<PropsType> = ({ formContext, i, searchVal }) => {
  const path = useLocation().pathname;
  const [place, setPlace] = useState("");

  const {
    register,
    formState: { errors },
  } = formContext;

  let target;
  let arrToCheck;
  switch (path) {
    case "/search":
      target = "restaurant";
      arrToCheck = searchRestFieldsSearch;
      break;
    case "/my-restaurants":
      target = "restaurant";
      arrToCheck = myRestFieldsSearch;
      break;
    case "/my-dishes":
      target = "dish";
      arrToCheck = myDishesFieldsSearch;
      break;
    default:
      target = "";
      arrToCheck = [];
  }

  const valToRegister = i || i === 0 ? `items.${i}.search` : "search";

  const errToWatch =
    i || i === 0
      ? errors?.items?.[i]?.search?.message
      : errors?.search?.message;

  const label = arrToCheck
    .filter((el) => el.field === searchVal?.searchVal)?.[0]
    ?.label?.toLowerCase();

  useEffect(() => {
    const updatePlace = () => {
      const w = window.innerWidth;

      if (w > tailwindBreak.sm)
        setPlace(`Search a ${target}${label ? ` by ${label}` : ""}...`);
      else setPlace(`${label[0].toUpperCase() + label.slice(1)}...`);
    };

    updatePlace();

    window.addEventListener("resize", updatePlace);

    return () => window.removeEventListener("resize", updatePlace);
  }, [target, label]);
  return (
    <div className="w-full flex flex-col gap-3">
      <label className="w-full grid grid-cols-1 justify-items-start gap-2 relative">
        <input
          type="text"
          placeholder={place}
          className="focus__base el__flow outline-none border-2 border-orange-500 rounded-full w-full px-5 pr-14 py-2 txt__01"
          {...register(valToRegister, {
            pattern: {
              value: REG_SEARCH,
              message: "Invalid search length or chars 🥸",
            },
          })}
        />
        <FaSearch className="absolute top-1/2 -translate-y-1/2 right-[20px] w-[25px] h-[25px] text-orange-500 pointer-events-none" />
      </label>

      {errToWatch && (
        <span className="txt__01 text-red-600">{errToWatch as string}</span>
      )}
    </div>
  );
};
export default SearchFieldMultiple;
