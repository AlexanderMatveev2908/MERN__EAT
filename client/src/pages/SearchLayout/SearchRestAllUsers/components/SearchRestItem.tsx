import { FC } from "react";
import { RestaurantAllUsers } from "../../../../types/allTypes/search";
import DetailsRestaurantUser from "../../../../UI/components/cards/restaurants/DetailsRestaurantUser";
import DropElAbsolute from "../../../../UI/components/DropElAbsolute";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import HeaderName from "../../../../UI/components/cards/HeaderName";
import HeaderImgs from "../../../../UI/components/cards/HeaderImgs";

type PropsType = {
  rest: RestaurantAllUsers;
};

const SearchRestItem: FC<PropsType> = ({ rest }) => {
  return (
    <div className="card__el border-orange-500 relative">
      {/* IF USER OWN RESTAURANT CAN GO DO PAGE THAT SHOWS ORDERS COUNT AND OTHER SPECIAL INFO */}
      {rest.isAdmin && (
        <Link
          to={`/my-restaurants/${rest._id}`}
          className="absolute min-w-[150px] min-h-[50px] border-2 border-orange-500 rounded-xl bg-[#000] top-0 -translate-y-1/2 -right-6 z-20 flex gap-5 items-center px-3 pr-10 group cursor-pointer"
        >
          <MdAdminPanelSettings className="icon__base el__flow group-hover:text-orange-500" />

          <span className="txt__02 el__flow group-hover:text-orange-500">
            Admin page
          </span>
        </Link>
      )}

      <HeaderName {...{ name: rest.name }} />

      {/* after small for users i split card in two */}
      <div className="sm:grid grid-cols-2 place-items-center place-content-center">
        <div className="flex w-full sm:w-[90%] sm:h-[90%] sm:py-3 items-center sm:border-2 border-orange-500 rounded-xl">
          <HeaderImgs {...{ images: rest.images }} />
        </div>

        <div className="w-full grid grid-cols-1">
          <div className="pt-3 w-full el__flow grid grid-cols-1 gap-3">
            <DetailsRestaurantUser {...{ rest, Container: DropElAbsolute }} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-fit justify-center justify-self-center flex mt-5">
        <Link
          to={`/search/${rest._id}`}
          className="txt__02 border-2 border-orange-500 rounded-xl px-12 py-1 el__flow hover:text-orange-500 hover:scale-110 cursor-pointer"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
};
export default SearchRestItem;
