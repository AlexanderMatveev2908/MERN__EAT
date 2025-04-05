import { FC } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { OrderType } from "../../../types/types";
import { IDPopulatedOrder } from "../../../types/allTypes/orders";
import { MdOutlineSmsFailed } from "react-icons/md";

type PropsType = {
  order: OrderType;
};

const ActivityClosed: FC<PropsType> = ({ order }) => {
  return order.restaurantId ? (
    <li className="w-full grid">
      <Link
        to={`/search/${(order.restaurantId as IDPopulatedOrder)._id}`}
        className="w-fit el__after_below el__flow cursor-pointer hover:text-orange-500 flex gap-5 justify-start items-center"
      >
        <FaExternalLinkAlt className="icon__base" />
        <span className="txt__01">{order.restaurantName}</span>
      </Link>
    </li>
  ) : (
    <li className="w-full grid">
      <div className="w-fit flex gap-5 justify-start items-center">
        <MdOutlineSmsFailed className="icon__base text-red-600" />
        <span className="txt__01">
          {order.restaurantName}&nbsp;( Activity closed )
        </span>
      </div>
    </li>
  );
};
export default ActivityClosed;
