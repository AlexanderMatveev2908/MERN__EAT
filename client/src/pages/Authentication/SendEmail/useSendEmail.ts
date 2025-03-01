import { useForm } from "react-hook-form";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useEffect } from "react";

type SendEmailFormType = {
  email: string;
};

export const useSendEmail = () => {
  useScrollTop();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<SendEmailFormType>({ mode: "onChange" });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return {
    register,
    errors,
  };
};
