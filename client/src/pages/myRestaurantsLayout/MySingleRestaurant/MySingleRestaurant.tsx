import { FC } from "react";
import { useMySingleRestaurant } from "./useMySingleRestaurant";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import NoLengthResult from "../../../UI/components/NoLengthResult";

import DropOptions from "./components/DropOptions";

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
    <div className="w-full grid grid-cols-1 justify-items-center">
      <span className="txt__04">{rest.name}</span>

      <DropOptions {...{ restId }} />

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit animi
        aut laudantium? Maxime praesentium veniam quis voluptatum, aspernatur
        velit nostrum expedita corporis nobis similique illum, libero ratione
        rem sunt numquam!
      </p>
    </div>
  );
};
export default MySingleRestaurant;
