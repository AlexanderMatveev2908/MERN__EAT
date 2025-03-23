import { FC } from "react";
import SearchBar from "../../UI/common/SearchBar/SearchBar";
import { useScrollTop } from "../../core/hooks/useScrollTop";
import {
  searchRestAllUsersFilters,
  searchRestAllUsersSorters,
  searchRestFieldsSearch,
} from "../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { FormProvider } from "react-hook-form";
import BlockPages from "../../UI/components/BlockPages/BlockPages";
import LoaderPageReact from "../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import ShowNumberHits from "../../UI/components/ShowNumberHits";
import ErrEmoji from "../../UI/components/ErrEmoji";
import { ErrFoodApp } from "../../types/allTypes/API";
import { useCreateQueryHandlers } from "../../core/hooks/useCreateQueryHandlers";
import { getRestAllUSersAPI } from "../../core/api/APICalls/searchAllUsers";
import { useFormsCustom } from "../../core/hooks/useGlobal";

const SearchRestAllUsers: FC = () => {
  useScrollTop();

  const { formContextSearchRestAllUsers: formContext } = useFormsCustom();

  const {
    handleSave,
    handleClear,
    propsBlock,
    data,
    isSuccess,
    isPending,
    isError,
    error,
  } = useCreateQueryHandlers({
    formCtx: formContext,
    key: "searchAllUsersRest",
    cbAPI: getRestAllUSersAPI,
  });
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
            isPending,
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

      <BlockPages {...{ ...propsBlock, totPages }} />
    </div>
  );
};
export default SearchRestAllUsers;
