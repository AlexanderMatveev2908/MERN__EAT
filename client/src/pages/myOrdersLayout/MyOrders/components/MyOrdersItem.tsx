import { FC, ReactNode, useEffect, useState } from "react";
import { OrderType } from "../../../../types/types";
import HeaderIDItem from "../../../../UI/components/cards/HeaderIDItem";
import HeaderImgs from "../../../../UI/components/cards/HeaderImgs";
import AdminLink from "../../../../UI/components/cards/AdminLink";
import DetailsOrderUser from "../../../../UI/components/cards/orders/DetailsOrderUser";
import {
  ActionsMyOrdersBtns,
  buttonsMyOrders,
} from "../../../../core/config/fieldsArr/allFields/myOrders/show";
import ButtonOrder from "./ButtonOrder";
import ActivityClosed from "../../../../UI/components/cards/ActivityClosed";

type PropsType = {
  order: OrderType;
};

const MyOrdersItem: FC<PropsType> = ({ order }) => {
  const [freshStatus, setFreshStatus] = useState<string | null>(null);

  useEffect(() => {
    setFreshStatus(order.status);
  }, [order.status]);

  return (
    <div className="card__el border-orange-500 relative">
      <HeaderIDItem {...{ id: order._id as string }} />

      {order.isAdmin && (
        <AdminLink {...{ path: `/manage-orders/${order._id}` }} />
      )}

      <div className="sm:grid grid-cols-2 place-items-center place-content-center">
        <div className="flex w-full sm:w-[90%] sm:h-[90%] sm:py-3 items-center sm:border-2 border-orange-500 rounded-xl">
          <HeaderImgs {...{ images: order.items.map((el) => el.images[0]) }} />
        </div>

        <div className="w-full grid grid-cols-1 h-full">
          <div className="pt-3 w-full el__flow grid grid-cols-1 gap-3 items-start h-full px-3 sm:pr-2 sm:pl-0">
            <DetailsOrderUser {...{ order, freshStatus }}>
              <ActivityClosed {...{ order }} />
            </DetailsOrderUser>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] px-3 mt-2 gap-y-4">
        {(() => {
          const content: ReactNode[] = [];

          let i = 0;
          do {
            const curr = buttonsMyOrders[i];

            if (
              freshStatus === "pending" &&
              [
                ActionsMyOrdersBtns.CHECKOUT,
                ActionsMyOrdersBtns.DELETE,
              ].includes(curr.action)
            )
              content.push(
                <ButtonOrder key={curr.id} {...{ el: curr, order }} />
              );
            else if (
              freshStatus === "confirmed" &&
              [
                ActionsMyOrdersBtns.REFRESH,
                ActionsMyOrdersBtns.REFUND,
              ].includes(curr.action)
            )
              content.push(
                <ButtonOrder
                  key={curr.id}
                  {...{ el: curr, order, setFreshStatus }}
                />
              );
            else if (
              ["processing", "shipped"].includes(freshStatus ?? "") &&
              curr.action === ActionsMyOrdersBtns.REFRESH
            )
              content.push(
                <ButtonOrder
                  key={curr.id}
                  {...{ el: curr, order, setFreshStatus }}
                />
              );
            else if (
              freshStatus === "delivered" &&
              curr.action === ActionsMyOrdersBtns.REVIEW
            )
              content.push(
                <ButtonOrder key={curr.id} {...{ el: curr, order }} />
              );
            else {
              i++;
              continue;
            }

            i++;
          } while (i < buttonsMyOrders.length);

          return content;
        })()}
      </div>
    </div>
  );
};
export default MyOrdersItem;
