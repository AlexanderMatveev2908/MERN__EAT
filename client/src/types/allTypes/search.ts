import { MyRestaurantType } from "./restAdmin";

export type SearchFormType = {
  search: string;
  searchVals: string[];
  categories: string[];
  avgPriceRange: string[];
  avgRatingRange: string[];

  avgRatingSort: ["asc" | "desc"] | [];
  avgPriceSort: ["asc" | "desc"] | [];
  deliveryTimeSort: ["asc" | "desc"] | [];
  deliveryPriceSort: ["asc" | "desc"] | [];

  page?: string;
  limit?: string;
};

export type RestaurantAllUsers = Omit<
  MyRestaurantType,
  "ordersByStatus" | "ordersCount"
> & {
  isAdmin: boolean;
};

export type SearchDishesFormType = {
  minPrice: string;
  maxPrice: string;
  minQuantity: string;
  maxQuantity: string;
  priceSort: [];
  quantitySort: [];

  page?: string;
  limit?: string;
};
