import { ImageUploadedType } from "./API";

export type ResponseReviewType = {
  _id: string;
  owner: string;
  response: string;
  review: string;
};

export type ReviewType = {
  _id: string;
  user: string;
  restaurant: string;
  images: ImageUploadedType[];
  rating: number;
  comment: string;
  response?: ResponseReviewType;
};
