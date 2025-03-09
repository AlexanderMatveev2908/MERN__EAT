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
