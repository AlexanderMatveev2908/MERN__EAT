import { useForm } from "react-hook-form";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useEffect, useState } from "react";

export type RegisterFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const useRegisterCustom = () => {
  useScrollTop();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setFocus,
  } = useForm<RegisterFormType>({ mode: "onBlur" });

  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  return {
    register,
    errors,
    watch,
  };
};
