import { FC, useEffect } from "react";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleManageOrdersAPI } from "../../../core/api/APICalls/manageOrders";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { ErrFoodApp } from "../../../types/allTypes/API";
import ListItemsOrder from "../../../UI/components/ListItemsOrder";
import { isObjOk } from "../../../utils/allUtils/validateData";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";

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

  return (
    <ParentContentLoading {...{ isPending, isError, error, canStay }}>
      {order && isObjOk(order) && (
        <div className="w-full grid justify-items-center">
          <ListItemsOrder {...{ order }} />
        </div>
      )}
    </ParentContentLoading>
  );
};
export default ManageSingleOrder;
