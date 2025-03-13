import { FC } from "react";
import { useUpdateRestaurant } from "./useUpdateRestaurant";

const UpdateRestaurant: FC = () => {
  useUpdateRestaurant();

  return <div>UpdateRestaurant</div>;
};
export default UpdateRestaurant;
