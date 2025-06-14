import { SetStateAction, useState } from "react";

export type NoticeType = "success" | "error";

type Notice = {
  type: NoticeType;
  msg: string;
} | null;

export type NoticeVals = {
  notice: Notice;
  setNotice: React.Dispatch<SetStateAction<Notice>>;
};

export const useNoticeVals = () => {
  const [notice, setNotice] = useState<Notice>(null);

  return {
    notice,
    setNotice,
  };
};
