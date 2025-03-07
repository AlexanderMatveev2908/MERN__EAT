/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useHandleErr } from "../../../../hooks/useHandleErr";
import { useChangeVisibilityPwd } from "../../../../hooks/useChangeVisibilityPwd";
import { useToast } from "../../../../hooks/useGlobal";
import { registerUserAPI } from "../../../../api/auth";
import { useScrollTop } from "../../../../hooks/useScrollTop";

export type RegisterFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

export const useRegisterCustom = () => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState(false);

  const { handleErrAPI } = useHandleErr();

  useScrollTop();

  const navigate = useNavigate();
  const location = useLocation();

  const { handleChangePwdVisibility, handleChangeConfirmPwdVisibility } =
    useChangeVisibilityPwd({
      isPwdVisible,
      setIsPwdVisible,
      isConfirmPwdVisible,
      setIsConfirmPwdVisible,
    });

  const { showToastMsg } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors },
    setFocus,
  } = useForm<RegisterFormType>({ mode: "onChange" });

  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  const pwd = watch("password");

  useEffect(() => {
    if (pwd) trigger("confirmPassword");
  }, [pwd, trigger]);

  const { mutate, isPending } = useMutation({
    mutationFn: (registerVals: Omit<RegisterFormType, "confirmPassword">) =>
      registerUserAPI(registerVals),
    onSuccess: () => {
      reset();
      showToastMsg("Account created successfully", "SUCCESS");
      navigate("/notice-email?type=verify-account", {
        state: { from: location.pathname },
      });
    },
    onError: (err: any) => {
      handleErrAPI({ err });
    },
  });

  const handleRegister = handleSubmit((formData: RegisterFormType) => {
    // eslint-disable-next-line
    const { confirmPassword, ...registerVals } = formData;
    mutate(registerVals);
  });

  return {
    register,
    errors,
    watch,
    trigger,
    isPwdVisible,
    isConfirmPwdVisible,
    handleChangePwdVisibility,
    handleChangeConfirmPwdVisibility,
    isPending,
    handleRegister,
  };
};
