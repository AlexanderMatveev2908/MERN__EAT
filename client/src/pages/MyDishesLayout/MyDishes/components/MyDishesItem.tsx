import { FC, useState } from "react";
import { DishType } from "../../../../types/types";
import HeaderIDItem from "../../../../UI/components/cards/HeaderIDItem";
import HeaderImgs from "./../../../../UI/components/cards/HeaderImgs";
import HeaderName from "../../../../UI/components/cards/HeaderName";
import DropHandlerIcon from "../../../../UI/components/DropHandlerIcon";
import {
  showCatRestMyDishes,
  showMyDishesInfoRest,
  showNumericValsMyDish,
} from "../../../../core/config/fieldsArr/allFields/MyDishes/show";
import DropElAbsolute from "../../../../UI/components/DropElAbsolute";
import { HiBuildingStorefront } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import DeleteButton from "../../../../UI/components/buttons/DeleteButton";

type PropsType = {
  dish: DishType;
  toggleSelected: (val: string) => void;
  selected: string[];
};

const MyDishesItem: FC<PropsType> = ({ dish, toggleSelected, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`w-full grid grid-cols-1 border-[3px] rounded-xl border-orange-500 max-w-[400px] place-content-start justify-items-start items-start pt-1 pb-6 el__flow ${
        selected.includes(dish._id)
          ? "border-red-600 opacity-50 scale-105"
          : "border-orange-500"
      }`}
    >
      <div className="w-full flex flex-col">
        <HeaderIDItem {...{ id: dish._id }} />

        <HeaderImgs {...{ images: dish.images }}>
          <HeaderName {...{ name: dish.name }} />
        </HeaderImgs>

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
            {showMyDishesInfoRest(dish.restaurantName, dish.restaurant).map(
              (el) => (
                <li key={el.id} className="w-full grid grid-cols-[80px_1fr]">
                  <span className="txt__01 overflow-x-auto hide_scrollbar">
                    {el.label}
                  </span>

                  <span className="txt__01 overflow-x-auto hide_scrollbar p-1 pl-3 border-2 border-orange-500 rounded-xl">
                    {el.val}
                  </span>
                </li>
              )
            )}
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
                  <el.icon className="min-w-[30px] min-h-[30px]" />

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
          <RxUpdate className="min-w-[30px] min-h-[30px] el__flow group-hover:text-orange-500" />

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
