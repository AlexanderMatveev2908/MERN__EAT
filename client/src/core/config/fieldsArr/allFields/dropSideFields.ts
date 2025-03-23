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
import { RiAccountCircleLine } from "react-icons/ri";

// i want home to be always up above all
export const homeFieldSide = {
  id: genID(),
  path: "/",
  label: "Home",
  svg: House,
};

// all users will see these
export const allUsersFields: SideDropFieldType[] = [
  {
    id: genID(),
    path: "/search",
    label: "Restaurants",
    svg: IoRestaurantSharp,
  },
];

//  fields that all logged users have by default for management account and details location for futures creations of restaurant of purchases
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

// fields management restaurants
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

// make it just for habit, but not really need except for the id that is required in types of props for tsc
export const fieldAdminDrop = {
  id: genID(),
  label: "Admin menu",
  icon: MdAdminPanelSettings,
};

//  these are fields used only oin dropdown , i show just a couple to not make it too long
export const loggedUserFieldsDrop: SideDropFieldType[] = loggedUserFields.slice(
  0,
  2
);

export const fieldAccountDrop = {
  id: genID(),
  label: "Account",
  icon: RiAccountCircleLine,
};

//  fields about actions to log recover pwd ecc
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
