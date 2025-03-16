import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GetRightManageAccountFormType } from "../../../../../types/allTypes/userTypes";
import { useMutation } from "@tanstack/react-query";
import { HandleErrType } from "../../../../../core/hooks/useHandleErr";
import { getRightManageAccountAPI } from "../../../../../core/api/api";
import { ErrFoodApp } from "../../../../../types/allTypes/API";

export const useGetRightToManageAccount = ({
  setCanManageAccount,
  handleErrManageUser,
  closeToast,
}: {
  setCanManageAccount: (val: string | boolean) => void;
  handleErrManageUser: HandleErrType;
  closeToast: () => void;
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
      closeToast();
    },
    onError: (err: ErrFoodApp) => {
      handleErrManageUser({ err });
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
