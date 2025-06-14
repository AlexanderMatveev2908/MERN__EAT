import { FC, useState } from "react";
import { FaDatabase, FaExternalLinkAlt } from "react-icons/fa";
import TooltipEL from "../../../UI/components/TooltipEL";
import { Link } from "react-router-dom";
import { IDPopulatedOrder, OrderType } from "../../../types/allTypes/orders";
import { MdOutlineSmsFailed } from "react-icons/md";
import { showCatRestMyDishes } from "../../../core/config/fieldsArr/allFields/MyDishes/show";
import DropElAbsolute from "../../../UI/components/DropElAbsolute";
import { HiBuildingStorefront } from "react-icons/hi2";
import DropHandlerIcon from "../../../UI/components/DropHandlerIcon";

type PropsType = {
  order: OrderType;
};

const ActivityClosedMaybe: FC<PropsType> = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  return !order?.restaurantId ? (
    <li className="w-full grid px-3">
      <div className="w-fit flex gap-5 justify-start items-center">
        <MdOutlineSmsFailed className="icon__base text-red-600 break-all" />
        <span className="txt__01">
          {order.restaurantName}&nbsp;
          <span className="txt__00">( Activity closed )</span>
        </span>
      </div>
    </li>
  ) : (
    <>
      <DropHandlerIcon
        {...{
          isOpen,
          setIsOpen,
          txt: "Restaurant",
          Icon: HiBuildingStorefront,
          customStyle: "px-3 border-b-2 border-orange-500 py-1",
        }}
      />

      <ul
        className={`w-full el__flow grid grid-cols-1 gap-4 px-3 ${
          isOpen
            ? "opacity-100 max-h-[500px] pointer-events-auto pt-3"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        <li className="w-full grid">
          <Link
            to={`/my-restaurants/${
              (order.restaurantId as IDPopulatedOrder)._id
            }`}
            className="w-fit el__after_below el__flow cursor-pointer hover:text-orange-500 flex gap-5 justify-start items-center"
          >
            <FaExternalLinkAlt className="icon__base" />
            <span className="txt__01">{order.restaurantName}</span>
          </Link>
        </li>

        <li className="w-full grid grid-cols-[80px_1fr]">
          <div className="w-full flex gap-5 justify-start items-center">
            <FaDatabase className="icon__base" />
            <span className="txt__01">Id</span>
          </div>

          <div className="flex w-full justify-start max-w-[95%]">
            <TooltipEL
              {...{
                txt: (order.restaurantId as IDPopulatedOrder)._id,
                label: "Id",
              }}
            />
          </div>
        </li>

        <DropElAbsolute
          {...{
            el: showCatRestMyDishes(
              (order.restaurantId as IDPopulatedOrder)?.categories ?? []
            ),
          }}
        />
      </ul>
    </>
  );
};
export default ActivityClosedMaybe;
