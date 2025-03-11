import { FC } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { PropsTypeFormContextRestaurants } from "../../MyRestaurantsForm";

const DeliveryTime: FC<PropsTypeFormContextRestaurants> = ({ formContext }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = formContext;

  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <MdDeliveryDining className="w-[35px] h-[35px]" />
        Estimate delivery time (in restaurant city)
      </span>

      <div className="w-full grid grid-cols-1 gap-y-5"></div>
    </div>
  );
};
export default DeliveryTime;
