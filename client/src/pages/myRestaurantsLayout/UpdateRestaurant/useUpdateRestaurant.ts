/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { MyRestaurantsAddUpdateFormType } from "../../../types/allTypes/restAdmin";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getInfoRestaurantAPI,
  updateRestaurantAPI,
} from "./../../../core/api/APICalls/myRestaurants";
import { useNavigate, useParams } from "react-router-dom";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useToast } from "../../../core/hooks/useGlobal";
import { prepareFormDataMyRest } from "../../../utils/allUtils/prepareFormData";
import { formatTimeHmMh } from "../../../utils/utils";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useDeleteRestaurant } from "../../../core/hooks/useDeleteRestaurant";

export const useUpdateRestaurant = () => {
  const { restId } = useParams();
  const navigate = useNavigate();

  const canStay = REG_MONGO.test(restId ?? "");

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
    if (isErrorInfo) {
      handleErrAPI({ err: errorInfo as ErrFoodApp, push: true });
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

  const handleSave = formContext.handleSubmit(
    (data: MyRestaurantsAddUpdateFormType) => {
      const formData = prepareFormDataMyRest(data);

      mutate({ id: restId ?? "", formData });
    }
  );

  const { handleClickToOpenPopup } = useDeleteRestaurant();

  return {
    formContext,
    canStay,
    isPendingInfo,
    handleSave,
    isPendingUpdate,
    handleClickToOpenPopup,
  };
};
