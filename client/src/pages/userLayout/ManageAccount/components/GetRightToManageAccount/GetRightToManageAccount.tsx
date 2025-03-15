import { FC } from "react";
import { useGetRightToManageAccount } from "./useGetRightToManageAccount";
import ButtonBasic from "../../../../../UI/components/buttons/ButtonBasic";
import BasePwdField from "../../../../../UI/forms/inputFields/BasePwdField";
import { pwdFieldToAccess } from "../../../../../core/config/fieldsArr/fields";

type PropsType = {
  setCanManageAccount: (val: string | boolean) => void;
  handleErrManageUser;
  closeToast: () => void;
};

const GetRightToManageAccount: FC<PropsType> = ({
  setCanManageAccount,
  handleErrManageUser,
  closeToast,
}) => {
  const {
    register,
    errors,
    isPwdVisible,
    handleChangeVisibility,
    submitManageForm,
    isPending,
  } = useGetRightToManageAccount({
    setCanManageAccount,
    handleErrManageUser,
    closeToast,
  });

  return (
    <form
      onSubmit={submitManageForm}
      className="w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-10 border-orange-500 rounded-xl h-fit p-5 sm:px-10 justify-items-center"
    >
      <span className="txt__03">Confirm your password before proceeding</span>

      <div className="w-full">
        <BasePwdField
          {...{
            field: pwdFieldToAccess,
            register,
            errors,
            isVisible: isPwdVisible,
            handleChangeVisibility,
          }}
        />
      </div>

      <div className="w-full flex max-w-[200px] sm:max-w-[250px] justify-center">
        <ButtonBasic
          {...{
            label: "Submit",
            styleTxt: "txt__02",
            type: "submit",
            isPending,
          }}
        />
      </div>
    </form>
  );
};
export default GetRightToManageAccount;
