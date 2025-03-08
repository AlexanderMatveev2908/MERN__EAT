/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { newsLetterToggleLoggedAPI } from "../../../../../api/newsLetter";
import { CurrUserType } from "../../../../../types/userTypes";
import { useUser } from "../../../../../hooks/useGlobal";
import { ToastStateType } from "../../../../../types/toastTypes";

export const useToggleNewsLetter = ({
  showToastMsg,
  handleErrAPI,
}: {
  handleErrAPI: ({ err }: { err: any }) => void;
  showToastMsg: (msg: string, type: ToastStateType["type"]) => void;
}) => {
  const { setCurrUser } = useUser();

  const { mutate, isPending } = useMutation({
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

  return {
    mutate,
    isPending,
  };
};
