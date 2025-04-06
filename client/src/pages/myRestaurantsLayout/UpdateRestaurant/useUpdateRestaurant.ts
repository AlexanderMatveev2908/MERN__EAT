/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../types/allTypes/restAdmin";
import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getInfoRestaurantAPI,
  updateRestaurantAPI,
} from "./../../../core/api/APICalls/myRestaurants";
import { useNavigate, useParams } from "react-router-dom";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { prepareFormDataMyRest } from "../../../utils/allUtils/prepareFormData";
import { formatTimeHmMh } from "../../../utils/utils";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useDeleteRestaurant } from "../../../core/hooks/myRestaurants/useDeleteRestaurant";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { myRestaurantsAddressByArea } from "../../../core/config/fieldsArr/fields";

export const useUpdateRestaurant = () => {
  const { restId } = useParams();
  const navigate = useNavigate();
  const [currFormAddress, setCurrFormAddress] = useState(0);

  const canStay = REG_MONGO.test(restId ?? "");

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const formContext = useForm<MyRestaurantsAddUpdateFormType>({
    mode: "onChange",
  });

  useEffect(() => {
    formContext.setFocus("name");
  }, [formContext]);

  const {
    data: dataInfo,
    isPending: isPendingInfo,
    isSuccess: isSuccessInfo,
    isError: isErrorInfo,
    error: errorInfo,
  } = useQuery({
    queryFn: () => getInfoRestaurantAPI(restId ?? ""),
    queryKey: ["infoMyRestaurant"],
    enabled: canStay,
  });

  useEffect(() => {
    if (isErrorInfo) {
      handleErrAPI({ err: errorInfo as ErrFoodApp });
    } else if (isSuccessInfo) {
      const { restaurant } = dataInfo ?? {};

      formContext.setValue("name", restaurant?.name ?? "");

      formContext.setValue("images", restaurant?.images ?? []);
      formContext.setValue("categories", restaurant?.categories ?? []);

      for (const key in restaurant?.address) {
        formContext.setValue(`${key}` as any, restaurant?.address[key]);
      }
      for (const key in restaurant?.contact) {
        formContext.setValue(`${key}` as any, restaurant?.contact[key]);
      }
      for (const key in restaurant?.delivery) {
        formContext.setValue(`${key}` as any, restaurant?.delivery[key]);
      }
      for (const key in restaurant?.openHours) {
        formContext.setValue(
          `${key}` as any,
          formatTimeHmMh(restaurant?.openHours[key])
        );
      }
    }
  }, [
    errorInfo,
    isErrorInfo,
    handleErrAPI,
    isSuccessInfo,
    dataInfo,
    formContext,
  ]);

  const { mutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateRestaurantAPI({ id, formData }),
    onSuccess: (data) => {
      showToastMsg("Restaurant updated", "SUCCESS");
      navigate(`/my-restaurants/${data?.restId}`);
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
  });

  const handleSave = (e: FormEvent) => {
    e?.preventDefault();

    e.preventDefault();

    const vals = formContext.getValues();
    let isValid = true;
    let i = 0;

    do {
      const curr = myRestaurantsAddressByArea[i];

      for (const key in vals) {
        const innerCurr = curr.find((el) => el.field === key);
        if (innerCurr && !innerCurr.reg.test(vals[key])) {
          isValid = false;
          break;
        }
      }

      if (!isValid) break;

      i++;
    } while (i < myRestaurantsAddressByArea.length);

    if (!isValid) {
      setCurrFormAddress(i);

      formContext.trigger();

      const swapAddRestForm = document.getElementById("addressSwapUpdateRest");
      const top = swapAddRestForm?.offsetTop;

      window.scrollTo({ top: top, behavior: "smooth" });
    } else {
      const formData = prepareFormDataMyRest(vals);
      mutate({ formData, id: restId ?? "" });
    }
  };

  const { handleClickToOpenPopup } = useDeleteRestaurant();

  return {
    formContext,
    canStay,
    isPendingInfo,
    handleSave,
    isPendingUpdate,
    handleClickToOpenPopup,
    isErrorInfo,
    isSuccessInfo:
      isSuccessInfo && Object.keys(dataInfo?.restaurant ?? {}).length,
    errorInfo,
    currFormAddress,
    setCurrFormAddress,
  };
};
