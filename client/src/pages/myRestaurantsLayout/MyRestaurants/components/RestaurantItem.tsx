import { FC, useState } from "react";
import { MyRestaurantType } from "../../../../types/allTypes/restAdmin";
import HeaderIDItem from "../../../../UI/components/cards/HeaderIDItem";
import { Link } from "react-router-dom";
import DropElAbsolute from "../../../../UI/components/DropElAbsolute";
import DetailsRestaurantAdmin from "../../../../UI/components/cards/restaurants/DetailsRestaurantAdmin";
import DetailsRestaurantUser from "../../../../UI/components/cards/restaurants/DetailsRestaurantUser";
import { HiBuildingStorefront } from "react-icons/hi2";
import DropHandlerIcon from "../../../../UI/components/DropHandlerIcon";
import HeaderCard from "../../../../UI/components/cards/HeaderCard";

type PropsType = {
  rest: MyRestaurantType;
};

const RestaurantItem: FC<PropsType> = ({ rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card__el_grid border-orange-500">
      <div className="w-full flex flex-col">
        <HeaderIDItem {...{ id: rest._id }} />

        <HeaderCard {...{ images: rest.images, name: rest.name }} />

        <div className="w-full grid grid-cols-1">
          <DropHandlerIcon
            {...{
              isOpen,
              setIsOpen,
              txt: "Details",
              Icon: HiBuildingStorefront,
              customStyle: "px-3 border-b-2 border-orange-500 py-1",
            }}
          />

          <div
            className={`w-full el__flow grid grid-cols-1 gap-3 ${
              isOpen
                ? "opacity-100 max-h-[500px] pointer-events-auto pt-3"
                : "opacity-0 max-h-0 pointer-events-none"
            }`}
          >
            <DetailsRestaurantUser {...{ rest, Container: DropElAbsolute }} />
          </div>

          <DetailsRestaurantAdmin {...{ rest }} />
        </div>
      </div>

      <div className="w-full max-w-fit justify-center justify-self-center flex mt-5">
        <Link
          to={`/my-restaurants/${rest._id}`}
          className="txt__02 border-2 border-orange-500 rounded-xl px-12 py-1 el__flow hover:text-orange-500 hover:scale-110 cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
export default RestaurantItem;
