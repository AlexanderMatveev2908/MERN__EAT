import { FC, useState } from "react";
import { RestaurantAllUsers } from "../../../types/allTypes/search";
import DetailsRestaurantUser from "../../../UI/components/cards/restaurants/DetailsRestaurantUser";
import DropElAbsolute from "../../../UI/components/DropElAbsolute";
import HeaderName from "../../../UI/components/cards/HeaderName";
import HeaderImgs from "../../../UI/components/cards/HeaderImgs";
import { HiBuildingStorefront } from "react-icons/hi2";
import DropHandlerIcon from "../../../UI/components/DropHandlerIcon";
import { Link } from "react-router-dom";

type PropsType = {
  rest: RestaurantAllUsers;
};

const SearchRestItem: FC<PropsType> = ({ rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card__el border-orange-500">
      <HeaderImgs {...{ images: rest.images }}>
        <HeaderName {...{ name: rest.name }} />
      </HeaderImgs>

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
      </div>

      <Link className=""></Link>
    </div>
  );
};
export default SearchRestItem;
