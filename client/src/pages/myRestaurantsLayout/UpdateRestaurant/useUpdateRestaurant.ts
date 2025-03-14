/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useHandleErr } from "../../../hooks/useHandleErr";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { MyRestaurantsAddUpdateFormType } from "../../../types/myRestaurants";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getInfoRestaurantAPI,
  updateRestaurantAPI,
} from "../../../api/myRestaurants";
import { useParams } from "react-router-dom";
import { REG_MONGO } from "../../../config/constants/regex";
import { formatTimeHmMh } from "../../../utils/formatTime";
import { useToast } from "../../../hooks/useGlobal";
import { prepareFormData } from "../../../utils/prepareFormDataRestaurants";

export const useUpdateRestaurant = () => {
  const { restId } = useParams();

  const canStay = REG_MONGO.test(restId ?? "");

  useScrollTop();

  const { handleErrAPI } = useHandleErr();
  const { showToastMsg } = useToast();

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
    if (isErrorInfo) handleErrAPI({ err: errorInfo });
    if (isSuccessInfo) {
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
    onSuccess: () => {
      showToastMsg("Restaurant updated", "SUCCESS");
    },
    onError: (err: any) => {
      handleErrAPI({ err });
    },
  });

  const handleSave = formContext.handleSubmit(
    (data: MyRestaurantsAddUpdateFormType) => {
      const formData = prepareFormData(data);
      // for (const [key, val] of prepareFormData(data).entries()) {
      //   console.log(key, val);
      // }

      mutate({ id: restId ?? "", formData });
    }
  );

  return { formContext, canStay, isPendingInfo, handleSave, isPendingUpdate };
};
