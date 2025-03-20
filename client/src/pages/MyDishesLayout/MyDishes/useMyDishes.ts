import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fieldsMyDishesForm } from "../../../core/config/fieldsArr/allFields/MyDishes/filterSort";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import { SearchMyDishesFormType } from "../../../types/allTypes/myDishes";
import { createURLParamsMyDishes } from "../../../utils/allUtils/makeURLParams";
import { getMyDishesAPI } from "../../../core/api/APICalls/myDishes";
import { useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";

export const useMyDishes = () => {
  const { formContextMyDishesSearch } = useFormsCustom();
  const { handleErrAPI } = useHandleErr();

  const queryClient = useQueryClient();

  const { setValue, getValues, handleSubmit, watch } =
    formContextMyDishesSearch;

  const handleSave = handleSubmit((formDatHook) => {
    sessionStorage.setItem("myDishesForm", JSON.stringify(formDatHook));

    queryClient.resetQueries({ queryKey: ["myDishesSearch"] });
  });

  const handleClear = () => {
    sessionStorage.removeItem("myDishesForm");

    let i = 0;
    do {
      const currField = fieldsMyDishesForm[i];

      setValue(
        currField as keyof SearchMyDishesFormType,
        Array.isArray(getValues(currField as keyof SearchMyDishesFormType))
          ? []
          : currField === "searchVals"
          ? ["name"]
          : ""
      );
      i++;
    } while (i < fieldsMyDishesForm.length);
  };

  const formDataSearch = watch();

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["myDIshesSearch", formDataSearch],
    queryFn: () => getMyDishesAPI(createURLParamsMyDishes(formDataSearch)),
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      handleErrAPI({ err: error as ErrFoodApp });
    }
  }, [isSuccess, isError, data, handleErrAPI, error]);

  return {
    formContextMyDishesSearch,
    handleSave,
    handleClear,
    isPending,
  };
};
