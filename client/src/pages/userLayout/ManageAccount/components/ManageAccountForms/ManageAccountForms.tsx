import { FC } from "react";
import ChangeEmail from "./components/ChangeEmail/ChangeEmail";
import { useManageAccountForms } from "./hooks/useManageAccountForms";
import ButtonsForms from "./components/ButtonsForms/ButtonsForms";
import ChangePwd from "./components/ChangePwd/ChangePwd";
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";
import { CurrUserType } from "../../../../../types/userTypes";
import { ShowToastType } from "../../../../../types/toastTypes";

type PropsType = {
  currUser: CurrUserType | null;
  showToastMsg: ShowToastType;
};

const ManageAccountForms: FC<PropsType> = ({ currUser, showToastMsg }) => {
  const {
    currForm,
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
    handleErrAPI,
  } = useManageAccountForms();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-10 max-w-[600px]">
      <div className="w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl h-fit">
        <div className="w-full overflow-hidden ">
          <div
            className="w-[300%] grid grid-cols-3 transition-all duration-500"
            style={{ transform: `translateX(-${(currForm * 100) / 3}%)` }}
          >
            <ChangeEmail {...{ currUser, showToastMsg, handleErrAPI }} />

            <ChangePwd />

            <DeleteAccount />
          </div>
        </div>
      </div>

      <ButtonsForms
        {...{
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
