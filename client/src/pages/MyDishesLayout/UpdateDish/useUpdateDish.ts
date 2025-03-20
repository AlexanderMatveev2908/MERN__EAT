/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGetRestaurantsIds } from "../../../core/hooks/useGetRestaurantsIds";
import {
  useFormsCustom,
  usePopup,
  useToast,
} from "../../../core/hooks/useGlobal";
import { useNavigate, useParams } from "react-router-dom";
import { REG_MONGO } from "../../../core/config/constants/regex";
import {
  deleteDishAPI,
  getInfoMyDishAPI,
} from "../../../core/api/APICalls/myDishes";
import { useEffect } from "react";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useScrollTop } from "../../../core/hooks/useScrollTop";

export const useUpdateDish = () => {
  const { formContextMyDishesUpdate: formContext } = useFormsCustom();
  const { handleErrAPI } = useHandleErr();
  const { showToastMsg } = useToast();
  const { setPopup, popup } = usePopup();

  useScrollTop();

  const { setValue } = formContext;

  const params = useParams();
  const navigate = useNavigate();

  const dishId = params?.dishId;
  const canStay = REG_MONGO.test(dishId ?? "");

  const { isPendingIds, restInfo, isSuccessIds } = useGetRestaurantsIds();

  const {
    data: dataInfo,
    isPending: isPendingInfo,
    isSuccess: isSuccessInfo,
    isError: isErrorInfo,
    error: errorInfo,
  } = useQuery({
    queryKey: ["myDishInfo"],
    queryFn: () => getInfoMyDishAPI(dishId ?? ""),
    enabled: canStay,
  });

  useEffect(() => {
    const handleSideEffectsGetInfo = () => {
      if (isErrorInfo) {
        handleErrAPI({ err: errorInfo as ErrFoodApp });
      } else if (isSuccessInfo && Object.keys(dataInfo ?? {}).length) {
        setValue("restaurant", dataInfo.dish.restaurant);

        const {
          dish: { name = "", price = 0, quantity = 0, images = [] } = {},
        } = dataInfo ?? {};
        setValue("items", [
          {
            name,
            price: price + "",
            quantity: quantity + "",
            images,
          },
        ]);
      }
    };

    handleSideEffectsGetInfo();
  }, [handleErrAPI, isSuccessInfo, isErrorInfo, errorInfo, dataInfo, setValue]);

  const handleSave = formContext.handleSubmit((formDataHook) => {
    console.log(formDataHook);
  });

  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: () => {
      setPopup({
        ...popup,
        isPending: true,
      } as any);
      return deleteDishAPI(dishId ?? "");
    },
    onSuccess: () => {
      showToastMsg("Dish deleted successfully", "SUCCESS");
      navigate("/my-dishes", { replace: true });
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
    onSettled: () => setPopup(null),
  });

  const handleDeletePopup = () => {
    mutate();
  };
  const handleOpenPopup = () => {
    setPopup({
      txt: "delete this dish ?",
      greenLabel: "I change idea",
      redLabel: "Delete dish",
      isPending: isPendingDelete,
      confirmAction: handleDeletePopup,
    });
  };

  return {
    formContext,
    handleSave,
    isPendingPage: isPendingIds || isPendingInfo,
    restInfo,
    isSuccessIds,
    canStay,
    handleOpenPopup,
  };
};
