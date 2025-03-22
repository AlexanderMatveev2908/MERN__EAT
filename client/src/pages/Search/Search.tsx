import { FC } from "react";
import SearchBar from "../../UI/common/SearchBar/SearchBar";
import { useScrollTop } from "../../core/hooks/useScrollTop";
import {
  searchRestAllUsersFilters,
  searchRestAllUsersSorters,
  searchRestFieldsSearch,
} from "../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { useSearch } from "./useSearch";
import { FormProvider } from "react-hook-form";
import BlockPages from "../../UI/components/BlockPages/BlockPages";

const Search: FC = () => {
  useScrollTop();

  const { formContext, handleSave, handleClear, propsBlock } = useSearch();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5">
      <FormProvider {...formContext}>
        <SearchBar
          {...{
            searchFields: searchRestFieldsSearch,
            filters: searchRestAllUsersFilters,
            sorters: searchRestAllUsersSorters,
            formContext,
            isPending: false,
            handleSave,
            handleClear,
          }}
        />
      </FormProvider>

      <BlockPages {...{ ...propsBlock }} />
    </div>
  );
};
export default Search;
