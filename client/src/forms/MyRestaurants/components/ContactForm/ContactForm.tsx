import { FC } from "react";
import { myRestaurantsContact } from "./../../../../config/fieldsArr/myRestaurantsFields";
import { UseFormReturn } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "./../../../../types/myRestaurants";
import { MdConnectWithoutContact } from "react-icons/md";
import FormFieldNoIcon from "../../../../components/commonCompForms/FormFieldNoIcon";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};

const ContactForm: FC<PropsType> = ({ formContext }) => {
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
