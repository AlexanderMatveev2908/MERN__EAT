import { FC } from "react";
import { OrderType } from "../../../../types/types";
import HeaderIDItem from "../../../../UI/components/cards/HeaderIDItem";
import HeaderImgs from "../../../../UI/components/cards/HeaderImgs";
import AdminLink from "../../../../UI/components/cards/AdminLink";
import DetailsOrderUser from "../../../../UI/components/cards/orders/DetailsOrderUser";

type PropsType = {
  order: OrderType;
};

const MyOrdersItem: FC<PropsType> = ({ order }) => {
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
          <div className="pt-3 w-full el__flow grid grid-cols-1 gap-3 items-start h-full">
            <DetailsOrderUser {...{ order }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyOrdersItem;
