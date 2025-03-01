import { useForm } from "react-hook-form";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useEffect, useState } from "react";
import { useChangeVisibilityPwd } from "../AuthenticateFields/authHooks/useChangeVisibilityPwd";

type ChangePwdFormType = {
  password: string;
  confirmPassword: string;
};

export const useChangePwd = () => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState(false);

  const { handleChangePwdVisibility, handleChangeConfirmPwdVisibility } =
    useChangeVisibilityPwd({
      isPwdVisible,
      setIsPwdVisible,
      isConfirmPwdVisible,
      setIsConfirmPwdVisible,
    });

  useScrollTop();

  const {
    register,
    setFocus,
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
  } = useForm<ChangePwdFormType>({ mode: "onChange" });

  const pwd = watch("password");

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  useEffect(() => {
    if (pwd) trigger("confirmPassword");
  }, [pwd, trigger]);

  return {
    register,
    errors,
    watch,
    isPwdVisible,
    isConfirmPwdVisible,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
  };
};
