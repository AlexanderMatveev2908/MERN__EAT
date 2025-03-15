/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import SearchField from "./components/SearchField";
import { UseFormReturn } from "react-hook-form";
import { CheckBoxFieldType } from "../../config/fieldsArr/MyRestaurants/makeUpdate";
import FiltersSearchBar from "./components/Filters/FiltersSearchBar";
import SortersSearchBar from "./components/Sorters/SortersSearchBar";
import { SortersFieldsType } from "../../config/fieldsArr/MyRestaurants/filterSort";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  catFields: CheckBoxFieldType[];
  priceFields: CheckBoxFieldType[];
  formContext: UseFormReturn<any>;
  sortersObj: SortersFieldsType;
};

const SearchBar: FC<PropsType> = ({
  searchFields,
  formContext,
  catFields,
  priceFields,
  sortersObj,
}) => {
  const { register } = formContext;

  return (
    <div className="w-full max-w-[90%] border-[3px] border-orange-500 rounded-xl p-6">
      <div className="w-full grid grid-cols-1">
        <SearchField {...{ register }} />

        <FiltersSearchBar
          {...{ formContext, searchFields, catFields, priceFields }}
        />

        <SortersSearchBar {...{ formContext, sortersObj }} />
      </div>
    </div>
  );
};
export default SearchBar;
