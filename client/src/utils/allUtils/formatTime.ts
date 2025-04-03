import {
  REG_EST_TIME,
  REG_OPEN_CLOSE_TIME,
} from "../../core/config/constants/regex";

export const formatTimeHmMh = (val: number) => {
  if (!REG_EST_TIME.test(val + "")) return "00:00";

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
  (reverseFormaTimeHhMm(closeVal) - reverseFormaTimeHhMm(openVal)) / 60;

export const formatDate = (str: string) =>
  new Intl.DateTimeFormat("us", {
    day: "numeric",
    // month: "long",
    // year: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: false,
  }).format(new Date(str));

export const formatEstDelivery = (val: number) => {
  const hours = Math.floor(val / 60);
  const minutes = val % 60;

  return `${
    hours ? `${hours} hour${hours > 1 ? "s" : ""}${minutes ? " and " : ""}` : ``
  }${minutes ? `${minutes} minute${minutes > 1 ? `s` : ``}` : ``}`;
};
