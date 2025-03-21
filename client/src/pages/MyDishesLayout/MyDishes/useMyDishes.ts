/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useFormsCustom,
  usePopup,
  useToast,
} from "../../../core/hooks/useGlobal";
import { createURLParamsMyDishes } from "../../../utils/allUtils/makeURLParams";
import {
  bulkDeleteMyDishesAPI,
  bulkDeleteQueryAPI,
  getMyDishesAPI,
} from "../../../core/api/APICalls/myDishes";
import { useEffect, useState } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useUpdateCardsLimit } from "../../../core/hooks/useUpdateCardsLimit";
import { useScrollTop } from "../../../core/hooks/useScrollTop";
import { defaultValuesMyDishesSearch } from "../../../core/config/fieldsArr/allFields/MyDishes/filterSort";
import { DishType } from "../../../types/types";

export const useMyDishes = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [limit, setLimit] = useState(6);
  const [selected, setSelected] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { formContextMyDishesSearch } = useFormsCustom();
  const { handleErrAPI } = useHandleErr();
  useScrollTop();
  useUpdateCardsLimit(limit, setLimit);
  const { popup, setPopup } = usePopup();
  const { showToastMsg } = useToast();

  const { reset, handleSubmit, watch, trigger } = formContextMyDishesSearch;

  const handleSave = handleSubmit((formDatHook) => {
    formDatHook.page = currPage + "";
    sessionStorage.setItem("myDishesForm", JSON.stringify(formDatHook));

    queryClient.resetQueries({ queryKey: ["myDishesSearch"] });
  });

  const handleClear = () => {
    sessionStorage.removeItem("myDishesForm");

    reset(defaultValuesMyDishesSearch);

    // let i = 0;
    // do {
    //   const currField = fieldsMyDishesForm[i];

    //   setValue(
    //     currField as keyof SearchMyDishesFormType,
    //     Array.isArray(getValues(currField as keyof SearchMyDishesFormType))
    //       ? []
    //       : currField === "searchVals"
    //       ? ["name"]
    //       : ""
    //   );
    //   i++;
    // } while (i < fieldsMyDishesForm.length);

    trigger();
  };

  const formDataSearch = watch();
  formDataSearch.page = currPage + "";
  formDataSearch.limit = limit + "";

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["myDishesSearch", formDataSearch],
    queryFn: () => getMyDishesAPI(createURLParamsMyDishes(formDataSearch)),
  });

  useEffect(() => {
    if (isError) {
      handleErrAPI({ err: error as ErrFoodApp });
    }
  }, [isSuccess, isError, data, handleErrAPI, error]);

  const toggleSelected = (val: string) =>
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((el) => el !== val) : [...prev, val]
    );
  const clearSelected = () => setSelected([]);

  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: () => {
      setPopup({
        ...popup,
        isPending: true,
      } as any);

      return bulkDeleteMyDishesAPI(selected);
    },
    onSuccess: () => {
      showToastMsg("Dishes Deleted successfully", "SUCCESS");

      setSelected([]);

      queryClient.resetQueries({ queryKey: ["myDishesSearch"] });
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => setPopup(null),
  });

  const handleDeletePopup = () => mutate();
  const handleOpenPopup = () =>
    setPopup({
      txt: `delete ${selected.length} dish${selected.length > 1 ? "es" : ""} ?`,
      greenLabel: "I changes idea",
      redLabel: "Delete dishes",
      confirmAction: handleDeletePopup,
      isPending: isPendingDelete,
    });

  const { mutate: mutateBulkQuery, isPending: isPendingBulkQuery } =
    useMutation({
      mutationFn: () => {
        setPopup({
          ...popup,
          isPending: true,
        } as any);

        return bulkDeleteQueryAPI(createURLParamsMyDishes(formDataSearch));
      },
      onSuccess: () => {
        showToastMsg("Dishes Deleted successfully", "SUCCESS");
        setSelected([]);
        queryClient.resetQueries({ queryKey: ["myDishesSearch"] });
      },
      onError: (err: ErrFoodApp) => handleErrAPI({ err }),
      onSettled: () => setPopup(null),
    });

  const handleDeleteBulkQuery = () => mutateBulkQuery();

  const handleOpenPopupBulkQuery = () => {
    if (data?.dishes?.length)
      setSelected(data.dishes.map((el: DishType) => el._id));
    setPopup({
      txt: `delete all dishes that match query ?`,
      redLabel: "Delete dishes",
      confirmAction: handleDeleteBulkQuery,
      isPending: isPendingBulkQuery,
    });
  };

  return {
    formContextMyDishesSearch,
    propsForm: { handleSave, handleClear, isPending },
    propsBlockPages: { currPage, setCurrPage, totPages: data?.totPages },
    data,
    toggleSelected,
    selected,
    handleOpenPopup,
    clearSelected,
    handleOpenPopupBulkQuery,
  };
};
