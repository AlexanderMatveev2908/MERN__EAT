import { FC } from "react";
import ChangeEmail from "./components/ChangeEmail/ChangeEmail";
import { useManageAccountForms } from "./hooks/useManageAccountForms";
import ButtonsForms from "./components/ButtonsForms/ButtonsForms";
import ChangePwd from "./components/ChangePwd/ChangePwd";
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";
import { CurrUserType } from "../../../../../types/userTypes";
import { ShowToastType } from "../../../../../types/toastTypes";
import { HandleErrType } from "../../../../../hooks/useHandleErr";

type PropsType = {
  currUser: CurrUserType | null;
  showToastMsg: ShowToastType;
};

export type PropsForChildren = {
  setIsChildLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleErrAPI: HandleErrType;
} & PropsType;

const ManageAccountForms: FC<PropsType> = ({ currUser, showToastMsg }) => {
  const {
    currForm,
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
    handleErrAPI,
    isChildLoading,
    setIsChildLoading,
  } = useManageAccountForms();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-10 max-w-[600px]">
      <div
        className={`w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl overflow-hidden h-fit transition-all duration-500 ${
          currForm === 0
            ? "max-h-[350px]"
            : currForm === 1
            ? "max-h-[700px]"
            : "max-h-[100px]"
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
              handleErrAPI,
              setIsChildLoading,
            }}
          />

          <ChangePwd
            {...{ currUser, showToastMsg, handleErrAPI, setIsChildLoading }}
          />

          <DeleteAccount
            {...{ currUser, showToastMsg, handleErrAPI, setIsChildLoading }}
          />
        </div>
      </div>

      <ButtonsForms
        {...{
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
