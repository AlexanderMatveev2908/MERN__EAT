import { FC } from "react";
import { useManageAccount } from "./hooks/useManageAccount";
import GetRightToManageAccount from "./components/GetRightToManageAccount/GetRightToManageAccount";
import ManageAccountForms from "./components/ManageAccountForms/ManageAccountForms";

const ManageAccount: FC = () => {
  const {
    showToastMsg,
    canManageAccount,
    currUser,
    handleErrManageUser,
    setCanManageAccount,
  } = useManageAccount();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5 sm:gap-y-10">
      <span className="txt__04">Manage your account</span>

      {canManageAccount ? (
        <ManageAccountForms
          {...{
            currUser,
            showToastMsg,
            handleErrManageUser,
            setCanManageAccount,
          }}
        />
      ) : (
        <GetRightToManageAccount
          {...{ handleErrManageUser, setCanManageAccount }}
        />
      )}
    </div>
  );
};
export default ManageAccount;
