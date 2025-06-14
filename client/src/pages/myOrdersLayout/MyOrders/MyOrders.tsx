import { FC } from "react";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import SearchBar from "../../../UI/common/SearchBar/SearchBar";
import { FormProvider } from "react-hook-form";
import {
  myOrdersFilters,
  myOrdersSorters,
  searchFieldsMyOrders,
} from "../../../core/config/fieldsArr/allFields/myOrders/filterSort";
import { useCreateQueryHandlers } from "../../../core/hooks/useCreateQueryHandlers";
import { getMyOrdersAPI } from "../../../core/api/APICalls/orders";
import BlockPages from "../../../UI/components/BlockPages/BlockPages";
import ShowNumberHits from "../../../UI/components/ShowNumberHits";
import MyOrdersItem from "./components/MyOrdersItem";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";

const MyOrders: FC = () => {
  useScrollTop();

  const { formContextSearchMyOrders: formContext } = useFormsCustom();
  const { watch } = formContext;
  const searchVals = watch("searchVals");
  const search = watch("search");

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
    key: "myOrdersSearch",
    cbAPI: getMyOrdersAPI,
  });

  const { totDocuments, nHits, orders, totPages } = data ?? {};

  return (
    <div className="w-full grid justify-items-center">
      <FormProvider {...formContext}>
        <SearchBar
          {...{
            formContext,
            searchFields: searchFieldsMyOrders,
            filters: myOrdersFilters,
            sorters: myOrdersSorters,
            handleSave,
            handleClear,
            isPending,
            closeAllDrop,
            id,
          }}
        />
      </FormProvider>

      {isSuccess && (
        <ShowNumberHits
          {...{
            nHits: nHits,
            totDocuments,
            search,
            searchVal: searchVals?.[0],
          }}
        />
      )}

      <ParentContentLoading {...{ isPending, isError, error }}>
        <div className="w-full grid grid-cols-1 justify-items-center gap-10 mt-10 items-start">
          {!!orders?.length &&
            orders.map((el) => (
              <MyOrdersItem key={el._id} {...{ order: el }} />
            ))}
        </div>
      </ParentContentLoading>

      <BlockPages {...{ ...propsBlock, totPages }} />
    </div>
  );
};
export default MyOrders;
