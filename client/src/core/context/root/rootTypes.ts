import { UseFormReturn } from "react-hook-form";
import {
  PopupActionTypes,
  PopupStateType,
  PopupValsType,
} from "../../../types/allTypes/popup";
import {
  ToastActionTypes,
  ToastStateType,
  ToastValsType,
} from "../../../types/allTypes/toastTypes";
import {
  UserActionTypes,
  UserStateType,
  UserValsType,
} from "../../../types/allTypes/userTypes";
import { FormSearchType } from "../../../types/allTypes/restAdmin";
import { DishMenuFormType } from "../../../types/types";
import { SearchMyDishesFormType } from "../../../types/allTypes/myDishes";
import { SearchFormType } from "../../../types/allTypes/search";

export type RootStateType = {
  toastState: ToastStateType;
  userState: UserStateType;
  popupState: PopupStateType;
};

export type RootActionTypes =
  | ToastActionTypes
  | UserActionTypes
  | PopupActionTypes;

export type FormsCtxType = {
  formContextMyRestaurants: UseFormReturn<FormSearchType>;
  formContextMyDishesAddItem: UseFormReturn<DishMenuFormType>;
  formContextMyDishesUpdate: UseFormReturn<DishMenuFormType>;
  formContextMyDishesSearch: UseFormReturn<SearchMyDishesFormType>;
  formContextSearchRestAllUsers: UseFormReturn<SearchFormType>;
};

export type RootValsType = {
  toastState: ToastValsType;
  userState: UserValsType;
  popupState: PopupValsType;
  formsState: FormsCtxType;
};
