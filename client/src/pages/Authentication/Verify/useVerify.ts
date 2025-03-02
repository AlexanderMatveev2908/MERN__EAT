import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { REG_MONGO, REG_TOKEN } from "../../../constants/regex";

export const useVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const isUserIdValid = REG_MONGO.test(userId ?? "");
  const isTokenValid = REG_TOKEN.test(token ?? "");
  const isValidType = ["verify-account", "recover-pwd"].includes(type ?? "");
  const isLogged = sessionStorage.getItem("accessToken");

  const canStay =
    [isTokenValid, isUserIdValid, isValidType].every((el) => !!el) && !isLogged;
};
