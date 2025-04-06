/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REG_EST_TIME,
  REG_OPEN_CLOSE_TIME,
} from "../../core/config/constants/regex";
import { OrderType } from "../../types/types";

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
  const minutes = Math.floor(val % 60);

  return `${
    hours ? `${hours} hour${hours > 1 ? "s" : ""}${minutes ? " and " : ""}` : ``
  }${minutes ? `${minutes} minute${minutes > 1 ? `s` : ``}` : ``}`;
};

export const getPercDelTime = (order: OrderType) => {
  const orderedStamp = new Date(order.timeConfirmed).getTime();
  const supposeDeliverStamp =
    new Date(order.timeConfirmed).getTime() +
    (order.restaurantId as any).delivery.estTimeDelivery * 60 * 1000;
  const stampNow = new Date().getTime();

  const tot = supposeDeliverStamp - orderedStamp;
  const elapsed = stampNow - orderedStamp;

  const perc = (elapsed * 100) / tot;

  return perc > 100 ? 100 : perc;
};

// tot / 100 * perc = part
// perc = part * 100 / tot

// would be better with an if else but i wanted to exercise with nested ternary
export const getColorTimer = (
  order: OrderType,
  perc: number,
  isDelivered: boolean
) =>
  order.status === "delivered" || isDelivered
    ? "bg-green-600"
    : perc >= 100
    ? "bg-red-600"
    : perc >= 75
    ? "bg-orange-600"
    : perc >= 50
    ? "bg-yellow-600"
    : "bg-blue-600";

export const calcDelay = (confirmedAt: string, estDelTime: number) => {
  const confirmed = new Date(confirmedAt).getTime();
  const expected = confirmed + estDelTime * 60 * 1000;
  const now = new Date().getTime();

  const delay = Math.floor((now - expected) / 1000 / 60);
  const hours = Math.floor(delay / 60);
  const minutes = delay % 60;
  const seconds = Math.floor((now - expected) / 1000) % 60;

  if (delay < 0) return null;
  if (!hours && !minutes && !seconds) return `0 seconds`;

  const formatted = `${hours ? `${hours} hour${hours > 1 ? "s" : ""}` : ``} ${
    minutes
      ? `${hours ? "and " : ""}${minutes} minute${minutes > 1 ? "s" : ""}`
      : ``
  } ${
    seconds
      ? `${minutes ? "and " : ""}${seconds} second${seconds > 1 ? "s" : ""}`
      : ``
  }`;
  return formatted;
};
