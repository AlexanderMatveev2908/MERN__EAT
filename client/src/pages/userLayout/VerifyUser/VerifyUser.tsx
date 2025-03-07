import { FC } from "react";
import LoaderPageReact from "../../../components/loaders/LoaderPageReact/LoaderPageReact";
import { Navigate } from "react-router-dom";
import { useVerifyUser } from "./hooks/useVerifyUser";

const VerifyUser: FC = () => {
  const { canStay } = useVerifyUser();

  return !canStay ? <Navigate to="/" replace /> : <LoaderPageReact />;
};
export default VerifyUser;
