/* eslint-disable @typescript-eslint/no-explicit-any */
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
import MyDishesItem from "./components/MyDishesItem";
import DeleteButton from "../../../UI/components/buttons/DeleteButton";
import ShowNumberHits from "../../../UI/components/ShowNumberHits";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import { ErrFoodApp } from "../../../types/allTypes/API";

const MyDishes: FC = () => {
  useScrollTop();

  const {
    formContextMyDishesSearch: formContext,
    propsForm,
    propsBlockPages,
    data,
    toggleSelected,
    selected,
    handleOpenPopup,
    clearSelected,
    handleOpenPopupBulkQuery,
    isError,
    error,
    isSuccess,
  } = useMyDishes();

  const { totDocuments, nHits, dishes } = data ?? ({} as any);

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5">
      <span className="txt__04">My Dishes</span>

      <FormProvider {...formContext}>
        <SearchBar
          {...{
            ...propsForm,
            formContext,
            searchFields: myDishesFieldsSearch,
            filters: myDishesFilters,
            sorters: sortersMyDishesFields,
          }}
        />
      </FormProvider>

      {isSuccess && (
        <ShowNumberHits
          {...{ nHits, totDocuments, isPending: propsForm.isPending }}
        />
      )}

      {!!selected?.length && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 mt-3 px-3 gap-4 justify-items-start sm:justify-items-center">
          <div className="w-full flex gap-5 border-2 border-red-600 rounded-xl py-2 px-4 pr-6 max-w-fit items-center">
            <span className="txt__02">Items selected: {selected.length}</span>
          </div>

          <button
            onClick={clearSelected}
            className="w-full flex gap-5 border-2 border-green-600 rounded-xl py-2 px-4 pr-6 max-w-fit el__flow hover:text-green-600 hover:scale-110 cursor-pointer items-center"
          >
            <span className="txt__02">Cancel operation</span>
          </button>

          <DeleteButton
            {...{ txt: "Delete selected", handleDelete: handleOpenPopup }}
          />

          <DeleteButton
            {...{
              txt: "Delete results searched",
              handleDelete: handleOpenPopupBulkQuery,
            }}
          />
        </div>
      )}

      {propsForm.isPending ? (
        <LoaderPageReact />
      ) : isError ? (
        <ErrEmoji {...{ err: (error as ErrFoodApp)?.response?.data?.msg }} />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] justify-items-center gap-10 mt-5 items-start">
          {dishes.map((el) => (
            <MyDishesItem
              key={el._id}
              {...{ dish: el, toggleSelected, selected }}
            />
          ))}
        </div>
      )}
      <BlockPages {...{ ...propsBlockPages }} />
    </div>
  );
};
export default MyDishes;
