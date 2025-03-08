/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useToast, useUser } from "../../../../../hooks/useGlobal";
import { useToggleNewsLetter } from "./useToggleNewsLetter";
import { useNonLoggedNewLetter } from "./useNonLoggedNewLetter";
import { useHandleErr } from "../../../../../hooks/useHandleErr";

export const useNewsletter = () => {
  const { isLogged, currUser } = useUser();
  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const navigate = useNavigate();

  const {
    register,
    errors,
    submitSubscribeNonLoggedUser,
    isPending: isPendingNonLogged,
  } = useNonLoggedNewLetter({ showToastMsg });

  const { mutate: mutateLogged, isPending: isPendingLogged } =
    useToggleNewsLetter({ showToastMsg, handleErrAPI });

  const handleClickNonLoggedUser = () => navigate("/auth/login");

  const toggleNewsLetter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateLogged({
      type: currUser?.hasSubscribedToNewsletter ? "unsubscribe" : "subscribe",
    });
  };

  const handleRedirection = () =>
    navigate(`/newsletter/notice-unsubscribe-with-retry?success=false`, {
      state: { from: "/newsletter/verify-unsubscribe" },
    });

  return {
    handleClickNonLoggedUser,
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
