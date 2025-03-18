import { FC } from "react";
import { useMySingleRestaurant } from "./useMySingleRestaurant";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import NoLengthResult from "../../../UI/components/NoLengthResult";
import DropOptionsBusiness from "./components/DropOptionsBusiness";
import ImgSlider from "../../../UI/components/ImgSlider/ImgSlider";
import DetailsRestaurantAdmin from "../../../UI/components/cards/restaurants/DetailsRestaurantAdmin";
import DetailsRestaurantUser from "../../../UI/components/cards/restaurants/DetailsRestaurantUser";
import DropElStatic from "../../../UI/components/DropElStatic";

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

      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 gap-x-6 items-start">
        <DetailsRestaurantUser {...{ rest, Container: DropElStatic }} />

        <DetailsRestaurantAdmin {...{ rest }} />
      </div>
    </div>
  );
};
export default MySingleRestaurant;
