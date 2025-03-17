import { IconType } from "react-icons/lib";
import { processRatingBackend } from "../../../../../utils/allUtils/conditionalStyleLocation";
import { formatTimeHmMh, genID } from "../../../../../utils/utils";
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
import { FaClock, FaDatabase, FaDoorClosed, FaDoorOpen } from "react-icons/fa";
import { IoCreate, IoRestaurant, IoRestaurantSharp } from "react-icons/io5";
import { BiSolidDish, BiWorld } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";

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
  ...params: number[]
): ShowCardMyRestType[] => [
  {
    id: genID(),
    label: "Delivery time",
    val: params[0],
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
  ...params: number[]
): (BaseFieldShowType & { val: number })[] =>
  ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
    (el, i) => ({
      id: genID(),
      label: el,
      val: params[i],
    })
  );

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
  ...params: number[]
): {
  id: string;
  val: number;
  stars: IconType[];
}[] =>
  Array.from({ length: 5 }).map((_, i) => ({
    id: genID(),
    val: params[i],
    stars: processRatingBackend(i + 1),
  }));

export const showFieldDishes: BaseFieldShowIcon = {
  id: genID(),
  label: "Dishes",
  icon: BiSolidDish,
};

export const makeLinksMyRestPage = (restId: string) =>
  [
    {
      label: "Update",
      path: `/my-restaurants/update/${restId}`,
      icon: GrUpdate,
    },
    {
      label: "Add dish",
      path: `/my-dishes/add-dish`,
      icon: IoCreate,
    },
    {
      label: "My dishes",
      path: `/my-dishes?restId=${restId}`,
      icon: IoRestaurantSharp,
    },
    {
      label: "My orders",
      path: `/my-orders?restId=${restId}`,
      icon: FaDatabase,
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));
