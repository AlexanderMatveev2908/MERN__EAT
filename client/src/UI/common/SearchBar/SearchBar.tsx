/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import SearchField from "./components/SearchField";
import { UseFormReturn } from "react-hook-form";
import FiltersSearchBar from "./components/Filters/FiltersSearchBar";
import SortersSearchBar from "./components/Sorters/SortersSearchBar";
import {
  CheckBoxFieldType,
  SorterFieldType,
} from "../../../core/config/fieldsArr/typesFields";
import ButtonBasic from "../../components/buttons/ButtonBasic";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  formContext: UseFormReturn<any>;
  filters: CheckBoxFieldType[];
  sorters: SorterFieldType[];
  handleSave: () => void;
  handleClear: () => void;
};

const SearchBar: FC<PropsType> = ({
  searchFields,
  formContext,
  sorters,
  filters,
  handleSave,
  handleClear,
}) => {
  const {
    register,
    formState: { errors },
  } = formContext;

  return (
    <form className="w-full max-w-[90%] border-[3px] border-orange-500 rounded-xl p-6">
      <div className="w-full grid grid-cols-1">
        <SearchField {...{ register, errors }} />

        <FiltersSearchBar
          {...{
            formContext,
            searchFields,
            filters,
          }}
        />

        <SortersSearchBar {...{ formContext, sorters }} />
      </div>

      <div className="w-full grid grid-cols-2 mt-5">
        <div className="w-full max-w-[200px] justify-self-center">
          <ButtonBasic
            {...{
              type: "submit",
              label: "Search",
              styleBtn: "text-green-600",
              styleTxt: "text-green-600 txt__02",
              handleClick: handleSave,
            }}
          />
        </div>

        <div className="w-full max-w-[200px] justify-self-center">
          <ButtonBasic
            {...{
              type: "button",
              label: "Clear",
              styleBtn: "text-red-600",
              styleTxt: "text-red-600 txt__02",
              handleClick: handleClear,
            }}
          />
        </div>
      </div>
    </form>
  );
};
export default SearchBar;
