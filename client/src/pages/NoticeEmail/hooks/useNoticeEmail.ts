import { useLocation, useSearchParams } from "react-router-dom";
import { useScrollTop } from "../../../hooks/useScrollTop";

export const useNoticeEmail = () => {
  useScrollTop();

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const type = searchParams.get("type");
  const from = location?.state?.from;

  const canStay = () => {
    if (
      (from === "/auth/register" && type !== "verify-account") ||
      (from === "/auth/login" && type !== "recover-pwd") ||
      (from === "/newsletter/notice-unsubscribe-with-retry" &&
        type !== "sentEmailUnsubscribe")
    )
      return false;
  };

  return {
    canStay,
  };
};
