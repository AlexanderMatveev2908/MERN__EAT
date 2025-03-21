import { FC, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { PropsTypeFormContextRestaurants } from "../../MyRestaurantsForm";
import { myRestaurantsOpenCloseFields } from "../../../../../core/config/fieldsArr/fields";
import FormFieldNoIcon from "../../../inputFields/FormFieldNoIcon";
import { getDiffTime } from "../../../../../utils/utils";

const OpenHours: FC<PropsTypeFormContextRestaurants> = ({ formContext }) => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = formContext;

  const open = watch("openTime");
  const close = watch("closeTime");

  useEffect(() => {
    const updateErrs = () => {
      const res = getDiffTime(close, open);
      if (res !== 0) {
        trigger("openTime");
        trigger("closeTime");
      }
    };

    updateErrs();
  }, [open, close, trigger]);

  const customValidateClose = (val: string) => {
    const res = getDiffTime(val, watch("openTime"));
    if (res < 4) return "You must keep open at least 4 hours (part-time)";

    return true;
  };

  const customValidateOpen = (val: string) => {
    const res = getDiffTime(watch("closeTime"), val);
    if (res < 4) return "You must keep open at least 4 hours (part-time)";

    return true;
  };

  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <FaRegClock className="w-[35px] h-[35px]" />
        Opening and closing times
      </span>

      <div className="w-full sm:grid grid-cols-2 gap-5">
        {myRestaurantsOpenCloseFields.map((el) => (
          <FormFieldNoIcon
            key={el.id}
            {...{
              field: el,
              errors,
              register,
              customValidate:
                el.field === "closeTime"
                  ? customValidateClose
                  : customValidateOpen,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default OpenHours;
