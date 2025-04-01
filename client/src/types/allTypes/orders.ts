import { ImageUploadedType } from "./API";
import { UserAddressType } from "./userTypes";

export type OrderItem = {
  dishId: string | null;

  name: string;
  price: number;
  quantity: number;
  images: ImageUploadedType[];
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderType = {
  paymentId: string | null;
  paymentClientSecret: string | null;
  _id?: string;
  userId: string;
  restaurantId: string;
  contactRestaurant: {
    phone: string;
    email: string;
    website: string;
  };
  items: OrderItem[];
  addressUser: UserAddressType;
  infoUser: {
    firstName: string;
    lastName: string;
    email: string;
  };
  totPrice: number;
  delivery: number;
  discount: number;
  coupon: string | null;
  status: OrderStatus;
};
