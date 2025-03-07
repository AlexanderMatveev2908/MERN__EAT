/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { ChangeEmailFormType } from "../../../../../../../../types/userTypes";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { changeEmailAPI } from "../../../../../../../../api/user";
import { ShowToastType } from "../../../../../../../../types/toastTypes";
import { useLocation, useNavigate } from "react-router-dom";

export const useChangeEmail = ({
  showToastMsg,
  handleErrAPI,
}: {
  showToastMsg: ShowToastType;
  handleErrAPI: ({ err }: { err: any }) => void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<ChangeEmailFormType>({ mode: "onChange" });

  useEffect(() => {
    setFocus("newEmail");
  }, [setFocus]);

  const { mutate, isPending } = useMutation({
    mutationFn: (params: { newEmail: string; manageAccountToken: string }) =>
      changeEmailAPI(params),
    onSuccess: () => {
      showToastMsg("Email changed successfully!", "SUCCESS");
      navigate("/notice-email?type=change-email", {
        state: { from: location.pathname },
      });
    },
    onError: (err: any) => {
      console.log(err);
      handleErrAPI({ err });
    },
  });

  const handleSubmitChangeEmail = handleSubmit((data) => {
    mutate({
      newEmail: data.newEmail,
      manageAccountToken: sessionStorage.getItem("manageAccountToken") ?? "",
    });
  });

  return {
    register,
    errors,
    handleSubmitChangeEmail,
    isPending,
  };
};
