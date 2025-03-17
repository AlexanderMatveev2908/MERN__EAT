import { ImageUploadedType } from "./API";
import { DishType } from "./dishes";
import { OrderType } from "./orders";
import { ReviewType } from "./reviews";

export type RestaurantAddressType = {
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type RestaurantContactType = {
  email: string;
  phone: string;
  website: string;
};

export type RestaurantOpenHoursType = {
  openTime: string;
  closeTime: string;
};

export type DeliveryType = {
  estTimeDelivery: string;
  price: string;
  freeDeliveryPrice: string;
};

export type MyRestaurantsAddUpdateFormType = {
  name: string;
  categories: string[];
  images: File[] | ImageUploadedType[];
} & RestaurantAddressType &
  RestaurantOpenHoursType &
  RestaurantContactType &
  DeliveryType;

export type MyRestaurantType = {
  _id: string;
  name: string;
  images: ImageUploadedType[];
  address: RestaurantAddressType;
  contact: RestaurantContactType;
  openHours: {
    openTime: number;
    closeTime: number;
  };
  delivery: {
    estTimeDelivery: number;
    price: number;
    freeDeliveryPrice: number;
  };
  categories: string[];

  dishes?: DishType[];
  orders?: OrderType[];
  reviews?: ReviewType[];

  dishesCount: number;
  avgPrice: number;

  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  ordersCount: number;

  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
  reviewsCount: number;
  avgRating: number;
};
