/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useHandleErr } from "../../../../hooks/useHandleErr";
import { useToast, useUser } from "../../../../hooks/useGlobal";
import { useMutation } from "@tanstack/react-query";
import {
  newsLetterToggleLoggedAPI,
  subscribeNonLoggedUserAPI,
} from "../../../../api/newsLetter";
import { CurrUserType } from "../../../../types/userTypes";
import { useForm } from "react-hook-form";

export type NewsLetterFormType = {
  email: string;
};

export const useNewsletter = () => {
  const { isLogged, currUser, setCurrUser } = useUser();
  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<NewsLetterFormType>({
    mode: "onChange",
  });

  const { mutate: mutateNonLogged, isPending: isPendingNonLogged } =
    useMutation({
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
    mutateNonLogged(data.email);
  });

  const { mutate: mutateLogged, isPending: isPendingLogged } = useMutation({
    mutationFn: ({ type }: { type: "subscribe" | "unsubscribe" }) =>
      newsLetterToggleLoggedAPI({ type }),
    onSuccess: (data) => {
      setCurrUser({ user: data?.user as CurrUserType | null });
      showToastMsg(
        `You have ${
          data?.user?.hasSubscribedToNewsletter ? "subscribed" : "unsubscribed"
        } to our newsletter successfully`,
        "SUCCESS"
      );
    },
    onError: (err: any) => {
      if (err?.response?.status === 401) handleErrAPI({ err });
      else showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
  });

  const toggleNewsLetter = () => {
    mutateLogged({
      type: currUser?.hasSubscribedToNewsletter ? "unsubscribe" : "subscribe",
    });
  };

  const handleRedirection = () =>
    navigate(`/newsletter/notice-unsubscribe-with-retry?success=false`, {
      state: { from: "/newsletter/verify-unsubscribe" },
    });

  return {
    isLogged,
    toggleNewsLetter,
    isPendingLogged,
    register,
    errors,
    currUser,
    submitSubscribeNonLoggedUser,
    isPendingNonLogged,
    handleRedirection,
  };
};
