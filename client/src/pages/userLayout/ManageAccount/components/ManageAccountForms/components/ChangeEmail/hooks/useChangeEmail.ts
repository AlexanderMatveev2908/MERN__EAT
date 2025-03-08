/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ChangeEmailFormType } from "../../../../../../../../types/userTypes";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { changeEmailAPI } from "../../../../../../../../api/user";
import { useLocation, useNavigate } from "react-router-dom";
import { ShowToastType } from "../../../../../../../../types/toastTypes";
import { SetChildLoadingType } from "../../../ManageAccountForms";
import { handleErrManageUserType } from "../../../../../hooks/useManageAccount";

export const useChangeEmail = ({
  showToastMsg,
  setIsChildLoading,
  handleErrManageUser,
}: {
  showToastMsg: ShowToastType;
  setIsChildLoading: SetChildLoadingType;
  handleErrManageUser: handleErrManageUserType;
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
    mutationFn: (params: { newEmail: string; manageAccountToken: string }) => {
      setIsChildLoading(true);
      return changeEmailAPI(params);
    },
    onSuccess: () => {
      showToastMsg("Email changed successfully!", "SUCCESS");
      navigate("/notice-email?type=change-email", {
        state: { from: location.pathname },
      });
    },
    onError: (err: any) => {
      handleErrManageUser(err);
    },
    onSettled: () => {
      setIsChildLoading(false);
    },
  });

  const handleSubmitChangeEmail = handleSubmit((data) => {
    mutate({
      newEmail: data.newEmail,
      manageAccountToken: sessionStorage.getItem("manageAccountToken") ?? "",
    });
  });

  const custom = (newEmail: string, oldEmail: string | undefined) =>
    newEmail === oldEmail ? "New Email must be different from old one" : true;

  return {
    register,
    errors,
    handleSubmitChangeEmail,
    isPending,
    custom,
  };
};
