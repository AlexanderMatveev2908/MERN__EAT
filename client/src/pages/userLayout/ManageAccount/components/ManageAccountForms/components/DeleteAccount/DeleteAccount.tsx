import { FC } from "react";
import DeleteAccountBtn from "./components/DeleteAccountBtn/DeleteAccountBtn";
import { PropsForChildren } from "../../ManageAccountForms";

const DeleteAccount: FC<PropsForChildren> = ({
  currUser,
  showToastMsg,
  handleErrAPI,
  setIsChildLoading,
  currForm,
}) => {
  return (
    <div className="">
      <DeleteAccountBtn />;
    </div>
  );
};
export default DeleteAccount;
