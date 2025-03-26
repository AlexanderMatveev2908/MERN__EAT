import { useForm } from "react-hook-form";
import { ChangePwdFormTypeStep } from "../../../../../../../types/allTypes/userTypes";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ShowToastType } from "../../../../../../../types/allTypes/toastTypes";
import { handleErrManageUserType } from "../../../../useManageAccount";
import { SetChildLoadingType } from "../../ManageAccountForms";
import { useChangeVisibilityPwd } from "../../../../../../../core/hooks/auth/useChangeVisibilityPwd";
import { changeOldPwdAPI } from "../../../../../../../core/api/api";
import { ErrFoodApp } from "../../../../../../../types/allTypes/API";

export const useChangePwd = ({
  showToastMsg,
  handleErrManageUser,
  setIsChildLoading,
  setCanManageAccount,
}: {
  showToastMsg: ShowToastType;
  handleErrManageUser: handleErrManageUserType;
  setIsChildLoading: SetChildLoadingType;
  setCanManageAccount: (val: string | boolean) => void;
}) => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePwdFormTypeStep>({ mode: "onChange" });

  const { handleChangePwdVisibility, handleChangeConfirmPwdVisibility } =
    useChangeVisibilityPwd({
      isConfirmPwdVisible,
      setIsConfirmPwdVisible,
      isPwdVisible,
      setIsPwdVisible,
    });

  const { mutate, isPending } = useMutation({
    mutationFn: (params: {
      newPassword: string;
      manageAccountToken: string;
    }) => {
      setIsChildLoading(true);

      return changeOldPwdAPI(params);
    },
    onSuccess: () => {
      reset();
      showToastMsg("Password changed successfully", "SUCCESS");
      navigate("/");
    },
    onError: (err: ErrFoodApp) => {
      handleErrManageUser({ err });
    },
    onSettled: () => {
      setIsChildLoading(false);
      setCanManageAccount(false);
    },
  });

  const handleSubmitChangePwd = handleSubmit((data) => {
    const { newPassword } = data;
    mutate({
      newPassword,
      manageAccountToken: sessionStorage.getItem("manageAccountToken") ?? "",
    });
  });

  const customPwd = (val: string, email: string | undefined) =>
    val === email ? "Password must be different from email" : true;
  const customConfirmPwd = (val: string) =>
    val !== watch("newPassword") ? "Passwords do not match 🤔" : true;

  return {
    register,
    errors,
    watch,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
    isConfirmPwdVisible,
    isPwdVisible,
    customPwd,
    customConfirmPwd,
    isPending,
    handleSubmitChangePwd,
  };
};
