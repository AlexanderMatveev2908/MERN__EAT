import { ImageUploadedType } from "./API";
import { DishType } from "./myDishes";
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

export type FormSearchType = {
  search: string;
  searchVals: string[];
  categories: string[];
  ordersStatus: string[];
  avgPriceRange: string[];
  avgQuantityRange: string[];
  avgRatingRange: string[];

  avgRatingSort: ["asc" | "desc"] | [];
  reviewsCountSort: ["asc" | "desc"] | [];
  avgPriceSort: ["asc" | "desc"] | [];
  dishesCountSort: ["asc" | "desc"] | [];
  avgQuantitySort: ["asc" | "desc"] | [];
  ordersCountSort: ["asc" | "desc"] | [];
  createdAtSort: ["asc" | "desc"] | [];
  updatedAtSort: ["asc" | "desc"] | [];
  pendingOrdersSort: ["asc" | "desc"] | [];
  processingOrdersSort: ["asc" | "desc"] | [];
  shippedOrdersSort: ["asc" | "desc"] | [];
  deliveredOrdersSort: ["asc" | "desc"] | [];
  cancelledOrdersSort: ["asc" | "desc"] | [];

  page: string;
  limit?: string;
};

export type DynamicFieldRating = {
  rating: string;
  count: number;
};
export type DynamicFieldOrder = {
  status: string;
  count: number;
};

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
  avgQuantity: number;

  ordersByStatus: DynamicFieldOrder[];

  ordersCount: number;

  reviewsByRating: DynamicFieldRating[];
  reviewsCount: number;
  avgRating: number;
};
