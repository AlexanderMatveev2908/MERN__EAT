import { ImageUploadedType } from "./API";

export type DishMenuFormType = {
  restaurant: string;
  name: string;
  quantity: number;
  price: number;
  images: File[] | ImageUploadedType[];
};

export type DishType = {
  _id: string;
  restaurant: string;
  name: string;
  images: ImageUploadedType[];
  price: number;
  quantity: number;
};
