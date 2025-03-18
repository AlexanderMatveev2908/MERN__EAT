import {
  House,
  KeyRound,
  LogIn,
  ShieldCheck,
  User,
  UserPen,
  UserRoundPen,
} from "lucide-react";
import { MdAdminPanelSettings, MdOutlineMenuBook } from "react-icons/md";
import { genID } from "../../../../utils/allUtils/genID";
import { SideDropFieldType } from "../typesFields";
import { IoCreate, IoRestaurantSharp } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa";
import { HiBuildingStorefront } from "react-icons/hi2";
import { GoCodeReview } from "react-icons/go";

export const allUsersFields: SideDropFieldType[] = [
  {
    id: genID(),
    path: "/",
    label: "Home",
    svg: House,
  },
];

export const loggedUserFields: SideDropFieldType[] = [
  {
    id: genID(),
    path: "/user/profile",
    label: "Profile",
    svg: User,
  },
  {
    id: genID(),
    path: "/user/manage-account",
    label: "Manage Account",
    svg: UserRoundPen,
  },
];

export const fieldsAdmin: SideDropFieldType[] = [
  {
    id: genID(),
    path: "/my-restaurants",
    label: "My restaurants",
    svg: IoRestaurantSharp,
  },
  {
    id: genID(),
    path: "/my-restaurants/add-restaurant",
    label: "Create restaurant",
    svg: HiBuildingStorefront,
  },
  {
    id: genID(),
    path: "/my-dishes",
    label: "My dishes",
    svg: MdOutlineMenuBook,
  },
  {
    id: genID(),
    label: "Add dish",
    path: `/my-dishes/add-dish`,
    svg: IoCreate,
  },
  {
    id: genID(),
    path: "/manage-orders",
    label: "Manage orders",
    svg: FaDatabase,
  },
  {
    id: genID(),
    path: "/users-reviews",
    label: "Users reviews",
    svg: GoCodeReview,
  },
];

export const fieldAdminDrop = {
  id: genID(),
  label: "Admin menu",
  icon: MdAdminPanelSettings,
};

export const loggedUserFieldsDrop: SideDropFieldType[] = loggedUserFields.slice(
  0,
  2
);

export const nonLoggedUserFields: SideDropFieldType[] = [
  {
    id: genID(),
    path: "/auth/login",
    label: "Login",
    svg: LogIn,
  },
  {
    id: genID(),
    path: "/auth/send-email?type=recover-pwd",
    label: "Recover Password",
    from: "/auth/login",
    svg: KeyRound,
  },
  {
    id: genID(),
    path: "/auth/register",
    label: "Register",
    svg: UserPen,
  },
  {
    id: genID(),
    path: "/auth/send-email?type=verify-account",
    label: "Verify Account",
    from: "/auth/register",
    svg: ShieldCheck,
  },
];
