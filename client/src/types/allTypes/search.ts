import {
  NumericFiltersSearch,
  PageFormType,
  SearchBarForm,
  TimeStampSearch,
} from "./API";
import { MyRestaurantType } from "./restAdmin";

export type SearchFormType = {
  categories: string[];
  avgPriceRange: string[];
  avgRatingRange: string[];
  openHours: string[];
  avgRatingSort: ["asc" | "desc"] | [];
  avgPriceSort: ["asc" | "desc"] | [];
  deliveryTimeSort: ["asc" | "desc"] | [];
  deliveryPriceSort: ["asc" | "desc"] | [];
  dishesCountSort: ["asc" | "desc"] | [];
} & PageFormType &
  SearchBarForm;

export type RestaurantAllUsers = Omit<
  MyRestaurantType,
  "ordersByStatus" | "ordersCount"
> & {
  isAdmin: boolean;
};

export type SearchDishesFormType = {
  priceSort: string[];
  quantitySort: string[];
} & PageFormType &
  TimeStampSearch &
  NumericFiltersSearch;
