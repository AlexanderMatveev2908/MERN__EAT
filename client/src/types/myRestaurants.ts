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
    openTime: string;
    closeTime: string;
  };
  delivery: {
    estTimeDelivery: number;
    price: number;
    freeDeliveryPrice: number;
  };
  categories: string[];
  dishes?: DishType[];
  order: OrderType[];
  reviews: ReviewType[];
};
