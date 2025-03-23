/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useState } from "react";
import { useScrollTop } from "../../core/hooks/useScrollTop";
import {
  defaultValsSearchAllUsers,
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUpdateCardsLimit } from "../../core/hooks/useUpdateCardsLimit";
import { getRestAllUSersAPI } from "../../core/api/APICalls/searchAllUsers";
import { useHandleErr } from "../../core/hooks/useHandleErr";
import { createURLParamsMultipleSearch } from "../../utils/allUtils/makeURLParams";

const SearchRestAllUsers: FC = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState(6);

  const queryClient = useQueryClient();

  const { formContextSearchRestAllUsers: formContext } = useFormsCustom();
  const { handleErrAPI } = useHandleErr();

  useScrollTop();
  useUpdateCardsLimit(limit, setLimit);

  const { handleSubmit, reset, trigger, watch } = formContext;

  const handleSave = handleSubmit((formDatHook) => {
    formDatHook.page = currPage + "";
    sessionStorage.setItem("searchAllUsersRest", JSON.stringify(formDatHook));
    queryClient.resetQueries({ queryKey: ["searchAllUsersRest"] });
  });

  const handleClear = () => {
    sessionStorage.removeItem("searchAllUsersRest");
    reset(defaultValsSearchAllUsers);
    setCurrPage(1);
    trigger();

    queryClient.resetQueries({ queryKey: ["searchAllUsersRest"] });
  };

  const formVals = watch();
  formVals.page = currPage + "";
  formVals.limit = limit + "";

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["searchAllUsersRest", formVals],
    queryFn: () => getRestAllUSersAPI(createURLParamsMultipleSearch(formVals)),
  });

  const handleSideEffects = useCallback(() => {
    if (isError) {
      handleErrAPI({ err: error as ErrFoodApp });
    }
    if (isSuccess) {
      // console.log(data);
      if (data?.nHits < limit) setCurrPage(1);
    }
  }, [isError, isSuccess, error, handleErrAPI, data, limit, setCurrPage]);

  useEffect(() => {
    handleSideEffects();
  }, [handleSideEffects]);

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
          }}
        />
      </FormProvider>

      {isSuccess && <ShowNumberHits {...{ nHits, totDocuments, isPending }} />}

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

      <BlockPages {...{ currPage, setCurrPage, totPages }} />
    </div>
  );
};
export default SearchRestAllUsers;
