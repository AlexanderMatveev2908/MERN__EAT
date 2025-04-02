import { FC } from "react";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import SearchBar from "../../../UI/common/SearchBar/SearchBar";
import { FormProvider } from "react-hook-form";
import {
  myOrdersFilters,
  myOrdersSorters,
  searchFields,
} from "../../../core/config/fieldsArr/allFields/myOrders/filterSort";
import { useCreateQueryHandlers } from "../../../core/hooks/useCreateQueryHandlers";
import { getMyOrdersAPI } from "../../../core/api/APICalls/orders";
import BlockPages from "../../../UI/components/BlockPages/BlockPages";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import ShowNumberHits from "../../../UI/components/ShowNumberHits";

const MyOrders: FC = () => {
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
  } = useCreateQueryHandlers({
    formCtx: formContext,
    key: "myOrdersSearch",
    cbAPI: getMyOrdersAPI,
  });

  const { totDocuments, nHits } = data ?? {};

  return (
    <div className="w-full grid justify-items-center">
      <FormProvider {...formContext}>
        <SearchBar
          {...{
            formContext,
            searchFields: searchFields,
            filters: myOrdersFilters,
            sorters: myOrdersSorters,
            handleSave,
            handleClear,
            isPending,
            closeAllDrop,
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

      {isPending ? (
        <LoaderPageReact />
      ) : isError ? (
        <ErrEmoji {...{ err: error }} />
      ) : null}

      <BlockPages {...{ ...propsBlock }} />
    </div>
  );
};
export default MyOrders;
