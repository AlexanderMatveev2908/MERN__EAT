import { FC } from "react";
import { MyRestaurantType } from "../../../../types/types";
import DropElStatic from "../../DropElStatic";
import {
  fieldsShowMyRestaurants,
  makeSubFieldsOrders,
  showFieldOrders,
  showMyRestaurantsDelivery,
  showMyRestaurantsDeliveryFields,
  showMyRestaurantsOpenHours,
  showMyRestaurantsOpenHoursFields,
} from "../../../../core/config/fieldsArr/fields";
import { priceFormatter } from "../../../../utils/utils";

type PropsType = {
  rest: MyRestaurantType;
};

const PieceCardRestaurantPageAllUsers: FC<PropsType> = ({ rest }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
      {fieldsShowMyRestaurants(
        Object.values(rest.address),
        Object.values(rest.contact),
        rest.categories
      ).map((el) => (
        <DropElStatic
          key={el.id}
          {...{ el, cols: el.label === "Categories" }}
        />
      ))}

      <DropElStatic {...{ el: showMyRestaurantsOpenHours, cols: true }}>
        {showMyRestaurantsOpenHoursFields(...Object.values(rest.openHours)).map(
          (el) => (
            <li
              key={el.id}
              className="px-3 el__flow overflow-x-auto hide_scrollbar pointer-events-none cursor-pointer flex items-center gap-3"
            >
              <el.icon className="w-[25px] h-[25px]" />

              <span className="txt__01">{el.val}</span>
            </li>
          )
        )}
      </DropElStatic>

      <DropElStatic {...{ el: showMyRestaurantsDelivery }}>
        {showMyRestaurantsDeliveryFields(...Object.values(rest.delivery)).map(
          (el) =>
            el.label === "Free meal" && !el.val ? null : (
              <li
                key={el.id}
                className="px-3 el__flow overflow-x-auto hide_scrollbar  cursor-pointer grid grid-cols-[1fr_100px]"
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
      </DropElStatic>

      <DropElStatic {...{ el: showFieldOrders }}></DropElStatic>
    </div>
  );
};
export default PieceCardRestaurantPageAllUsers;
