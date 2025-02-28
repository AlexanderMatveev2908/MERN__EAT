import { useEffect } from "react";
import { useForm } from "react-hook-form";

export type LoginFormType = {
  email: string;
  password: string;
};

export const useLoginCustom = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormType>({ mode: "onChange" });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return {
    register,
    errors,
    watch,
  };
};
