import {
  ImageUploadedType,
  NumericFiltersSearch,
  PageFormType,
  SearchBarForm,
  TimeStampSearch,
} from "./API";

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
  categories: string[];

  priceSort: [];
  quantitySort: [];
} & NumericFiltersSearch &
  SearchBarForm &
  TimeStampSearch &
  PageFormType;

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
