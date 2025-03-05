/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useCreateTanStackSendEmail } from "./useCreateTanStackSendEmail";
import {
  emailAllowedFrom,
  emailAllowedType,
} from "../../../../config/allowedPaths/pathsAndTypes";
import { validateUserLocation } from "../../../../utils/validateLocations";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { sendUserEmailAPI } from "../../../../api/auth";

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
    emailAllowedFrom,
    emailAllowedType,
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
