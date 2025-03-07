import { useForm } from "react-hook-form";
import { ChangeEmailFormType } from "../../../../../types/userTypes";

export const useChangeEmail = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangeEmailFormType>({ mode: "onSubmit" });

  return {
    register,
    errors,
  };
};
