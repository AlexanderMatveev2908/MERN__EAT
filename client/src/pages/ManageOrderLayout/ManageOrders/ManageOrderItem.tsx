import { FC } from "react";
import { OrderType } from "../../../types/types";
import HeaderIDItem from "../../../UI/components/cards/HeaderIDItem";
import { MdAdminPanelSettings } from "react-icons/md";
import HeaderImgs from "../../../UI/components/cards/HeaderImgs";
import { Link, useNavigate } from "react-router-dom";
import DetailsOrderUser from "../../../UI/components/cards/orders/DetailsOrderUser";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import ActivityClosedMaybe from "./ActivityClosedMaybe";

type PropsType = {
  order: OrderType;
};

const ManageOrderItem: FC<PropsType> = ({ order }) => {
  const navigate = useNavigate();

  const { formContextSearchMyOrders } = useFormsCustom();
  const handleClickIsAdmin = () => {
    const { setValue } = formContextSearchMyOrders;

    setValue("searchVals", ["id"]);
    setValue("search", order._id as string);
    navigate("/my-orders");
  };

  return (
    <div className="card__el_grid border-orange-500 relative">
      {order.isAdmin && (
        <button
          onClick={handleClickIsAdmin}
          className="absolute min-w-[150px] min-h-[50px] border-2 border-orange-500 rounded-xl bg-[#000] top-0 -translate-y-3/4 -right-6 z-20 flex gap-5 items-center px-3 pr-10 group cursor-pointer"
        >
          <MdAdminPanelSettings className="icon__base el__flow group-hover:text-orange-500" />

          <span className="txt__02 el__flow group-hover:text-orange-500">
            My order
          </span>
        </button>
      )}

      <div className="w-full flex flex-col">
        <HeaderIDItem {...{ id: order._id as string }} />

        <HeaderImgs {...{ images: order.items.map((el) => el.images[0]) }} />

        <ActivityClosedMaybe {...{ order }} />

        <div className="px-3 mt-3">
          <DetailsOrderUser {...{ order }} />
        </div>
      </div>

      {!["pending", "cancelled"].includes(order.status) &&
        order?.restaurantId && (
          <Link
            to={`/manage-orders/${order._id}`}
            className="btn__order el__after_below_dynamic el__flow justify-self-center mt-4"
            style={{ "--col-btn": "#ea580c" } as React.CSSProperties}
          >
            <span className="txt__02">Update status</span>
          </Link>
        )}
    </div>
  );
};
export default ManageOrderItem;
