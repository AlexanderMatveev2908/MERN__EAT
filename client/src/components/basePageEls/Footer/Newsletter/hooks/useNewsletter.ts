/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast, useUser } from "../../../../../hooks/useGlobal";
import { newsLetterSubscribeAPI } from "../../../../../api/newsLetter";
import { CurrUserType } from "../../../../../types/userTypes";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type NewsLetterFormType = {
  email: string;
};

export const useNewsletter = () => {
  const { isLogged, currUser } = useUser();
  const { setCurrUser } = useUser();
  const { showToastMsg } = useToast();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm<NewsLetterFormType>({
    defaultValues: {
      email: currUser?.email ?? "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (currUser?.email) setValue("email", currUser?.email ?? "");
  }, [currUser?.email, setValue]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ type }: { type: "subscribe" | "unsubscribe" }) =>
      newsLetterSubscribeAPI({ type }),
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
      console.log(err);
      showToastMsg(`Oops something went wrong`, "ERROR");
    },
  });

  const handleClickNonLoggedUser = () => navigate("/auth/login");

  const submitNewsLetter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      type: currUser?.hasSubscribedToNewsletter ? "unsubscribe" : "subscribe",
    });
  };

  return {
    handleClickNonLoggedUser,
    isLogged,
    submitNewsLetter,
    isPending,
    register,
    errors,
    currUser,
  };
};
