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
import LoaderPageReact from "../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import ShowNumberHits from "../../UI/components/ShowNumberHits";
import ErrEmoji from "../../UI/components/ErrEmoji";
import { ErrFoodApp } from "../../types/allTypes/API";

const SearchRestAllUsers: FC = () => {
  useScrollTop();

  const {
    formContext,
    handleSave,
    handleClear,
    propsBlock,
    isPending,
    data,
    isError,
    error,
    isSuccess,
  } = useSearch();

  const { totDocuments, nHits, totPages, restaurants } = data ?? {};

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

      {isSuccess && <ShowNumberHits {...{ nHits, totDocuments, isPending }} />}

      {isPending ? (
        <LoaderPageReact />
      ) : isError ? (
        <ErrEmoji {...{ err: (error as ErrFoodApp)?.response?.data?.msg }} />
      ) : null}

      <BlockPages {...{ ...propsBlock }} />
    </div>
  );
};
export default SearchRestAllUsers;
