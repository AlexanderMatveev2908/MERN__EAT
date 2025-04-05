import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useUser } from "../../../../core/hooks/useGlobal";
import {
  newsLetterToggleLoggedAPI,
  subscribeNonLoggedUserAPI,
} from "../../../../core/api/api";
import { ErrFoodApp } from "../../../../types/allTypes/API";
import { useGetFavHooks } from "../../../../core/hooks/useGetFavHooks";

export type NewsLetterFormType = {
  email: string;
};

export const useNewsletter = () => {
  const { isLogged, currUser } = useUser();
  const { showToastMsg, handleErrAPI } = useGetFavHooks();
  const queryClient = useQueryClient();

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
      onError: (err: ErrFoodApp) => {
        showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
      },
    });

  const submitSubscribeNonLoggedUser = handleSubmit((data) => {
    mutateNonLogged(data.email);
  });

  const { mutate: mutateLogged, isPending: isPendingLogged } = useMutation({
    mutationFn: ({ type }: { type: "subscribe" | "unsubscribe" }) =>
      newsLetterToggleLoggedAPI({ type }),
    onSuccess: () => {
      showToastMsg(
        `You have ${
          currUser?.hasSubscribedToNewsletter ? "unsubscribed" : "subscribed"
        } to our newsletter successfully`,
        "SUCCESS"
      );
    },
    onError: (err: ErrFoodApp) => {
      if (err?.response?.status === 401) handleErrAPI({ err });
      else showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
    onSettled: () => queryClient.removeQueries({ queryKey: ["currUser"] }),
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
