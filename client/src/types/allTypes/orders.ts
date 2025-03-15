import { DishType } from "./dishes";
import { UserAddressType } from "./userTypes";

export type OrderType = {
  _id: string;
  restaurant: string;
  user: string;
  dishes: DishType[];
  discountAppliedByRestaurant: number;
  discountAppliedByCoupon: number;
  total: number;
  stateOrder: string;
  deliveryAddress: NonNullable<UserAddressType>;
  timeShouldArrive: string;
  createdAt: string;
  updatedAt: string;
};
