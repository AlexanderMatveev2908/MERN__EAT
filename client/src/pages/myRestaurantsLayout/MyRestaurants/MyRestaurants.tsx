import { FC } from "react";
import { useMyRestaurants } from "./useMyRestaurants";
import NoLengthResult from "../../../UI/components/NoLengthResult";
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

const MyRestaurants: FC = () => {
  const {
    isPending,
    restaurants,
    totRestaurants,
    formContext,
    currPage,
    setCurrPage,
    handleSave,
    handleClear,
  } = useMyRestaurants();

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
          }}
        />
      </FormProvider>

      {isPending ? (
        <LoaderPageReact />
      ) : !totRestaurants ? (
        <NoLengthResult
          {...{ txt: "It seems you do not have any restaurants right now 🧐" }}
        />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] justify-items-center gap-10 place-content-start items-start mt-5">
          {restaurants?.map((rest) => (
            <RestaurantItem key={rest._id} {...{ rest }} />
          ))}
        </div>
      )}

      <BlockPages {...{ currPage, setCurrPage }} />
    </div>
  );
};
export default MyRestaurants;
