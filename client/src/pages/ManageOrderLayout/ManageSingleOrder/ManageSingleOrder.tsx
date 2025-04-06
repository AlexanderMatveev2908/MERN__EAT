/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
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
import {
  showFieldManageOrderTime,
  showPairsUserInfo,
} from "../../../core/config/fieldsArr/allFields/manageOrders/show";
import DropElStatic from "../../../UI/components/DropElStatic";
import ContentMath from "../../../UI/components/ContentMath";
import { getTotOrder } from "../../../utils/allUtils/priceFormatter";
import { IDPopulatedOrder } from "../../../types/allTypes/orders";
import TimerDel from "./TimerDel";
import DragAndDropManager from "./DragAndDropManager";
import { MdError } from "react-icons/md";
import { calcDelay } from "../../../utils/allUtils/formatTime";

const ManageSingleOrder: FC = () => {
  const [isDelivered, setIsDelivered] = useState(false);
  const orderId = useParams()?.orderId;
  const [delay, setDelay] = useState<null | number>(0);

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
  }, [isError, error, isSuccess, data, handleErrAPI]);

  const { order } = data ?? {};

  useEffect(() => {
    let interval;
    if (!order) {
      return;
    } else if (order.status === "delivered" || isDelivered) {
      setDelay(null);
      return;
    } else {
      interval = setInterval(() => {
        setDelay(
          calcDelay(
            order?.timeConfirmed,
            (order?.restaurantId as IDPopulatedOrder).delivery
              .estTimeDelivery as unknown as number
          ) as any
        );
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [order, isDelivered]);

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
            {showFieldManageOrderTime(
              order.timeConfirmed,
              (order.restaurantId as IDPopulatedOrder).delivery.estTimeDelivery,
              delay as any
            ).map((el) =>
              el.label === "Delay" ? (
                el.val === null ||
                order.status === "delivered" ||
                isDelivered ? null : (
                  <li
                    key={el.id}
                    className="w-full grid grid-cols-2 items-center"
                  >
                    <div className="w-full flex items-center gap-5">
                      <MdError className="min-h-[40px] min-w-[40px] text-red-600" />
                      <span className="txt__02 text-red-600">{el.label}</span>
                    </div>

                    <span className="txt__01 justify-self-end sm:justify-self-center border-b-[3px] text-red-600 pb-1 border-red-600">
                      {el.val}
                    </span>
                  </li>
                )
              ) : (
                <li
                  key={el.id}
                  className="w-full grid grid-cols-2 items-center"
                >
                  <span className="txt__01">{el.label}</span>

                  <span className="txt__01 justify-self-end sm:justify-self-center">
                    {el.val}
                  </span>
                </li>
              )
            )}
          </ul>

          <TimerDel {...{ order, isDelivered }} />

          {!["cancelled", "delivered"].includes(order.status) && (
            <DragAndDropManager {...{ order, setIsDelivered }} />
          )}
        </div>
      )}
    </ParentContentLoading>
  );
};
export default ManageSingleOrder;
