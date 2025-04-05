import { FC } from "react";
import { useMySingleRestaurant } from "./useMySingleRestaurant";
import DropSingleRestPage from "./components/DropSingleRestPage";
import ImgSlider from "../../../UI/components/ImgSlider/ImgSlider";
import DetailsRestaurantAdmin from "../../../UI/components/cards/restaurants/DetailsRestaurantAdmin";
import DetailsRestaurantUser from "../../../UI/components/cards/restaurants/DetailsRestaurantUser";
import DropElStatic from "../../../UI/components/DropElStatic";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";
import { isObjOk } from "../../../utils/allUtils/validateData";

const MySingleRestaurant: FC = () => {
  useScrollTop();

  const {
    canStay,
    isPending,
    restaurant: rest,
    restId,
    error,
    isError,
  } = useMySingleRestaurant();

  return (
    <ParentContentLoading {...{ isPending, isError, error, canStay }}>
      {isObjOk(rest) && (
        <div className="w-full grid grid-cols-1 justify-items-center gap-5">
          <span className="txt__04 truncate max-w-full">{rest.name}</span>

          <DropSingleRestPage {...{ restId }} />

          <ImgSlider {...{ images: rest.images }} />

          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 gap-x-6 items-start">
            <DetailsRestaurantUser {...{ rest, Container: DropElStatic }} />

            <DetailsRestaurantAdmin {...{ rest }} />
          </div>
        </div>
      )}
    </ParentContentLoading>
  );
};
export default MySingleRestaurant;
