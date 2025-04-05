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
import { showPairsUserInfo } from "../../../core/config/fieldsArr/allFields/manageOrders/show";
import DropElStatic from "../../../UI/components/DropElStatic";
import ContentMath from "../../../UI/components/ContentMath";
import { getTotOrder } from "../../../utils/allUtils/priceFormatter";
import { showFieldsDelivery } from "../../../core/config/fieldsArr/allFields/myOrders/show";
import { IDPopulatedOrder } from "../../../types/allTypes/orders";
import TimerDel from "./TimerDel";
import DragAndDropManager from "./DragAndDropManager";

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
        <div className="w-full grid justify-items-center gap-6">
          <span className="txt__04">{order.restaurantName}</span>
          <ListItemsOrder {...{ order }} />

          <div className="w-full grid grid-rows-1 gap-x-10 gap-y-5 items-start md:grid-cols-2">
            {showPairsUserInfo(
              Object.entries(order.infoUser) as string[][],
              Object.entries(order.addressUser) as string[][]
            ).map((el) => (
              <DropElStatic {...{ el }}>
                {el.pairs.map((el) => (
                  <li
                    key={el.id}
                    className="w-full grid grid-cols-[75px_1fr] gap-5"
                  >
                    <span className="txt__01">{el.pair[0]}</span>
                    <span className="txt__01 justify-self-end block overflow-x-scroll hide_scrollbar max-w-full">
                      {el.pair[1]}
                    </span>
                  </li>
                ))}
              </DropElStatic>
            ))}
          </div>

          <div className="w-full">
            <ContentMath {...{ order, totOrder: getTotOrder(order) }} />
          </div>

          <ul className="w-full grid items-center gap-2">
            {showFieldsDelivery(
              order.timeConfirmed,
              (order.restaurantId as IDPopulatedOrder).delivery.estTimeDelivery
            ).map((el) => (
              <li key={el.id} className="w-full grid grid-cols-2 items-center">
                <span className="txt__01">{el.label}</span>

                <span className="txt__01 justify-self-end sm:justify-self-center">
                  {el.val}
                </span>
              </li>
            ))}
          </ul>

          <TimerDel {...{ order }} />

          <DragAndDropManager {...{ order }} />
        </div>
      )}
    </ParentContentLoading>
  );
};
export default ManageSingleOrder;
