/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  sendEmailAllowedPaths,
  sendEmailAllowedTypes,
} from "./sendEmailFieldsArr";
import { validateUserLocation } from "../../../utils/locations";
import { useMutation } from "@tanstack/react-query";
import { sendUserEmailAPI } from "../../../api/auth/authAPI";
import { useToast } from "../../../hooks/useGlobal";

export type SendEmailFormType = {
  email: string;
};

export const useSendEmail = () => {
  const { showToastMsg } = useToast();

  useScrollTop();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

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

  const { mutate, isPending } = useMutation({
    mutationFn: (params: { email: SendEmailFormType["email"]; type: string }) =>
      sendUserEmailAPI({ ...params }),
    onSuccess: () => {
      reset();
      sessionStorage.setItem("sentEmail", "true");
      showToastMsg("Email sent successfully", "SUCCESS");
      navigate("/notice-email?type=verify-account", {
        state: { from: location.pathname },
      });
    },
    onError: (err: any) => {
      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
  });

  return {
    register,
    errors,
    canStay,
    type,
  };
};
