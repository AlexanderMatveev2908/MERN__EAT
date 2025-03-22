import { useState } from "react";
import { useFormsCustom } from "../../core/hooks/useGlobal";
import { useUpdateCardsLimit } from "../../core/hooks/useUpdateCardsLimit";
import { defaultValsSearchAllUsers } from "../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";

export const useSearch = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState(6);

  // const { handleErrAPI } = useHandleErr();
  // const { showToastMsg } = useToast();

  useUpdateCardsLimit(limit, setLimit);

  const { formContextSearchRestAllUsers: formContext } = useFormsCustom();
  const { handleSubmit, reset, watch } = formContext;

  const formVals = watch();
  formVals.page = currPage + "";
  formVals.limit = limit + "";

  const handleSave = handleSubmit((formDataHook) => {
    console.log(formDataHook);

    sessionStorage.setItem("searchRest", JSON.stringify(formDataHook));
  });
  const handleClear = () => {
    sessionStorage.removeItem("searchRest");

    reset(defaultValsSearchAllUsers);

    setCurrPage(1);
  };

  return {
    formContext,
    propsBlock: {
      currPage,
      setCurrPage,
    },
    handleSave,
    handleClear,
  };
};
