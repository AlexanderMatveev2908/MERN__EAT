import { FC } from "react";
import { useMyDishes } from "./useMyDishes";
import { FormProvider } from "react-hook-form";
import SearchBar from "../../../UI/common/SearchBar/SearchBar";
import {
  myDishesFieldsSearch,
  myDishesFilters,
  sortersMyDishesFields,
} from "../../../core/config/fieldsArr/allFields/MyDishes/filterSort";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import BlockPages from "../../../UI/components/BlockPages/BlockPages";
import ErrEmoji from "../../../UI/components/ErrEmoji";

const MyDishes: FC = () => {
  const {
    formContextMyDishesSearch: formContext,
    handleSave,
    handleClear,
    isPending,
    currPage,
    setCurrPage,
    totPages,
    totDocuments,
    nHits,
  } = useMyDishes();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5">
      <span className="txt__04">My Dishes</span>

      <FormProvider {...formContext}>
        <SearchBar
          {...{
            handleSave,
            formContext,
            isPending: false,
            searchFields: myDishesFieldsSearch,
            filters: myDishesFilters,
            sorters: sortersMyDishesFields,
            handleClear,
          }}
        />
      </FormProvider>

      {isPending ? (
        <LoaderPageReact />
      ) : !totDocuments ? (
        <ErrEmoji
          {...{ txt: "It seems you do not have any dish created 🧐" }}
        />
      ) : !nHits ? (
        <ErrEmoji
          {...{ txt: "We did not found nothing with your search inputs 🥸" }}
        />
      ) : null}

      <BlockPages {...{ currPage, setCurrPage, totPages }} />
    </div>
  );
};
export default MyDishes;
