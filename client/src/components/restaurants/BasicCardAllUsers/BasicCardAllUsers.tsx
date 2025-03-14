import { FC, useState } from "react";
import {
  fieldsShowMyRestaurants,
  showMyRestaurantsDelivery,
  showMyRestaurantsDeliveryFields,
  showMyRestaurantsOpenHours,
  showMyRestaurantsOpenHoursFields,
} from "../../../config/fieldsArr/MyRestaurants/filterSort";
import DropEl from "./components/DropEl";
import { priceFormatter } from "../../../utils/priceFormatter";
import { MyRestaurantType } from "../../../types/restAdmin";
import { ChevronDown } from "lucide-react";

type PropsType = {
  rest: MyRestaurantType;
};

const BasicCardAllUsers: FC<PropsType> = ({ rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between border-b-2 border-orange-500 group cursor-pointer items-center px-3 py-1"
      >
        <span className="txt__02 el__flow group-hover:text-orange-500">
          Details
        </span>

        <ChevronDown
          className={`min-w-[40px] min-h-[40px] el__flow group-hover:text-orange-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`w-full el__flow grid grid-cols-1 gap-1 ${
          isOpen
            ? "opacity-100 max-h-[500px] pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
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
          {showMyRestaurantsOpenHoursFields(
            ...Object.values(rest.openHours)
          ).map((el, i) => (
            <li
              key={i}
              className="px-3 el__flow truncate pointer-events-none cursor-pointer flex items-center gap-3"
            >
              <el.icon className="w-[25px] h-[25px]" />

              <span className="txt__01">{el.val}</span>
            </li>
          ))}
        </DropEl>

        <DropEl {...{ el: showMyRestaurantsDelivery }}>
          {showMyRestaurantsDeliveryFields(...Object.values(rest.delivery)).map(
            (el, i) =>
              el.label === "Free meal" && !el.val ? null : (
                <li
                  key={i}
                  className="px-3 el__flow truncate pointer-events-none cursor-pointer grid grid-cols-[125px_1fr]"
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
      </div>
    </>
  );
};
export default BasicCardAllUsers;
