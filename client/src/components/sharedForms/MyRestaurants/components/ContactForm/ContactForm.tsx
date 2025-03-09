import { FC } from "react";
import { myRestaurantsContact } from "../../../../../config/fieldsArr/myRestaurantsFields";
import FormFieldNoIcon from "../../../../commonCompForms/FormFieldNoIcon/FormFieldNoIcon";
import { UseFormReturn } from "react-hook-form";
import { AddRestaurantFormType } from "../../../../../types/myRestaurants";

type PropsType = {
  formContext: UseFormReturn<AddRestaurantFormType>;
};

const ContactForm: FC<PropsType> = ({ formContext }) => {
  const {
    register,
    formState: { errors },
  } = formContext;
  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03">Restaurant Address</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
        {myRestaurantsContact.map((el) => (
          <FormFieldNoIcon key={el.id} {...{ register, errors, field: el }} />
        ))}
      </div>
    </div>
  );
};
export default ContactForm;
