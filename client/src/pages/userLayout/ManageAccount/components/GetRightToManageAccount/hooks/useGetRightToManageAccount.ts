/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GetRightManageAccountFormType } from "../../../../../../types/userTypes";
import { useMutation } from "@tanstack/react-query";
import { getRightManageAccountAPI } from "../../../../../../api/user";
import { ShowToastType } from "../../../../../../types/toastTypes";

export const useGetRightToManageAccount = ({
  logoutUser,
  setCanManageAccount,
  showToastMsg,
}: {
  logoutUser: () => void;
  setCanManageAccount: (val: string | boolean) => void;
  showToastMsg: ShowToastType;
}) => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const handleChangeVisibility = () => setIsPwdVisible(!isPwdVisible);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<GetRightManageAccountFormType>({ mode: "onBlur" });

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  const { mutate, isPending } = useMutation({
    mutationFn: (password: string) => getRightManageAccountAPI(password),
    onSuccess: (data) => {
      setCanManageAccount(data.manageAccountToken);
    },
    onError: (err: any) => {
      console.log(err);
      if (err?.response?.status === 429) logoutUser();

      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
  });

  const submitManageForm = handleSubmit((data) => {
    mutate(data.password);
  });

  return {
    register,
    errors,
    isPwdVisible,
    handleChangeVisibility,
    submitManageForm,
    isPending,
  };
};
