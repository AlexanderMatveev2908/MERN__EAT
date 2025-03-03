import { useForm } from "react-hook-form";

type UserProfileFormType = {
  [key: string]: string;
};

export const useUserProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserProfileFormType>();

  return {
    register,
    errors,
  };
};
