import { useLocation, useSearchParams } from "react-router-dom";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { validateStrWithArr } from "../../../utils/validateStr";

export const useNoticeEmail = () => {
  useScrollTop();

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const type = searchParams.get("type");
  const from = location?.state?.from;

  const canStay =
    validateStrWithArr(
      [
        "verify-account",
        "recover-pwd",
        "sentEmailUnsubscribe",
        "change-email",
        "change-pwd",
      ],
      type ?? ""
    ) &&
    validateStrWithArr(
      [
        "/auth/register",
        "/auth/login",
        "/newsletter/notice-unsubscribe-with-retry",
        "/user/manage-account",
      ],
      from
    );

  const txt =
    type === "verify-account"
      ? "to verify your account"
      : type === "recover-pwd"
      ? "with a link to recover your password"
      : type === "change-email"
      ? "to verify your new email"
      : "with a link to unsubscribe from our newsletter";

  return {
    canStay,
    txt,
  };
};
