import { FC, useEffect } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { PropsTypeFormContextRestaurants } from "../../MyRestaurantsForm";
import { myRestaurantsDeliveryFields } from "../../../../config/fieldsArr/MyRestaurants/makeUpdate";
import FormFieldNoIcon from "../../../../components/commonCompForms/FormFieldNoIcon";

const Delivery: FC<PropsTypeFormContextRestaurants> = ({ formContext }) => {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
  } = formContext;

  const chargeDelivery = watch("price");

  useEffect(() => {
    if (chargeDelivery) trigger("freeDeliveryPrice");
  }, [chargeDelivery, trigger]);

  const customValidateDeliveryTime = (val: string) => {
    const diff = +watch("closeTime") - +watch("openTime");

    return diff > 0 && diff < +val
      ? "Delivery time can not take more than your business activity"
      : true;
  };
  const customValidateDeliveryFree = (val: string) =>
    !watch("price") && val
      ? "You can not set a free delivery without a delivery charge"
      : true;

  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <MdDeliveryDining className="w-[40px] h-[40px]" />
        Delivery
      </span>

      <div className="w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-10 lg:grid-cols-3">
        {myRestaurantsDeliveryFields.map((el) => (
          <FormFieldNoIcon
            key={el.id}
            {...{
              register,
              errors,
              field: el,
              customValidate:
                el.field === "estTimeDelivery"
                  ? customValidateDeliveryTime
                  : el.field === "freeDeliveryPrice"
                  ? customValidateDeliveryFree
                  : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default Delivery;
