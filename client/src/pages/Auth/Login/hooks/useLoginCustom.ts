/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast, useUser } from "../../../../hooks/useGlobal";
import { useHandleErr } from "../../../../hooks/useHandleErr";
import { useNavigate } from "react-router-dom";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useMutation } from "@tanstack/react-query";
import { AccessResAPIType } from "../../../../types/authTypes";
import { loginUserAPI } from "../../../../api/auth";

export type LoginFormType = {
  email: string;
  password: string;
};

export const useLoginCustom = () => {
  const { setUserLogged } = useUser();
  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const navigate = useNavigate();

  useScrollTop();

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
    onSuccess: (data: AccessResAPIType) => {
      reset();
      setUserLogged(data.accessToken);
      showToastMsg("User logged in successfully", "SUCCESS");
      navigate("/");
    },
    onError: (err: any) => {
      handleErrAPI({ err });
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
