import { FC } from "react";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import { useCreateQueryHandlers } from "../../../core/hooks/useCreateQueryHandlers";
import { getManageOrderAPI } from "../../../core/api/APICalls/manageOrders";
import { createURLParamsMyDishes } from "../../../utils/allUtils/makeURLParams";
import SearchBar from "../../../UI/common/SearchBar/SearchBar";
import { FormProvider } from "react-hook-form";
import {
  manageOrdersFilters,
  manageOrdersSorters,
  searchFieldsManageOrders,
} from "../../../core/config/fieldsArr/allFields/manageOrders/filterSort";
import BlockPages from "../../../UI/components/BlockPages/BlockPages";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import ShowNumberHits from "../../../UI/components/ShowNumberHits";

const ManageOrders: FC = () => {
  useScrollTop();

  const { formContextManageOrdersSearch: formContext } = useFormsCustom();
  const { watch } = formContext;
  const search = watch("search");
  const searchVals = watch("searchVals");

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
    id,
  } = useCreateQueryHandlers({
    formCtx: formContext,
    key: "manageOrdersSearch",
    cbAPI: getManageOrderAPI,
    cbProcessForm: createURLParamsMyDishes,
  });

  const { nHits, totPages, orders, totDocuments } = data ?? {};

  console.log(data);

  return (
    <div className="w-full grid justify-items-center">
      <FormProvider {...formContext}>
        <SearchBar
          {...{
            formContext,
            searchFields: searchFieldsManageOrders,
            filters: manageOrdersFilters,
            sorters: manageOrdersSorters,
            closeAllDrop,
            isPending,
            handleClear,
            handleSave,
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

      {isPending ? (
        <LoaderPageReact />
      ) : isError ? (
        <ErrEmoji {...{ err: error }} />
      ) : (
        !!orders?.length && null
      )}

      <BlockPages {...{ ...propsBlock, totPages }} />
    </div>
  );
};
export default ManageOrders;
