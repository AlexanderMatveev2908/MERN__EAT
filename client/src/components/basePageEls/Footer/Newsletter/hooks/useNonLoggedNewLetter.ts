/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { subscribeNonLoggedUserAPI } from "../../../../../api/newsLetter";
import { ShowToastType } from "../../../../../types/toastTypes";

export type NewsLetterFormType = {
  email: string;
};

export const useNonLoggedNewLetter = ({
  showToastMsg,
}: {
  showToastMsg: ShowToastType;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<NewsLetterFormType>({
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => subscribeNonLoggedUserAPI(email),
    onSuccess: () => {
      reset();
      showToastMsg(
        "You have successfully subscribed to out newsLetter",
        "SUCCESS"
      );
    },
    onError: (err: any) => {
      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
  });

  const submitSubscribeNonLoggedUser = handleSubmit((data) => {
    mutate(data.email);
  });

  return {
    register,
    errors,
    submitSubscribeNonLoggedUser,
    isPending,
  };
};
