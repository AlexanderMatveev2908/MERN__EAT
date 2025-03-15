/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import SearchField from "./components/SearchField";
import { UseFormReturn } from "react-hook-form";
import FiltersSearchBar from "./components/Filters/FiltersSearchBar";
import SortersSearchBar from "./components/Sorters/SortersSearchBar";
import { CheckBoxFieldType } from "../../../core/config/fieldsArr/allFields/MyRestaurants/makeUpdate";
import { SorterFieldType } from "../../../core/config/fieldsArr/allFields/MyRestaurants/filterSort";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  catFields: CheckBoxFieldType[];
  priceFields: CheckBoxFieldType[];
  formContext: UseFormReturn<any>;
  filters: any;
  sortersObj: { [key: string]: SorterFieldType };
};

const SearchBar: FC<PropsType> = ({
  searchFields,
  formContext,
  catFields,
  priceFields,
  sortersObj,
  filters,
}) => {
  const {
    register,
    formState: { errors },
  } = formContext;

  return (
    <div className="w-full max-w-[90%] border-[3px] border-orange-500 rounded-xl p-6">
      <div className="w-full grid grid-cols-1">
        <SearchField {...{ register, errors }} />

        <FiltersSearchBar
          {...{
            formContext,
            searchFields,
            catFields,
            priceFields,
            filters,
          }}
        />

        <SortersSearchBar {...{ formContext, sortersObj }} />
      </div>
    </div>
  );
};
export default SearchBar;
