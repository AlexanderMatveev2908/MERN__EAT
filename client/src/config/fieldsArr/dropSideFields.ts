/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  House,
  KeyRound,
  LogIn,
  ShieldCheck,
  User,
  UserPen,
  UserRoundPen,
} from "lucide-react";
import { MdAdminPanelSettings } from "react-icons/md";
import { genID } from "../../utils/genID";

export type SideDropFieldType = {
  id: string;
  path: string;
  label: string;
  svg: any;
  from?: string;
};

export const allUsersFields = [
  {
    id: genID(),
    path: "/",
    label: "Home",
    svg: House,
  },
];

export const loggedUserFields = [
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
  {
    id: genID(),
    path: "/my-restaurants/add-restaurant",
    label: "Create restaurant",
    svg: MdAdminPanelSettings,
  },
  {
    id: genID(),
    path: "/my-restaurants",
    label: "My restaurants",
    svg: MdAdminPanelSettings,
  },
];

export const loggedUserFieldsDrop = loggedUserFields.slice(0, 2);

export const nonLoggedUserFields = [
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
