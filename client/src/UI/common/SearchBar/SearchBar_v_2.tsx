/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import SortersSearchBar from "./components/Sorters/SortersSearchBar";
import {
  CheckBoxFieldType,
  SearchFilterType,
  SorterFieldType,
} from "../../../core/config/fieldsArr/typesFields";
import ButtonBasic from "../../components/buttons/ButtonBasic";
import { useLocation } from "react-router-dom";
import SearchFieldMultiple from "./components/SearchFieldMultiples";
import TextFilter_v_2 from "./components/TextFilter_v_2";
import FiltersSearchBar_v_2 from "./components/Filters/FiltersSearchBar_v_2";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  formContext: UseFormReturn<any>;
  filters: SearchFilterType[];
  sorters: SorterFieldType[];
  handleSave: () => void;
  handleClear: () => void;
  isPending: boolean;
};

const SearchBar_v_2: FC<PropsType> = ({
  searchFields,
  formContext,
  sorters,
  filters,
  handleSave,
  handleClear,
  isPending,
}) => {
  const hasAppendedFirst = useRef(false);
  const path = useLocation().pathname;

  const { control, watch } = formContext;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const searchValEquivalent = watch("searchVals");

  useEffect(() => {
    if (
      !fields.length &&
      fields.length + 1 < 2 &&
      !hasAppendedFirst.current &&
      path === "/search"
    ) {
      hasAppendedFirst.current = true;
      append({ search: "", searchVal: "name" });
    }
  }, [fields, path, append]);

  return !formContext ? null : (
    <form className="w-full max-w-[90%] border-[3px] border-orange-500 rounded-xl p-6">
      <div className="w-full grid grid-cols-1">
        <div className="w-full grid grid-cols-1 gap-4">
          {fields.map((_, i) => (
            <SearchFieldMultiple
              {...{ formContext, i, searchVal: searchValEquivalent?.[i] }}
              key={i}
            />
          ))}
        </div>

        <FiltersSearchBar_v_2
          {...{
            formContext,
            searchFields,
            filters,
          }}
        >
          <TextFilter_v_2 {...{ append, remove, formContext, searchFields }} />
        </FiltersSearchBar_v_2>

        <SortersSearchBar {...{ formContext, sorters }} />
      </div>

      <div className="w-full grid grid-cols-2 mt-5">
        <div className="sm:w-full justify-self-start w-[30vw] sm:max-w-[200px] sm:justify-self-center">
          <ButtonBasic
            {...{
              type: "submit",
              label: "Search",
              styleBtn: "text-green-600",
              styleTxt: "text-green-600 txt__02",
              handleClick: handleSave,
              isPending,
            }}
          />
        </div>

        <div className="sm:w-full justify-self-end w-[30vw] sm:max-w-[200px] sm:justify-self-center">
          <ButtonBasic
            {...{
              type: "button",
              label: "Clear",
              styleBtn: "text-red-600",
              styleTxt: "text-red-600 txt__02",
              handleClick: handleClear,
              isDisabled: isPending,
            }}
          />
        </div>
      </div>
    </form>
  );
};
export default SearchBar_v_2;

/*

     <div className="w-full grid grid-cols-1 gap-4 relative pb-6">
            {fields.map((_, i) => (
              <SearchFieldMultiple
                {...{ formContext, i, searchVal: searchValEquivalent?.[i] }}
                key={i}
              />
            ))}
            <button className="absolute border-2 border-orange-500 rounded-xl bg-[#000] flex w-fit gap-5 items-center top-1/2 p-1 group el__flow hover:scale-110 cursor-pointer">
              <FaPlus className="icon__base group-hover:text-orange-500 el__flow" />
            </button>
          </div>

          */
