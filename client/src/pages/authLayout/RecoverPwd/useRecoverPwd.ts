import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../../core/hooks/useGlobal";
import { REG_MONGO, REG_TOKEN } from "../../../core/config/constants/regex";
import { useChangeVisibilityPwd } from "../../../core/hooks/auth/useChangeVisibilityPwd";
import { changeRecoverPwdAPI } from "../../../core/api/api";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";

type ChangePwdFormType = {
  password: string;
  confirmPassword: string;
};

export const useRecoverPwd = () => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] = useState(false);

  const { showToastMsg, handleErrAPI } = useGetFavHooks();
  const { setUserLogged } = useUser();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const isUserIdValid = REG_MONGO.test(userId ?? "");
  const isTokenValid = REG_TOKEN.test(token ?? "");

  const canStay =
    location?.state?.from === "/auth/verify" && isUserIdValid && isTokenValid;

  const { handleChangePwdVisibility, handleChangeConfirmPwdVisibility } =
    useChangeVisibilityPwd({
      isPwdVisible,
      setIsPwdVisible,
      isConfirmPwdVisible,
      setIsConfirmPwdVisible,
    });

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
    onSuccess: (data) => {
      reset();
      setUserLogged(data?.accessToken);
      showToastMsg("Password changed successfully", "SUCCESS");
      navigate("/", { replace: true });
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
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

  const customConfirmPwd = (val: string) =>
    val !== watch("password") ? "Passwords do not match 🤔" : true;

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
    customConfirmPwd,
  };
};
