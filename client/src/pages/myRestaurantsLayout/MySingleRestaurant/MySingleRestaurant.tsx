import { FC } from "react";
import { useMySingleRestaurant } from "./useMySingleRestaurant";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import NoLengthResult from "../../../UI/components/NoLengthResult";
import DropOptionsBusiness from "./components/DropOptionsBusiness";
import ImgSlider from "../../../UI/components/ImgSlider/ImgSlider";
import PieceCardRestaurantPageAllUsers from "../../../UI/components/cards/restaurants/PieceCardRestaurantPageAllUsers";

const MySingleRestaurant: FC = () => {
  const {
    canStay,
    isPending,
    restaurant: rest,
    restId,
  } = useMySingleRestaurant();

  return !canStay ? (
    <Navigate to="/" replace />
  ) : isPending ? (
    <LoaderPageReact />
  ) : !Object.keys(rest ?? {}).length ? (
    <NoLengthResult
      {...{ txt: "It seems we did not find any restaurant 🧐" }}
    />
  ) : (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5">
      <span className="txt__05 truncate max-w-full">{rest.name}</span>

      <DropOptionsBusiness {...{ restId }} />

      <ImgSlider {...{ images: rest.images }} />

      <PieceCardRestaurantPageAllUsers {...{ rest }} />
    </div>
  );
};
export default MySingleRestaurant;
