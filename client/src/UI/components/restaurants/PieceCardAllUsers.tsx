import { FC, useState } from "react";
import {
  fieldsShowMyRestaurants,
  showMyRestaurantsDelivery,
  showMyRestaurantsDeliveryFields,
  showMyRestaurantsOpenHours,
  showMyRestaurantsOpenHoursFields,
} from "../../../core/config/fieldsArr/fields";
import { priceFormatter } from "../../../utils/allUtils/priceFormatter";
import { MyRestaurantType } from "../../../types/allTypes/restAdmin";
import { HiBuildingStorefront } from "react-icons/hi2";
import DropHandlerIcon from "../cardsEls/DropHandlerIcon";
import DropElAbsolute from "../cardsEls/DropElAbsolute";

type PropsType = {
  rest: MyRestaurantType;
};

const PieceCardAllUsers: FC<PropsType> = ({ rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropHandlerIcon
        {...{
          isOpen,
          setIsOpen,
          txt: "Details",
          Icon: HiBuildingStorefront,
          customStyle: "px-3 border-b-2 border-orange-500 py-1",
        }}
      />

      <div
        className={`w-full el__flow grid grid-cols-1 gap-3 ${
          isOpen
            ? "opacity-100 max-h-[500px] pointer-events-auto pt-3"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {fieldsShowMyRestaurants(
          Object.values(rest.address),
          Object.values(rest.contact),
          rest.categories
        ).map((el, i) => (
          <DropElAbsolute
            key={i}
            {...{
              el,
            }}
          />
        ))}

        <DropElAbsolute {...{ el: showMyRestaurantsOpenHours }}>
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
        </DropElAbsolute>

        <DropElAbsolute {...{ el: showMyRestaurantsDelivery }}>
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
                      ? priceFormatter({
                          price: el.val as number,
                          showStr: true,
                        })
                      : `${el.val} minutes`}
                  </span>
                </li>
              )
          )}
        </DropElAbsolute>
      </div>
    </>
  );
};
export default PieceCardAllUsers;
