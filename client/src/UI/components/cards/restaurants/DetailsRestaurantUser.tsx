import { FC, ReactNode } from "react";
import {
  fieldsShowMyRestaurants,
  showMyRestaurantsDelivery,
  showMyRestaurantsDeliveryFields,
  showMyRestaurantsOpenHours,
  showMyRestaurantsOpenHoursFields,
} from "../../../../core/config/fieldsArr/fields.ts";
import { priceFormatter } from "../../../../utils/allUtils/priceFormatter.ts";
import { MyRestaurantType } from "../../../../types/allTypes/restAdmin.ts";
import { IconType } from "react-icons/lib";

type PropsContainer = {
  el: {
    id: string;
    label: string;
    icon: IconType;
    vals?: string[] | number[];
  };
  children?: ReactNode;
};

type PropsType = {
  rest: MyRestaurantType;
  Container: FC<PropsContainer>;
};

const DetailsRestaurantUser: FC<PropsType> = ({ rest, Container }) => {
  return (
    <>
      {fieldsShowMyRestaurants(
        Object.values(rest.address),
        Object.values(rest.contact),
        rest.categories
      ).map((el, i) => (
        <Container
          key={i}
          {...{
            el,
          }}
        />
      ))}

      <Container {...{ el: showMyRestaurantsOpenHours }}>
        {showMyRestaurantsOpenHoursFields(...Object.values(rest.openHours)).map(
          (el, i) => (
            <li
              key={i}
              className="el__flow overflow-x-auto hide_scrollbar pointer-events-none cursor-pointer flex items-center gap-3"
            >
              <el.icon className="w-[25px] h-[25px]" />

              <span className="txt__01">{el.val}</span>
            </li>
          )
        )}
      </Container>

      <Container {...{ el: showMyRestaurantsDelivery }}>
        {showMyRestaurantsDeliveryFields(...Object.values(rest.delivery)).map(
          (el, i) =>
            el.label === "Free meal" && !el.val ? null : (
              <li
                key={i}
                className="el__flow overflow-x-auto hide_scrollbar  cursor-pointer grid grid-cols-[150px_1fr]"
              >
                <span className="txt__01">{el.label}</span>

                <span className="txt__01 justify-self-end">
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
      </Container>
    </>
  );
};
export default DetailsRestaurantUser;
