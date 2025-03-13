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
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center mt-8 gap-5 place-content-start items-start">
          {restaurants?.map((rest) => (
            <RestaurantItem key={rest._id} {...{ rest }} />
          ))}
        </div>
      )}
    </div>
  );
};
export default MyRestaurants;
