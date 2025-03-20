import { ImageUploadedType } from "./API";

export type DishFormItemType = {
  name: string;
  quantity: string;
  price: string;
  images: File[] | ImageUploadedType[];
};

export type DishMenuFormType = {
  restaurant: string;
  items: DishFormItemType[];
};

export type SearchMyDishesFormType = {
  search: string;
  searchVals: string[];

  minPrice: string;
  maxPrice: string;
  minQuantity: string;
  maxQuantity: string;

  categories: string[];

  createdAtSort: ["asc" | "desc"];
  updatedAtSort: ["asc" | "desc"];
  avgPriceSort: ["asc" | "desc"];
  avgQuantitySort: ["asc" | "desc"];

  page: string;
  limit: string;
};

export type DishType = {
  _id: string;
  restaurant: string;
  restaurantName: string;
  categories: string[];
  name: string;
  images: ImageUploadedType[];
  price: number;
  quantity: number;
};
