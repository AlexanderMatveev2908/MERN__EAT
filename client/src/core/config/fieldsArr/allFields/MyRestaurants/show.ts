import { IconType } from "react-icons/lib";
import { processRatingBackend } from "../../../../../utils/allUtils/conditionalStyleLocation";
import {
  formatTimeHmMh,
  genID,
  priceFormatter,
} from "../../../../../utils/utils";
import {
  BaseFieldShowIcon,
  BaseFieldShowType,
  ShowCardMyRestArrValsIcon,
  ShowCardMyRestType,
  ShowCardMyRestTypeIcon,
} from "../../typesFields";
import {
  MdConnectWithoutContact,
  MdDeliveryDining,
  MdOutlineRateReview,
} from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaClock, FaDoorClosed, FaDoorOpen } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";
import { BiSolidDish, BiWorld } from "react-icons/bi";
import {
  DynamicFieldOrder,
  DynamicFieldRating,
} from "../../../../../types/allTypes/restAdmin";
import { ordersStatus } from "./filterSort";
import { formatEstDelivery } from "../../../../../utils/allUtils/formatTime";

export const fieldsShowMyRestaurants = (
  ...params: string[][]
): ShowCardMyRestArrValsIcon[] => [
  {
    id: genID(),
    label: "Location",
    vals: params[0],
    icon: BiWorld,
  },
  {
    id: genID(),
    label: "Contact",
    vals: params[1],
    icon: MdConnectWithoutContact,
  },
  {
    id: genID(),
    label: "Categories",
    vals: params[2],
    icon: IoRestaurant,
  },
];

export const showMyRestaurantsOpenHours: BaseFieldShowIcon = {
  id: genID(),
  label: "Open Hours",
  icon: FaClock,
};

export const showMyRestaurantsOpenHoursFields = (
  ...params: number[]
): ShowCardMyRestTypeIcon[] => [
  {
    id: genID(),
    icon: FaDoorOpen,
    val: formatTimeHmMh(params[0]),
  },
  {
    id: genID(),
    icon: FaDoorClosed,
    val: formatTimeHmMh(params[1]),
  },
];

export const showMyRestaurantsDelivery: BaseFieldShowIcon = {
  id: genID(),
  label: "Delivery",
  icon: MdDeliveryDining,
};

export const showMyRestaurantsDeliveryFields = (
  ...params: (number | string)[]
): ShowCardMyRestType[] => [
  {
    id: genID(),
    label: "Time",
    val: formatEstDelivery(params[0] as number),
  },
  {
    id: genID(),
    label: "Price",
    val: params[1],
  },
  {
    id: genID(),
    label: "Free meal",
    val: params[2],
  },
];

export const makeSubFieldsOrders = (
  ...params: DynamicFieldOrder[]
): (BaseFieldShowType & { val: number })[] =>
  [...ordersStatus].map((el, i) => ({
    id: genID(),
    label: el.at(0)?.toUpperCase() + el.slice(1),
    val: params[i].count,
  }));

export const showFieldOrders: BaseFieldShowIcon = {
  id: genID(),
  icon: CiDeliveryTruck,
  label: "Orders",
};

export const showFieldReviews: BaseFieldShowIcon = {
  id: genID(),
  label: "Reviews",
  icon: MdOutlineRateReview,
};

export const makeSubFieldsReviews = (
  ...params: DynamicFieldRating[]
): {
  id: string;
  val: number;
  stars: IconType[];
}[] =>
  Array.from({ length: 5 }).map((_, i) => ({
    id: genID(),
    val: params[i].count,
    stars: processRatingBackend(i + 1),
  }));

export const showFieldDishes: BaseFieldShowIcon = {
  id: genID(),
  label: "Dishes",
  icon: BiSolidDish,
};

export const makeShowPriceFieldsMyRest = (...params: number[]) => [
  {
    label: "Avg price",
    field: priceFormatter({ price: params[0] }),
  },
  {
    label: "Avg quantity",
    field: params[1].toFixed(0),
  },
  {
    label: "Dishes count",
    field: params[2],
  },
];

export const showBasicFieldsRating = (...params: number[]) =>
  [
    {
      label: "Avg rating",
      field: params[0],
    },
    {
      label: "Reviews count",
      field: params[1],
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));
