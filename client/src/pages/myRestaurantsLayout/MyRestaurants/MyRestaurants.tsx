import { FC } from "react";
import { useMyRestaurants } from "./useMyRestaurants";
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

const MyRestaurants: FC = () => {
  useScrollTop();

  const {
    isPending,
    formContext,
    currPage,
    setCurrPage,
    handleSave,
    handleClear,
    data,
    isError,
    error,
  } = useMyRestaurants();

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

      <ShowNumberHits {...{ isPending, nHits: nHits, totDocuments }} />

      {isPending ? (
        <LoaderPageReact />
      ) : isError ? (
        <ErrEmoji {...{ err: (error as ErrFoodApp)?.response?.data?.msg }} />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] justify-items-center gap-10 mt-5 items-start">
          {restaurants?.map((rest) => (
            <RestaurantItem key={rest._id} {...{ rest }} />
          ))}
        </div>
      )}

      <BlockPages {...{ currPage, setCurrPage, totPages }} />
    </div>
  );
};
export default MyRestaurants;
