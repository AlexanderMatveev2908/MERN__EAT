import { FC } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { myRestaurantsName } from "../../../../config/fieldsArr/MyRestaurants/makeUpdate";
import FormFieldNoIcon from "../../../inputFields/FormFieldNoIcon";
import { PropsTypeFormContextRestaurants } from "../../MyRestaurantsForm";

const NameRestaurant: FC<PropsTypeFormContextRestaurants> = ({
  formContext,
}) => {
  const {
    register,
    formState: { errors },
  } = formContext;

  return (
    <div className="w-full flex flex-col gap-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <MdDriveFileRenameOutline className="h-[35px] w-[35px]" />
        Restaurant name
      </span>
      <div className="w-full justify-self-start grid lg:grid-cols-2 gap-y-3 gap-x-10">
        <FormFieldNoIcon {...{ field: myRestaurantsName, register, errors }} />
      </div>
    </div>
  );
};
export default NameRestaurant;
