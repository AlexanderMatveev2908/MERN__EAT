import { FC } from "react";
import { myRestaurantsContact } from "../../../../config/fieldsArr/MyRestaurants/makeUpdate";
import { MdConnectWithoutContact } from "react-icons/md";
import FormFieldNoIcon from "../../../inputFields/FormFieldNoIcon";
import { PropsTypeFormContextRestaurants } from "../../MyRestaurantsForm";

const ContactForm: FC<PropsTypeFormContextRestaurants> = ({ formContext }) => {
  const {
    register,
    formState: { errors },
  } = formContext;
  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <MdConnectWithoutContact className="w-[35px] h-[35px]" />
        Contact
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
        {myRestaurantsContact.map((el) => (
          <FormFieldNoIcon key={el.id} {...{ register, errors, field: el }} />
        ))}
      </div>
    </div>
  );
};
export default ContactForm;
