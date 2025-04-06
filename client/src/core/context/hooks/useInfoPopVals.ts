import { SetStateAction, useState } from "react";

export type InfoPopType = {
  msg: string;
  confirmActMsg: string;
  cancelActMsg: string;
  confirmActCb: () => void;
  cancelActCb: () => void;
  isPendingConfirm?: boolean;
  isPendingCancel?: boolean;
} | null;

export type InfoPopVals = {
  infoPop: InfoPopType;
  setInfoPop: React.Dispatch<SetStateAction<InfoPopType>>;
};

export const useInfoPopVals = () => {
  const [infoPop, setInfoPop] = useState<InfoPopType>(null);

  return {
    infoPop,
    setInfoPop,
  };
};
