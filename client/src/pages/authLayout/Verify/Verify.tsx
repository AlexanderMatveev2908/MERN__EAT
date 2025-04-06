import { FC } from "react";
import { useVerify } from "./hooks/useVerify";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";

const Verify: FC = () => {
  useScrollTop();

  const { canStay } = useVerify();

  return !canStay ? <Navigate to="/" replace /> : <LoaderPageReact />;
};
export default Verify;
