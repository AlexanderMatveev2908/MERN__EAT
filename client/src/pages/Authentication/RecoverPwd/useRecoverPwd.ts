/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useChangeVisibilityPwd } from "../../../hooks/useChangeVisibilityPwd";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { changeRecoverPwdAPI } from "../../../api/auth/authAPI";
import { useToast, useUser } from "../../../hooks/useGlobal";
import { REG_MONGO, REG_TOKEN } from "../../../constants/regex";
import { AccessResAPIType } from "../../../types/authTypes";

type ChangePwdFormType = {
  password: string;
  confirmPassword: string;
};

export const useRecoverPwd = () => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState(false);

  const { showToastMsg } = useToast();
  const { setCurrUser, isLogged } = useUser();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const isUserIdValid = REG_MONGO.test(userId ?? "");
  const isTokenValid = REG_TOKEN.test(token ?? "");

  const canStay =
    location?.state?.from === "/auth/verify" &&
    isUserIdValid &&
    isTokenValid &&
    !isLogged;

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
    reset,
    watch,
    trigger,
  } = useForm<ChangePwdFormType>({ mode: "onChange" });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      password,
      token,
      userId,
    }: {
      password: string;
      token: string;
      userId: string;
    }) => changeRecoverPwdAPI({ password: password, token, userId }),
    onSuccess: (data: AccessResAPIType) => {
      reset();
      setCurrUser(data.userEmail, data.accessToken);
      showToastMsg("Password changed successfully", "SUCCESS");
      navigate("/", { replace: true });
    },
    onError: (err: any) => {
      if (err?.response?.status === 401) navigate("/", { replace: true });
      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
  });

  const handleSubmitRecoverPwd = handleSubmit((formData: ChangePwdFormType) => {
    const { password } = formData;

    mutate({ password, token: token as string, userId: userId as string });
  });

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
    canStay,
    handleSubmitRecoverPwd,
    isPending,
  };
};
