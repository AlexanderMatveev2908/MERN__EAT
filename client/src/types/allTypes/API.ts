import { AxiosError, AxiosResponse } from "axios";
import { CurrUserType } from "./userTypes";

export type ReturnAPIBasic =
  | {
      success: boolean;
      msg: string;
    }
  | undefined;

export type ReturnUserInfoAPIType = {
  user: CurrUserType;
};

export type ReturnAccessTokenAPIType = {
  accessToken: string;
};

export type ReturnManageAccountAPIType = {
  manageAccountToken: string;
};

export type ImageUploadedType = {
  _id: string;
  url: string;
  public_id: string;
};

export interface ErrFoodApp extends AxiosError {
  response?: AxiosResponse<{ msg: string; success: boolean }>;
}

export interface ErrFoodOrder extends AxiosError {
  response?: AxiosResponse<{ remakeCart: boolean; resetCoupon: boolean }>;
}

export type GetElsQueriedReturnType = {
  totDocuments: number;
  nHits: number;
  totPages: number;
};

export type PageFormType = {
  page?: string;
  limit?: string;
};

export type SearchBarForm = {
  search: string;
  searchVals: string[];
};

export type TimeStampSearch = {
  createdAtSort: string[];
  updatedAtSort: string[];
};

export type NumericFiltersSearch = {
  minPrice: string;
  maxPrice: string;
  minQuantity: string;
  maxQuantity: string;
};
