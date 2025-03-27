import { FC } from "react";
import {
  showBasicFieldsRating,
  showFieldDishes,
  showFieldReviews,
} from "../../../../core/config/fieldsArr/fields";
import { RestaurantAllUsers } from "../../../../types/allTypes/search";
import DropElAbsolute from "../../DropElAbsolute";
import { showStatsPriceUser } from "../../../../core/config/fieldsArr/allFields/SearchRestAllUsers/show";

type PropsType = {
  rest: RestaurantAllUsers;
};

const DetailsRestUserStats: FC<PropsType> = ({ rest }) => {
  return (
    <>
      <DropElAbsolute {...{ el: showFieldReviews }}>
        {showBasicFieldsRating(rest.avgRating, rest.reviewsCount).map((el) => (
          <li
            key={el.id}
            className="w-full grid grid-cols-[1fr_50px] items-center"
          >
            <span className="txt__01">{el.label}</span>

            <span className="txt__02 justify-self-end">{el.field}</span>
          </li>
        ))}
      </DropElAbsolute>

      <DropElAbsolute {...{ el: showFieldDishes }}>
        {showStatsPriceUser(rest.avgPrice, rest.dishesCount).map((el) => (
          <li
            key={el.id}
            className="w-full grid grid-cols-[1fr_50px] items-center"
          >
            <span className="txt__01">{el.label}</span>

            <span className="txt__02 justify-self-end">{el.field}</span>
          </li>
        ))}
      </DropElAbsolute>
    </>
  );
};
export default DetailsRestUserStats;
