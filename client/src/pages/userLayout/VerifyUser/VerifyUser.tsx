import { FC } from "react";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import { Navigate } from "react-router-dom";
import { useVerifyUser } from "./useVerifyUser";

const VerifyUser: FC = () => {
  const { canStay } = useVerifyUser();

  return !canStay ? <Navigate to="/" replace /> : <LoaderPageReact />;
};
export default VerifyUser;
