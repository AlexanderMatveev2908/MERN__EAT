import { FC } from "react";
import HeaderNameImgItem from "./components/HeaderNameImgItem";
import {
  fieldsShowMyRestaurants,
  showMyRestaurantsDelivery,
  showMyRestaurantsDeliveryFields,
  showMyRestaurantsOpenHours,
  showMyRestaurantsOpenHoursFields,
} from "../../../config/fieldsArr/MyRestaurants/filterSort";
import DropEl from "./components/DropEl";
import { priceFormatter } from "../../../utils/priceFormatter";
import { MyRestaurantType } from "../../../types/myRestaurants";

type PropsType = {
  rest: MyRestaurantType;
};

const BasicCardAllUsers: FC<PropsType> = ({ rest }) => {
  return (
    <>
      <HeaderNameImgItem {...{ name: rest.name, url: rest.images[0].url }} />

      {fieldsShowMyRestaurants(
        Object.values(rest.address),
        Object.values(rest.contact),
        rest.categories
      ).map((el, i) => (
        <DropEl
          key={i}
          {...{
            el,
          }}
        />
      ))}

      <DropEl {...{ el: showMyRestaurantsOpenHours }}>
        {showMyRestaurantsOpenHoursFields(...Object.values(rest.openHours)).map(
          (el, i) => (
            <li
              key={i}
              className="px-3 transition-all duration-300 truncate pointer-events-none cursor-pointer flex items-center gap-3"
            >
              <el.icon className="w-[25px] h-[25px]" />

              <span className="txt__01">{el.val}</span>
            </li>
          )
        )}
      </DropEl>

      <DropEl {...{ el: showMyRestaurantsDelivery }}>
        {showMyRestaurantsDeliveryFields(...Object.values(rest.delivery)).map(
          (el, i) =>
            el.label === "Free meal" && !el.val ? null : (
              <li
                key={i}
                className="px-3 transition-all duration-300 truncate pointer-events-none cursor-pointer grid grid-cols-[125px_1fr]"
              >
                <span className="txt__01">{el.label}</span>

                <span className="txt__01">
                  {el.label !== "Delivery time"
                    ? priceFormatter(el.val)
                    : `${el.val} minutes`}
                </span>
              </li>
            )
        )}
      </DropEl>
    </>
  );
};
export default BasicCardAllUsers;
