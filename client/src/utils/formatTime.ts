import { REG_OPEN_CLOSE_TIME } from "../config/constants/regex";

export const formatTimeHmMh = (val: number) => {
  const hours = Math.floor(val / 60);
  const minutes = val % 60;

  return `${(hours + "").padStart(2, "0")}:${(minutes + "").padStart(2, "0")}`;
};

export const reverseFormaTimeHhMm = (val: string) => {
  if (!val || !REG_OPEN_CLOSE_TIME.test(val)) return 0;

  const [hours, minutes] = val.split(":").map((el) => +el);

  return hours * 60 + minutes;
};

export const getDiffTime = (closeVal: string, openVal: string) =>
  reverseFormaTimeHhMm(closeVal) / 60 - reverseFormaTimeHhMm(openVal) / 60;
