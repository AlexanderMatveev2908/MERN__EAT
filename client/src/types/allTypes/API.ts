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
