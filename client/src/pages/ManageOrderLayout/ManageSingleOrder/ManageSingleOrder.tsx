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
import { showPairsUserInfo } from "../../../core/config/fieldsArr/allFields/manageOrders/show";
import DropElStatic from "../../../UI/components/DropElStatic";
import ContentMath from "../../../UI/components/ContentMath";
import { getTotOrder } from "../../../utils/allUtils/priceFormatter";
import {
  getColorTimer,
  getPercDelTime,
} from "../../../utils/allUtils/formatTime";
import { OrderType } from "../../../types/types";
import { showFieldsDelivery } from "../../../core/config/fieldsArr/allFields/myOrders/show";
import { IDPopulatedOrder } from "../../../types/allTypes/orders";

const ManageSingleOrder: FC = () => {
  const [percDel, setPercDel] = useState(0);

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

  useEffect(() => {
    if (!isObjOk(order)) return;
    const interval = setInterval(() => {
      setPercDel(getPercDelTime(order as OrderType));
    }, 1000);

    return () => clearInterval(interval);
  }, [order]);

  return (
    <ParentContentLoading {...{ isPending, isError, error, canStay }}>
      {order && isObjOk(order) && (
        <>
          <span className="txt__04">{order.restaurantName}</span>

          <div className="w-full grid justify-items-center gap-6">
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
                (order.restaurantId as IDPopulatedOrder).delivery
                  .estTimeDelivery
              ).map((el) => (
                <li
                  key={el.id}
                  className="w-full grid grid-cols-2 items-center"
                >
                  <span className="txt__01">{el.label}</span>

                  <span className="txt__01 justify-self-end sm:justify-self-center">
                    {el.val}
                  </span>
                </li>
              ))}
            </ul>

            {!["pending", "cancelled"].includes(order.status) && (
              <div className="w-full relative mt-10">
                <div className="w-full absolute h-[40px] border-2 border-orange-500  rounded-full"></div>

                <div
                  style={{ left: `calc(${percDel}% - 42.5px)` }}
                  className="absolute border-2 h-[40px] w-[40px] rounded-full bg-[#111] z-60"
                ></div>
                <div className="absolute rounded-full h-[40px] w-full flex justify-start items-center p-1">
                  <span
                    style={{ width: `${percDel}%` }}
                    className={`h-full rounded-full ${getColorTimer(
                      order,
                      percDel
                    )}`}
                  ></span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </ParentContentLoading>
  );
};
export default ManageSingleOrder;
