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
  closeAllDrop: boolean;
};

const SearchBar_v_2: FC<PropsType> = ({
  searchFields,
  formContext,
  sorters,
  filters,
  handleSave,
  handleClear,
  isPending,
  closeAllDrop,
}) => {
  const hasAppendedFirst = useRef(false);

  const path = useLocation().pathname;

  const { control } = formContext;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

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
              {...{ formContext, i, fieldHook: fields?.[i] as any }}
              key={i}
            />
          ))}
        </div>

        <FiltersSearchBar_v_2
          {...{
            formContext,
            searchFields,
            filters,
            closeAllDrop,
          }}
        >
          <TextFilter_v_2
            {...{
              append,
              remove,
              fields,
              formContext,
              searchFields,
              closeAllDrop,
            }}
          />
        </FiltersSearchBar_v_2>

        <SortersSearchBar {...{ formContext, sorters, closeAllDrop }} />
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
