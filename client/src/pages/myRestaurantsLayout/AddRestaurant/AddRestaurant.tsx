import { FC } from "react";
import { useAddRestaurant } from "./hooks/useAddRestaurant";
import MyRestaurantsForm from "../../../components/sharedForms/MyRestaurants/MyRestaurantsForm";

const AddRestaurant: FC = () => {
  const { register, errors, watch } = useAddRestaurant();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
      <span className="txt__04">Create new restaurant</span>

      <MyRestaurantsForm {...{ register, errors, watch }} />
    </div>
  );
};
export default AddRestaurant;
