/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, JSX } from "react";
import { ErrFoodApp } from "../../types/allTypes/API";
import LoaderPageReact from "./loaders/LoaderPageReact/LoaderPageReact";
import { msgHelpersFrontBack } from "../../core/hooks/useHandleErr";
import ErrEmoji from "./ErrEmoji";
import { Navigate } from "react-router-dom";

type PropsType = {
  canStay?: boolean;
  isPending: boolean;
  isError: boolean;
  error: any;
  children?: JSX.Element | boolean;
};

const ParentContentLoading: FC<PropsType> = ({
  canStay,
  isPending,
  isError,
  error,
  children,
}) => {
  return typeof canStay === "boolean" && !canStay ? (
    <Navigate to="/" replace />
  ) : isPending ||
    msgHelpersFrontBack.includes(
      (error as ErrFoodApp)?.response?.data?.msg ?? ""
    ) ? (
    <LoaderPageReact />
  ) : isError ? (
    <ErrEmoji {...{ err: error as ErrFoodApp }} />
  ) : (
    children
  );
};
export default ParentContentLoading;
