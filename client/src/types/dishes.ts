import { ImageUploadedType } from "./API";

export type DishMenuFormType = {
  name: string;
  quantity: number;
  price: number;
  discount: number;
  description: string;
  images: File[];
};

export type DishType = {
  _id: string;
  restaurant: string;
  name: string;
  images: ImageUploadedType;
  description: string;
  price: number;
  discount: number;
  quantity: number;
};
