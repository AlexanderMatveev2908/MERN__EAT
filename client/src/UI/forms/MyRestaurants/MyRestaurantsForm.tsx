import { FC, FormEvent, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../types/allTypes/restAdmin";
import ContactForm from "./components/ContactForm/ContactForm";
import OpenHours from "./components/OpenHours/OpenHours";
import CatForm from "./components/CatForm/CatForm";
import NameRestaurant from "./components/NameRestaurant/NameRestaurant";
import ImagesRestaurant from "./components/ImagesRestaurant/ImagesRestaurant";
import Delivery from "./components/Delivery/Delivery";
import AddressForm from "./components/AddressForm/AddressForm";
import { useLocation } from "react-router-dom";
import ButtonAnimated from "../../components/buttons/ButtonAnimated";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
  handleSave: (e: FormEvent) => void;
  isPending: boolean;
  currFormAddress: number;
  setCurrFormAddress: React.Dispatch<SetStateAction<number>>;
};

export type PropsTypeFormContextRestaurants = {
  formContext: PropsType["formContext"];
};

const MyRestaurantsForm: FC<PropsType> = ({
  formContext,
  handleSave,
  isPending,
  currFormAddress,
  setCurrFormAddress,
}) => {
  const location = useLocation();

  return (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 justify-items-center gap-y-10"
    >
      <NameRestaurant {...{ formContext }} />

      <ImagesRestaurant {...{ formContext }} />

      <AddressForm
        {...{
          formContext,
          currForm: currFormAddress,
          setCurrForm: setCurrFormAddress,
        }}
      />

      <ContactForm {...{ formContext }} />

      <OpenHours {...{ formContext }} />

      <CatForm {...{ formContext }} />

      <Delivery {...{ formContext }} />

      <div className="w-[250px] sm:w-[325px] justify-center mt-10">
        <ButtonAnimated
          {...{
            label: `${
              location.pathname.includes("update") ? "Update" : "Create"
            } Restaurant`,
            type: "submit",
            styleTxt: "txt__02",
            isPending,
          }}
        />
      </div>
    </form>
  );
};
export default MyRestaurantsForm;
