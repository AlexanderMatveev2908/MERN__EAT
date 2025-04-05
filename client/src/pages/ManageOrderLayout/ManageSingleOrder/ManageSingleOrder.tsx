import { FC, useEffect } from "react";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getSingleManageOrdersAPI } from "../../../core/api/APICalls/manageOrders";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { ErrFoodApp } from "../../../types/allTypes/API";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import { msgHelpersFrontBack } from "../../../core/hooks/useHandleErr";
import ListItemsOrder from "../../../UI/components/ListItemsOrder";
import { isObjOk } from "../../../utils/allUtils/validateData";

const ManageSingleOrder: FC = () => {
  const orderId = useParams()?.orderId;
  const canStay = REG_MONGO.test(orderId ?? "");

  useScrollTop();
  const { handleErrAPI } = useGetFavHooks();

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["manageSingleOrder"],
    queryFn: () => getSingleManageOrdersAPI(orderId ?? ""),
    enabled: canStay,
  });
  useEffect(() => {
    if (isError) handleErrAPI({ err: error as ErrFoodApp });
    if (isSuccess) console.log(data);
  }, [isError, error, isSuccess, data, handleErrAPI]);

  const { order } = data ?? {};

  return !canStay ? (
    <Navigate to="/" replace />
  ) : isPending ||
    msgHelpersFrontBack.includes(
      (error as ErrFoodApp)?.response?.data?.msg ?? ""
    ) ? (
    <LoaderPageReact />
  ) : isError ? (
    <ErrEmoji {...{ err: error as ErrFoodApp }} />
  ) : (
    !!order &&
    isObjOk(order) && (
      <div className="w-full grid justify-items-center">
        <ListItemsOrder {...{ order }} />
      </div>
    )
  );
};
export default ManageSingleOrder;
