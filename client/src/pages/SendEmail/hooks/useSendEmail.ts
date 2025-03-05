/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  sendEmailAllowedPaths,
  sendEmailAllowedTypes,
} from "../utils/sendEmailFieldsArr";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { validateUserLocation } from "../../../utils/locations";
import { useCreateTanStackSendEmail } from "./useCreateTanStackSendEmail";
import { sendUserEmailAPI } from "../../../api/verify";

export type SendEmailFormType = {
  email: string;
};

export const useSendEmail = () => {
  useScrollTop();

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const from = location?.state?.from;
  const type = searchParams.get("type");

  const canStay = validateUserLocation(
    sendEmailAllowedPaths,
    sendEmailAllowedTypes,
    from,
    type
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<SendEmailFormType>({ mode: "onChange" });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const { mutate, isPending } = useCreateTanStackSendEmail({
    reset,
    callAPI: sendUserEmailAPI,
    from,
    type,
  });

  const handleSubmitEmail = handleSubmit((formData: SendEmailFormType) => {
    mutate({ email: formData.email });
  });

  return {
    register,
    errors,
    canStay,
    type,
    isPending,
    handleSubmitEmail,
  };
};
