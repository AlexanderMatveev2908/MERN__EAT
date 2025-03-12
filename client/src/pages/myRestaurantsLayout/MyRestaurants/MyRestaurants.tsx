import { FC } from "react";
import { useMyRestaurants } from "./useMyRestaurants";
import NoLengthResult from "../../../components/NoLengthResult";
import LoaderPageReact from "../../../components/loaders/LoaderPageReact/LoaderPageReact";
import RestaurantItem from "./components/RestaurantItem";

const MyRestaurants: FC = () => {
  const { isPending, restaurants, totRestaurants } = useMyRestaurants();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center">
      <span className="txt__04">My Restaurants</span>

      {isPending ? (
        <LoaderPageReact />
      ) : !totRestaurants ? (
        <NoLengthResult
          {...{ txt: "It seems you do not have any restaurants right now 🧐" }}
        />
      ) : (
        <div className="w-full grid grid-cols-1 justify-items-center mt-8 gap-5">
          {restaurants?.map((el) => (
            <RestaurantItem key={el._id} {...{ el }} />
          ))}
        </div>
      )}
    </div>
  );
};
export default MyRestaurants;
