import { FC, useState } from "react";
import { OrderType } from "../../../types/types";
import HeaderIDItem from "../../../UI/components/cards/HeaderIDItem";
import { MdAdminPanelSettings } from "react-icons/md";
import DropHandlerIcon from "../../../UI/components/DropHandlerIcon";
import { HiBuildingStorefront } from "react-icons/hi2";
import HeaderImgs from "../../../UI/components/cards/HeaderImgs";
import { IoIosRestaurant } from "react-icons/io";
import { FaDatabase } from "react-icons/fa";
import TooltipEL from "../../../UI/components/TooltipEL";
import DropElAbsolute from "../../../UI/components/DropElAbsolute";
import { showCatRestMyDishes } from "../../../core/config/fieldsArr/allFields/MyDishes/show";
import { IDPopulatedOrder } from "../../../types/allTypes/orders";

type PropsType = {
  order: OrderType;
};

const ManageOrderItem: FC<PropsType> = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card__el_grid border-orange-500 relative">
      {order.isAdmin && (
        <div className="absolute min-w-[150px] min-h-[50px] border-2 border-orange-500 rounded-xl bg-[#000] top-0 -translate-y-3/4 -right-6 z-20 flex gap-5 items-center px-3 pr-10 group cursor-pointer">
          <MdAdminPanelSettings className="icon__base el__flow group-hover:text-orange-500" />

          <span className="txt__02 el__flow group-hover:text-orange-500">
            My order
          </span>
        </div>
      )}

      <div className="w-full flex flex-col">
        <HeaderIDItem {...{ id: order._id as string }} />

        <HeaderImgs {...{ images: order.items.map((el) => el.images[0]) }} />

        <div className="w-full grid grid-cols-1">
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
            className={`w-full el__flow grid grid-cols-1 gap-3 px-3 ${
              isOpen
                ? "opacity-100 max-h-[500px] pointer-events-auto pt-3"
                : "opacity-0 max-h-0 pointer-events-none"
            }`}
          >
            <li className="w-full grid grid-cols-[80px_1fr]">
              <div className="w-full flex gap-5 justify-start items-center">
                <IoIosRestaurant className="icon__base" />
                <span className="txt__01">Name</span>
              </div>

              <span className="txt__01 justify-self-end">
                {order.restaurantName}
              </span>
            </li>

            <li className="w-full grid grid-cols-[80px_1fr]">
              <div className="w-full flex gap-5 justify-start items-center">
                <FaDatabase className="icon__base" />
                <span className="txt__01">Id</span>
              </div>

              <div className="flex w-full justify-end">
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
        </div>
      </div>
    </div>
  );
};
export default ManageOrderItem;
