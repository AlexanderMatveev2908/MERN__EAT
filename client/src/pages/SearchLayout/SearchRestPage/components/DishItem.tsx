import { FC } from "react";
import { DishType } from "../../../../types/types";
import HeaderImgs from "../../../../UI/components/cards/HeaderImgs";
import HeaderName from "../../../../UI/components/cards/HeaderName";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import ButtonsCart from "./components/ButtonsCart";
import { showNumericValsDishUser } from "../../../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { useUser } from "../../../../core/hooks/useGlobal";
import ButtonsCartNonLogged from "./components/ButtonsCartNonLogged";

type PropsType = {
  dish: DishType;
  isAdmin: boolean;
};

const DishItem: FC<PropsType> = ({ dish, isAdmin }) => {
  const { isLogged } = useUser();

  return (
    <div className="card__el border-orange-500 relative">
      {isAdmin && (
        <Link
          to={`/my-dishes/update/${dish._id}`}
          className="absolute min-w-[150px] min-h-[50px] border-2 border-orange-500 rounded-xl bg-[#000] top-0 -translate-y-1/2 -right-6 z-20 flex gap-5 items-center px-3 pr-10 group cursor-pointer"
        >
          <MdAdminPanelSettings className="icon__base el__flow group-hover:text-orange-500" />

          <span className="txt__02 el__flow group-hover:text-orange-500">
            Update dish
          </span>
        </Link>
      )}

      <HeaderName {...{ name: dish.name }} />

      <div className="sm:grid grid-cols-2 place-items-center place-content-center">
        <div className="flex w-full sm:w-[90%] sm:h-[90%] sm:py-3 items-center sm:border-2 border-orange-500 rounded-xl">
          <HeaderImgs {...{ images: dish.images }} />
        </div>

        <ul className="w-full grid grid-cols-1 gap-4 px-3 pr-6 sm:py-1 self-start">
          {showNumericValsDishUser(dish.price, dish.quantity).map((el, i) => (
            <li key={i} className="w-full grid grid-cols-[1fr_50px] first:pt-2">
              <div className="w-full flex gap-5 items-center">
                <el.icon className="icon__base" />

                <span className="txt__01">{el.label}</span>
              </div>

              <span className="txt__01 justify-self-end">{el.val}</span>
            </li>
          ))}

          {isLogged ? (
            <ButtonsCart {...{ dish }} />
          ) : (
            <ButtonsCartNonLogged {...{ dish }} />
          )}
        </ul>
      </div>
    </div>
  );
};
export default DishItem;
