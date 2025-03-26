import { FC } from "react";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import { useVerifyUnsubScribeNewsLetter } from "./useVerifyUnsubScribeNewsLetter";
import { Navigate } from "react-router-dom";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";

const VerifyUnsubScribeNewsLetter: FC = () => {
  useScrollTop();

  const { canStay } = useVerifyUnsubScribeNewsLetter();

  return !canStay ? <Navigate to="/" replace /> : <LoaderPageReact />;
};
export default VerifyUnsubScribeNewsLetter;
