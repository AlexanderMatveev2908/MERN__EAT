/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";
import {
  fieldsShowMyRestaurants,
  showMyRestaurantsDelivery,
  showMyRestaurantsDeliveryFields,
  showMyRestaurantsOpenHours,
  showMyRestaurantsOpenHoursFields,
} from "../../../../core/config/fieldsArr/fields.ts";
import { priceFormatter } from "../../../../utils/allUtils/priceFormatter.ts";
import { IconType } from "react-icons/lib";
import { RestaurantAllUsers } from "../../../../types/allTypes/search.ts";
import { MyRestaurantType } from "../../../../types/types.ts";
import { Ri24HoursLine } from "react-icons/ri";

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
  rest: RestaurantAllUsers | MyRestaurantType;
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
        {(() => {
          const els = showMyRestaurantsOpenHoursFields(
            ...Object.values(rest.openHours)
          );
          const content: any = [];

          let i = 0;

          do {
            if (els[i].val === els?.[i + 1]?.val) {
              content.push(
                <li
                  key={i}
                  className="el__flow overflow-x-auto hide_scrollbar pointer-events-none cursor-pointer flex items-center gap-3 col-span-2"
                >
                  <Ri24HoursLine className="w-[25px] h-[25px]" />

                  <span className="txt__01">Always open</span>
                </li>
              );

              break;
            } else {
              const Icon = els[i].icon;
              content.push(
                <li
                  key={i}
                  className="el__flow overflow-x-auto hide_scrollbar pointer-events-none cursor-pointer flex items-center gap-3"
                >
                  <Icon className="w-[25px] h-[25px]" />

                  <span className="txt__01">{els[i].val}</span>
                </li>
              );
              i++;
            }
          } while (i < els.length);

          return content;
        })()}
      </Container>

      <Container {...{ el: showMyRestaurantsDelivery }}>
        {showMyRestaurantsDeliveryFields(...Object.values(rest.delivery)).map(
          (el, i) =>
            //  if no data about free meal no need to show it as $0.00 cause implicit
            el.label === "Free meal" && !el.val ? null : (
              <li
                key={i}
                className="el__flow cursor-pointer grid grid-cols-[120px_1fr]"
              >
                <span className="txt__01">{el.label}</span>

                <span className="txt__01 justify-self-end max-w-full overflow-x-auto text-nowrap hide_scrollbar ">
                  {el.label !== "Time"
                    ? //  for time used proper time formatter
                      priceFormatter({
                        price: el.val as number,
                        showStr: true,
                      })
                    : `${el.val} minute${(el.val as number) > 1 ? "s" : ""}`}
                </span>
              </li>
            )
        )}
      </Container>
    </>
  );
};
export default DetailsRestaurantUser;
