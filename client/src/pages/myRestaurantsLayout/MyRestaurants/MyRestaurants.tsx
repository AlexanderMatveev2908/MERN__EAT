import { FC } from "react";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import RestaurantItem from "./components/RestaurantItem";
import SearchBar from "../../../UI/common/SearchBar/SearchBar";
import {
  myRestFieldsSearch,
  myRestFilters,
  myRestSorters,
} from "./../../../core/config/fieldsArr/allFields/MyRestaurants/filterSort";
import { FormProvider } from "react-hook-form";
import BlockPages from "../../../UI/components/BlockPages/BlockPages";
import ShowNumberHits from "../../../UI/components/ShowNumberHits";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import { useCreateQueryHandlers } from "../../../core/hooks/useCreateQueryHandlers";
import { getMyRestaurantsAPI } from "../../../core/api/api";

const MyRestaurants: FC = () => {
  useScrollTop();

  const { formContextMyRestaurants: formContext } = useFormsCustom();

  const {
    handleSave,
    handleClear,
    propsBlock,
    data,
    isPending,
    isError,
    error,
    isSuccess,
  } = useCreateQueryHandlers({
    formCtx: formContext,
    key: "myRestaurantsSearch",
    cbAPI: getMyRestaurantsAPI,
  });

  const { restaurants, totDocuments = 0, totPages = 0, nHits = 0 } = data ?? {};

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5">
      <span className="txt__04">My Restaurants</span>
      <FormProvider {...formContext}>
        <SearchBar
          {...{
            searchFields: myRestFieldsSearch,
            sorters: myRestSorters,
            filters: myRestFilters,
            formContext,
            handleSave,
            handleClear,
            isPending,
          }}
        />
      </FormProvider>

      {isSuccess && (
        <ShowNumberHits {...{ isPending, nHits: nHits, totDocuments }} />
      )}

      {isPending ? (
        <LoaderPageReact />
      ) : isError ? (
        <ErrEmoji {...{ err: (error as ErrFoodApp)?.response?.data?.msg }} />
      ) : (
        !!restaurants?.length && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] justify-items-center gap-10 mt-5 items-start">
            {restaurants?.map((rest) => (
              <RestaurantItem key={rest._id} {...{ rest }} />
            ))}
          </div>
        )
      )}

      <BlockPages {...{ ...propsBlock, totPages }} />
    </div>
  );
};
export default MyRestaurants;
