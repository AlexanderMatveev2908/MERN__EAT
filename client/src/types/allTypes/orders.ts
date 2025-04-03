import {
  ImageUploadedType,
  PageFormType,
  SearchBarForm,
  TimeStampSearch,
} from "./API";
import { DeliveryType } from "./restAdmin";
import { UserAddressType } from "./userTypes";

export type OrderItem = {
  dishId: string | null;

  name: string;
  price: number;
  quantity: number;
  images: ImageUploadedType[];
  _id: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type IDPopulatedOrder = {
  _id: string;
  delivery: DeliveryType;
};

export type OrderType = {
  paymentId: string | null;
  paymentClientSecret: string | null;
  _id?: string;
  userId: string;
  restaurantId: string | IDPopulatedOrder;

  restaurantName: string;
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

  isAdmin: boolean;

  createdAt: string;
};

export type SearchMyOrders = SearchBarForm &
  PageFormType &
  TimeStampSearch & {
    status: OrderStatus[];

    priceSort: string[];
    discountSort: string[];
  };
