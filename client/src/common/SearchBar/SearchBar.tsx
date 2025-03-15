import { FC } from "react";
import { FieldQuerySortType } from "../../config/fieldsArr/MyRestaurants/filterSort";
import SearchField from "./components/SearchField";
import { UseFormReturn } from "react-hook-form";
import { CatFormType } from "../../config/fieldsArr/MyRestaurants/makeUpdate";
import FiltersSearchBar from "./components/Filters/FiltersSearchBar";
import SortersSearchBar from "./components/Sorters/SortersSearchBar";

type PropsType = {
  searchFields: FieldQuerySortType[];
  catFields: FieldQuerySortType[];
  priceFields: CatFormType[];
  formContext: UseFormReturn;
};

const SearchBar: FC<PropsType> = ({
  searchFields,
  formContext,
  catFields,
  priceFields,
}) => {
  const { register } = formContext;

  return (
    <div className="w-full max-w-[90%] border-[3px] border-orange-500 rounded-xl p-6">
      <div className="w-full grid grid-cols-1">
        <SearchField {...{ register }} />

        <FiltersSearchBar
          {...{ formContext, searchFields, catFields, priceFields }}
        />

        <SortersSearchBar {...{ formContext }} />
      </div>
    </div>
  );
};
export default SearchBar;
