/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { REG_SEARCH } from "../../../../core/config/constants/regex";
import { useUpdatePlace } from "../../../../core/hooks/useUpdatePlace";

type PropsType = {
  formContext: UseFormReturn<any>;
  i?: number;
  fieldHook?: {
    searchVal: string;
    search: string;
  };
};

const SearchFieldMultiple: FC<PropsType> = ({ formContext, i, fieldHook }) => {
  const {
    register,
    formState: { errors },
  } = formContext;

  const valToRegister = i || i === 0 ? `items.${i}.search` : "search";
  const errToWatch =
    i || i === 0
      ? errors?.items?.[i]?.search?.message
      : errors?.search?.message;

  const { place } = useUpdatePlace({
    customFilter: (arr) =>
      arr
        .filter((el) => el.field === fieldHook?.searchVal)?.[0]
        ?.label?.toLowerCase(),
  });

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
