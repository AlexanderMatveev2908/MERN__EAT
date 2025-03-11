/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GetRightManageAccountFormType } from "./../../../../../types/userTypes";
import { useMutation } from "@tanstack/react-query";
import { getRightManageAccountAPI } from "./../../../../../api/user";

export const useGetRightToManageAccount = ({
  setCanManageAccount,
  handleErrManageUser,
}) => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const handleChangeVisibility = () => setIsPwdVisible(!isPwdVisible);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<GetRightManageAccountFormType>({ mode: "onChange" });

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  const { mutate, isPending } = useMutation({
    mutationFn: (password: string) => getRightManageAccountAPI(password),
    onSuccess: (data) => {
      setCanManageAccount(data.manageAccountToken);
    },
    onError: (err: any) => {
      handleErrManageUser(err);
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
