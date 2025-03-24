/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
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
import { useFormsCustom } from "../../core/hooks/useGlobal";
import { RestaurantAllUsers } from "../../types/allTypes/search";
import SearchRestItem from "./components/SearchRestItem";
import SearchBar_v_2 from "../../UI/common/SearchBar/SearchBar_v_2";
import { getRestAllUSersAPI } from "../../core/api/APICalls/searchAllUsers";
import { createURLParamsMultipleSearch } from "../../utils/allUtils/makeURLParams";
import { useCreateQueryHandlers } from "../../core/hooks/useCreateQueryHandlers";

const SearchRestAllUsers: FC = () => {
  useScrollTop();

  const { formContextSearchRestAllUsers: formContext } = useFormsCustom();

  const {
    handleSave,
    handleClear,
    propsBlock,
    data,
    isPending,
    isError,
    error,
    isSuccess,
    closeAllDrop,
  } = useCreateQueryHandlers({
    formCtx: formContext,
    key: "searchAllUsersRest",
    cbAPI: getRestAllUSersAPI,
    cbProcessForm: createURLParamsMultipleSearch,
  });

  const { watch } = formContext;
  const fields = watch("items" as any);

  const resWtc = fields.filter((field) => !!field?.search);
  const res = resWtc?.[resWtc?.length - 1];

  const { totDocuments, nHits, totPages, restaurants } = data ?? ({} as any);

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5">
      <FormProvider {...formContext}>
        <SearchBar_v_2
          {...{
            searchFields: searchRestFieldsSearch,
            filters: searchRestAllUsersFilters,
            sorters: searchRestAllUsersSorters,
            formContext,
            isPending,
            handleSave,
            handleClear,
            closeAllDrop,
          }}
        />
      </FormProvider>

      {isSuccess && (
        <ShowNumberHits
          {...{
            nHits,
            totDocuments,
            isPending,
            search: res?.search,
            searchVal: res?.searchVal,
          }}
        />
      )}

      {isPending ? (
        <LoaderPageReact />
      ) : isError ? (
        <ErrEmoji {...{ err: (error as ErrFoodApp)?.response?.data?.msg }} />
      ) : (
        !!restaurants?.length && (
          <div className="container__cards">
            {restaurants.map((el: RestaurantAllUsers) => (
              <SearchRestItem key={el._id} {...{ rest: el }} />
            ))}
          </div>
        )
      )}

      <BlockPages
        {...{
          ...propsBlock,
          totPages,
        }}
      />
    </div>
  );
};
export default SearchRestAllUsers;
