/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import SearchField from "./components/SearchField";
import { UseFormReturn } from "react-hook-form";
import FiltersSearchBar from "./components/Filters/FiltersSearchBar";
import SortersSearchBar from "./components/Sorters/SortersSearchBar";
import {
  CheckBoxFieldType,
  SearchFilterType,
  SorterFieldType,
} from "../../../core/config/fieldsArr/typesFields";
import ButtonBasic from "../../components/buttons/ButtonBasic";

// export type FormContextSearchBar =
//   | UseFormReturn<SearchMyDishesFormType>
//   | UseFormReturn<MyRestaurantsAddUpdateFormType>;

// type PropsType<T extends FieldValues> = {
//   searchFields: CheckBoxFieldType[];
//   formContext: UseFormReturn<T>;
//   filters: SearchFilterType[];
//   sorters: SorterFieldType[];
//   handleSave: () => void;
//   handleClear: () => void;
//   isPending: boolean;
// };

type PropsType = {
  searchFields: CheckBoxFieldType[];
  formContext: UseFormReturn<any>;
  filters: SearchFilterType[];
  sorters: SorterFieldType[];
  handleSave: () => void;
  handleClear: () => void;
  isPending: boolean;
};

const SearchBar: FC<PropsType> = ({
  searchFields,
  formContext,
  sorters,
  filters,
  handleSave,
  handleClear,
  isPending,
}) => {
  return (
    <form className="w-full max-w-[90%] border-[3px] border-orange-500 rounded-xl p-6">
      <div className="w-full grid grid-cols-1">
        <SearchField {...{ formContext }} />

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
export default SearchBar;
