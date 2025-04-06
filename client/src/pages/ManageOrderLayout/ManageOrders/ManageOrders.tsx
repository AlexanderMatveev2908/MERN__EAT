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
import ShowNumberHits from "../../../UI/components/ShowNumberHits";
import ManageOrderItem from "./ManageOrderItem";
import { OrderType } from "../../../types/types";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";

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

      <ParentContentLoading {...{ isPending, isError, error }}>
        {!!orders?.length && (
          <div className="container__cards__grid mt-10">
            {orders.map((el: OrderType) => (
              <ManageOrderItem key={el._id} {...{ order: el }} />
            ))}
          </div>
        )}
      </ParentContentLoading>

      <BlockPages {...{ ...propsBlock, totPages }} />
    </div>
  );
};
export default ManageOrders;
