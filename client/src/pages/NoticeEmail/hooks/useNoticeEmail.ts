import { useLocation, useSearchParams } from "react-router-dom";
import { useScrollTop } from "../../../hooks/useScrollTop";
import { validateUserLocation } from "../../../utils/locations";
import {
  sendEmailAllowedPaths,
  sendEmailAllowedTypes,
} from "../../SendEmail/utils/sendEmailFieldsArr";

export const useNoticeEmail = () => {
  useScrollTop();

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const type = searchParams.get("type");
  const from = location?.state?.from;
  const hasBeenSentEmail = sessionStorage.getItem("sentEmail");

  const canStay =
    validateUserLocation(
      sendEmailAllowedPaths,
      sendEmailAllowedTypes,
      from,
      type
    ) && hasBeenSentEmail;

  return {
    canStay,
    hasBeenSentEmail,
  };
};
