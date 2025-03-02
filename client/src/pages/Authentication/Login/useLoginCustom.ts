/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useMutation } from "@tanstack/react-query";
import { loginUserAPI } from "../../../api/auth/authAPI";
import { AccessResAPIType } from "../../../types/authTypes";
import { useToast, useUser } from "../../../hooks/useGlobal";
import { useNavigate } from "react-router-dom";

export type LoginFormType = {
  email: string;
  password: string;
};

export const useLoginCustom = () => {
  const { setCurrUser } = useUser();
  const { showToastMsg } = useToast();

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
      setCurrUser(data.userEmail, data.accessToken);
      showToastMsg("User logged in successfully", "SUCCESS");
      navigate("/");
    },
    onError: (err: any) => {
      showToastMsg(err?.response?.data?.msg || err, "ERROR");
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
