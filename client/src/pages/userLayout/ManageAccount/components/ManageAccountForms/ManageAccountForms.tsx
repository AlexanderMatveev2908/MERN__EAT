import { FC } from "react";
import ChangeEmail from "./components/ChangeEmail/ChangeEmail";
import {
  totLenManageAccountForms,
  useManageAccountForms,
} from "./useManageAccountForms";
import ChangePwd from "./components/ChangePwd/ChangePwd";
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";
import { CurrUserType } from "../../../../../types/userTypes";
import { ShowToastType } from "../../../../../types/toastTypes";
import { handleErrManageUserType } from "../../useManageAccount";
import ButtonsSwapper from "../../../../../components/ButtonsSwapper";

type PropsType = {
  currUser: CurrUserType | null;
  showToastMsg: ShowToastType;
  handleErrManageUser: handleErrManageUserType;
  setCanManageAccount: (val: string | boolean) => void;
};

export type SetChildLoadingType = (val: boolean) => void;

export type PropsForChildren = {
  setIsChildLoading: SetChildLoadingType;
} & PropsType;

const ManageAccountForms: FC<PropsType> = ({
  currUser,
  showToastMsg,
  handleErrManageUser,
  setCanManageAccount,
}) => {
  const {
    currForm,
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
    isChildLoading,
    setIsChildLoading,
  } = useManageAccountForms();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-10 max-w-[600px]">
      <div
        className={`w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl overflow-hidden h-fit  transition-all duration-500 ${
          currForm === 0
            ? "max-h-[350px]"
            : currForm === 1
            ? "max-h-[750px]"
            : "max-h-[350px]"
        }`}
      >
        <div
          className="w-[300%] grid grid-cols-3 transition-all duration-500 place-items-start justify-items-start"
          style={{ transform: `translateX(-${(currForm * 100) / 3}%)` }}
        >
          <ChangeEmail
            {...{
              currUser,
              showToastMsg,
              setIsChildLoading,
              handleErrManageUser,
            }}
          />

          <ChangePwd
            {...{
              currUser,
              showToastMsg,
              setIsChildLoading,
              handleErrManageUser,
              setCanManageAccount,
            }}
          />

          <DeleteAccount
            {...{
              showToastMsg,
              setIsChildLoading,
              handleErrManageUser,
            }}
          />
        </div>
      </div>

      <ButtonsSwapper
        {...{
          hiddenLg: false,
          currForm,
          totLen: totLenManageAccountForms,
          bothDisabled: isChildLoading,
          isPrevDisabled,
          isNextDisabled,
          handlePrev,
          handleNext,
        }}
      />
    </div>
  );
};
export default ManageAccountForms;
