/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast, useUser } from "./../../../hooks/useGlobal";
import { useHandleErr } from "./../../../hooks/useHandleErr";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUserAPI } from "./../../../api/auth";
import { useScrollTop } from "./../../../hooks/useScrollTop";

export type LoginFormType = {
  email: string;
  password: string;
};

export const useLoginCustom = () => {
  const { setUserLogged } = useUser();
  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  useScrollTop();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormType>({ mode: "onSubmit" });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormType) => loginUserAPI(data),
    onSuccess: (data) => {
      reset();
      setUserLogged(data.accessToken);
      showToastMsg("User logged in successfully", "SUCCESS");
      navigate("/");
    },
    onError: (err: any) => {
      if ([401, 403].includes(err?.response?.status))
        showToastMsg(err?.response?.data?.msg, "ERROR");
      else handleErrAPI({ err });
    },
  });

  const handleLoginUser = handleSubmit((formData: LoginFormType) => {
    mutate({ ...formData });
  });

  return {
    register,
    errors,
    handleLoginUser,
    isPending,
  };
};
