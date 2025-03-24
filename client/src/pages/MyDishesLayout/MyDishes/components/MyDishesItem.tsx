import { FC, useState } from "react";
import { DishType } from "../../../../types/types";
import HeaderIDItem from "../../../../UI/components/cards/HeaderIDItem";
import DropHandlerIcon from "../../../../UI/components/DropHandlerIcon";
import {
  showCatRestMyDishes,
  showNumericValsMyDish,
} from "../../../../core/config/fieldsArr/allFields/MyDishes/show";
import DropElAbsolute from "../../../../UI/components/DropElAbsolute";
import { HiBuildingStorefront } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import DeleteButton from "../../../../UI/components/buttons/DeleteButton";
import { IoIosRestaurant } from "react-icons/io";
import { FaDatabase } from "react-icons/fa";
import TooltipEL from "../../../../UI/components/TooltipEL";
import HeaderCard from "../../../../UI/components/cards/HeaderCard";

type PropsType = {
  dish: DishType;
  toggleSelected: (val: string) => void;
  selected: string[];
};

const MyDishesItem: FC<PropsType> = ({ dish, toggleSelected, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`card__el ${
        selected.includes(dish._id)
          ? "border-red-600 opacity-50 scale-105"
          : "border-orange-500"
      }`}
    >
      <div className="w-full flex flex-col">
        <HeaderIDItem {...{ id: dish._id }} />

        <HeaderCard {...{ images: dish.images, name: dish.name }} />

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

              <span className="txt__01 justify-self-end">{dish.name}</span>
            </li>

            <li className="w-full grid grid-cols-[80px_1fr]">
              <div className="w-full flex gap-5 justify-start items-center">
                <FaDatabase className="icon__base" />
                <span className="txt__01">Id</span>
              </div>

              <div className="flex w-full justify-end">
                <TooltipEL {...{ txt: dish.restaurant, label: "Id" }} />
              </div>
            </li>

            <div className="-mx-3">
              <DropElAbsolute
                {...{ el: showCatRestMyDishes(dish.categories) }}
              />
            </div>
          </ul>

          <ul className="w-full grid grid-cols-1 gap-2 px-3">
            {showNumericValsMyDish(dish.price, dish.quantity).map((el, i) => (
              <li
                key={i}
                className="w-full grid grid-cols-[80px_1fr] first:pt-2"
              >
                <div className="w-full flex gap-5 items-center">
                  <el.icon className="icon__base" />

                  <span className="txt__01">{el.label}</span>
                </div>

                <span className="txt__01 justify-self-end">{el.val}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 mt-5 items-center">
        <Link
          to={`/my-dishes/update/${dish._id}`}
          className="el__flow el__after_below txt__02 justify-self-center w-fit flex gap-3 group cursor-pointer"
        >
          <RxUpdate className="icon__base el__flow group-hover:text-orange-500" />

          <span className="el__flow txt__02 group-hover:text-orange-500">
            Update
          </span>
        </Link>

        <div className="w-full flex justify-center">
          <DeleteButton
            {...{
              txt: "Delete",
              border: false,
              handleDelete: () => toggleSelected(dish._id),
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default MyDishesItem;
