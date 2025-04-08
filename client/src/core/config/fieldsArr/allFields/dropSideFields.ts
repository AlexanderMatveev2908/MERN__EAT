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
import { RiAccountCircleLine } from "react-icons/ri";

// i want home to be always up above all

// all users will see these
export const allUsersFields: SideDropFieldType[] = [
  {
    path: "/",
    label: "Home",
    svg: House,
  },
  {
    path: "/search",
    label: "Restaurants",
    svg: IoRestaurantSharp,
  },
].map((el) => ({
  ...el,
  id: genID(),
}));

//  fields that all logged users have by default for management account and details location for futures creations of restaurant of purchases
export const loggedUserFields: SideDropFieldType[] = [
  {
    path: "/user/profile",
    label: "Profile",
    svg: User,
  },
  {
    path: "/user/manage-account",
    label: "Manage Account",
    svg: UserRoundPen,
  },
  {
    path: "/my-orders",
    label: "My Orders",
    svg: FaDatabase,
  },
].map((el) => ({
  ...el,
  id: genID(),
}));

// fields management restaurants
export const fieldsAdmin: SideDropFieldType[] = [
  {
    path: "/my-restaurants",
    label: "My restaurants",
    svg: IoRestaurantSharp,
  },
  {
    path: "/my-restaurants/add-restaurant",
    label: "Create restaurant",
    svg: HiBuildingStorefront,
  },
  {
    path: "/my-dishes",
    label: "My dishes",
    svg: MdOutlineMenuBook,
  },
  {
    label: "Add dish",
    path: `/my-dishes/add-dish`,
    svg: IoCreate,
  },
  {
    path: "/manage-orders",
    label: "Manage orders",
    svg: FaDatabase,
  },
  // {
  //   path: "/users-reviews",
  //   label: "Users reviews",
  //   svg: GoCodeReview,
  // },
].map((el) => ({
  ...el,
  id: genID(),
}));

// make it just for habit, but not really need except for the id that is required in types of props for tsc
export const fieldAdminDrop = {
  id: genID(),
  label: "Admin menu",
  icon: MdAdminPanelSettings,
};

//  these are fields used only oin dropdown , i show just a couple to not make it too long
export const loggedUserFieldsDrop: SideDropFieldType[] = loggedUserFields
  .slice(0, 2)
  .map((el) => ({
    ...el,
    id: genID(),
  }));

export const fieldAccountDrop = {
  id: genID(),
  label: "Account",
  icon: RiAccountCircleLine,
};

//  fields about actions to log recover pwd ecc
export const nonLoggedUserFields: SideDropFieldType[] = [
  {
    path: "/auth/login",
    label: "Login",
    svg: LogIn,
  },
  {
    path: "/auth/send-email?type=recover-pwd",
    label: "Recover Password",
    from: "/auth/login",
    svg: KeyRound,
  },
  {
    path: "/auth/register",
    label: "Register",
    svg: UserPen,
  },
  {
    path: "/auth/send-email?type=verify-account",
    label: "Verify Account",
    from: "/auth/register",
    svg: ShieldCheck,
  },
].map((el) => ({
  ...el,
  id: genID(),
}));
