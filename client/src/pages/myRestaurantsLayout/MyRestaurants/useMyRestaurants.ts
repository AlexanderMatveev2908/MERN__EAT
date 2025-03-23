import { getMyRestaurantsAPI } from "../../../core/api/api";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import { useCreateQueryHandlers } from "../../../core/hooks/useCreateQueryHandlers";

export const useMyRestaurants = () => {
  const { formContextMyRestaurants: formContext } = useFormsCustom();

  const {
    handleSave,
    handleClear,
    propsBlock,
    data,
    isPending,
    isError,
    error,
  } = useCreateQueryHandlers({
    formCtx: formContext,
    key: "myRestaurantsSearch",
    cbAPI: getMyRestaurantsAPI,
  });

  return {
    isPending,
    formContext,
    propsBlock,
    handleSave,
    handleClear,
    data,
    isError,
    error,
  };
};
