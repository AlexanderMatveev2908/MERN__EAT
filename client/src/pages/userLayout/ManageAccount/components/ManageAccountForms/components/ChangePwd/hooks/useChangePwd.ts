import { useForm } from "react-hook-form";
import { ChangePwdFormTypeStep } from "../../../../../../../../types/userTypes";
import { useState } from "react";
import { useChangeVisibilityPwd } from "../../../../../../../../hooks/useChangeVisibilityPwd";
import { useMutation } from "@tanstack/react-query";

export const useChangePwd = () => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState(false);

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

  const { mutate, isPending } = useMutation({});

  const customPwd = (val: string, email: string) =>
    val === email ? "Password must be different from email" : true;
  const customConfirmPwd = (val: string) =>
    val !== watch("password") ? "Passwords do not match 🤔" : true;

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
  };
};
