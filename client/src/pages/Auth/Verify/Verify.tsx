import { FC } from "react";
import { useVerify } from "./hooks/useVerify";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../components/loaders/LoaderPageReact/LoaderPageReact";

const Verify: FC = () => {
  const { canStay } = useVerify();

  return !canStay ? <Navigate to="/" replace /> : <LoaderPageReact />;
};
export default Verify;
