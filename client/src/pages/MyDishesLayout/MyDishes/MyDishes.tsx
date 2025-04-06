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
import BlockPages from "../../../UI/components/BlockPages/BlockPages";
import MyDishesItem from "./components/MyDishesItem";
import DeleteButton from "../../../UI/components/buttons/DeleteButton";
import ShowNumberHits from "../../../UI/components/ShowNumberHits";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";

const MyDishes: FC = () => {
  useScrollTop();

  const {
    propsForm,
    propsBlock,

    data,

    toggleSelected,
    selected,
    clearSelected,

    handleOpenPopup,
    handleOpenPopupBulkQuery,

    isError,
    error,
    isSuccess,
    isPending,
    closeAllDrop,
    id,
  } = useMyDishes();

  const { watch } = propsForm.formContext;
  const search = watch("search");
  const searchVals = watch("searchVals");

  const { totDocuments, nHits, dishes } = data ?? ({} as any);

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5">
      <span className="txt__04">My Dishes</span>

      <FormProvider {...propsForm.formContext}>
        <SearchBar
          {...{
            ...propsForm,
            searchFields: myDishesFieldsSearch,
            filters: myDishesFilters,
            sorters: sortersMyDishesFields,
            closeAllDrop,
            id,
          }}
        />
      </FormProvider>

      {isSuccess && (
        <ShowNumberHits
          {...{
            nHits,
            totDocuments,
            search,
            searchVal: searchVals?.[0],
          }}
        />
      )}

      {!!selected?.length && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 mt-3 px-3 gap-4 justify-items-start sm:justify-items-center">
          <div className="w-full flex gap-5 border-2 border-red-600 rounded-xl py-2 px-4 pr-6 max-w-fit items-center">
            <span className="txt__01">Items selected: {selected.length}</span>
          </div>

          <button
            onClick={clearSelected}
            className="w-full flex gap-5 border-2 border-green-600 rounded-xl py-2 px-4 pr-6 max-w-fit el__flow hover:text-green-600 hover:scale-110 cursor-pointer items-center"
          >
            <span className="txt__02">Cancel operation</span>
          </button>
          <div className="w-fit">
            <DeleteButton
              {...{ txt: "Delete selected", handleDelete: handleOpenPopup }}
            />
          </div>
          <div className="w-fit">
            <DeleteButton
              {...{
                txt: "Delete results searched",
                handleDelete: handleOpenPopupBulkQuery,
              }}
            />
          </div>
        </div>
      )}

      <ParentContentLoading {...{ isPending, isError, error }}>
        {!!dishes?.length && (
          <div className="container__cards__grid">
            {dishes.map((el) => (
              <MyDishesItem
                key={el._id}
                {...{ dish: el, toggleSelected, selected }}
              />
            ))}
          </div>
        )}
      </ParentContentLoading>

      <BlockPages {...{ ...propsBlock, totPages: data?.totPages }} />
    </div>
  );
};
export default MyDishes;
