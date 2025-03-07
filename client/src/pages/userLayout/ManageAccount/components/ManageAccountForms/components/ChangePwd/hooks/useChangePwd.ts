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

  return {
    register,
    errors,
    watch,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
    isConfirmPwdVisible,
    isPwdVisible,
  };
};
