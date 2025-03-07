import { useSearchParams } from "react-router-dom";
import { isValidStr } from "../../../utils/validateStr";
import { REG_MONGO, REG_TOKEN } from "../../../constants/regex";

export const useVerifyUser = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const isUserIdValid = isValidStr(userId ?? "", REG_MONGO);
  const isTokenValid = isValidStr(token ?? "", REG_TOKEN);
  const isValidType = type === "verify-new-email";

  const canStay = isUserIdValid && isTokenValid && isValidType;

  return { canStay };
};
