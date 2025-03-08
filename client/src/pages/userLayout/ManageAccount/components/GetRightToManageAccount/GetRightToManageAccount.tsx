import { FC } from "react";
import { useGetRightToManageAccount } from "./hooks/useGetRightToManageAccount";
import BasePwdField from "../../../../../components/commonCompForms/BasePwdField/BasePwdField";
import { pwdFieldToAccess } from "../../../../../config/fieldsArr/authFieldsUser";
import ButtonBasic from "../../../../../components/buttons/ButtonBasic/ButtonBasic";
import SpinnerBtnReact from "../../../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";

type PropsType = {
  setCanManageAccount: (val: string | boolean) => void;
  handleErrManageUser;
};

const GetRightToManageAccount: FC<PropsType> = ({
  setCanManageAccount,
  handleErrManageUser,
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
        {isPending ? (
          <SpinnerBtnReact />
        ) : (
          <ButtonBasic
            {...{ label: "Submit", styleTxt: "txt__02", type: "submit" }}
          />
        )}
      </div>
    </form>
  );
};
export default GetRightToManageAccount;
