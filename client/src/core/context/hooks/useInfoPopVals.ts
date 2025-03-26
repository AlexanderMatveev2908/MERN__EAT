import { SetStateAction, useState } from "react";

type InfoPop = {
  msg: string;
  confirmActMsg: string;
  cancelActMsg: string;
  confirmActCb: () => void;
  cancelActCb: () => void;
  isPending: boolean;
} | null;

export type InfoPopVals = {
  infoPop: InfoPop;
  setInfoPop: React.Dispatch<SetStateAction<InfoPop>>;
};

export const useInfoPopVals = () => {
  const [infoPop, setInfoPop] = useState<InfoPop>(null);

  return {
    infoPop,
    setInfoPop,
  };
};
