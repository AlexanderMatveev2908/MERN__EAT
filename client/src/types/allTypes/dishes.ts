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

export type DishType = {
  _id: string;
  restaurant: string;
  name: string;
  images: ImageUploadedType[];
  price: number;
  quantity: number;
};
