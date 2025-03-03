/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  House,
  KeyRound,
  LogIn,
  ShieldCheck,
  UserPen,
  UserRound,
} from "lucide-react";
import { genID } from "../../utils/genID";

export type BasicSideLink = Omit<NonLoggedSideLink, "from">;

export const sidebarFieldsArrAllUser: BasicSideLink[] = [
  {
    id: genID(),
    path: "/",
    label: "Home",
    svg: House,
  },
];

export const sidebarFieldsArrLoggedUser = [
  {
    id: genID(),
    path: "/user/profile",
    label: "Profile",
    svg: UserRound,
  },
];

export type NonLoggedSideLink = {
  id: string;
  path: string;
  label: string;
  from?: string;
  svg: any;
};
export const sidebarFieldsArrNonLoggedUser: NonLoggedSideLink[] = [
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

export const makeConditionalStyle = ({
  location,
  el,
  type,
}: {
  location: any;
  el: NonLoggedSideLink;
  type?: string | null;
}) =>
  el?.from && type
    ? type === el.path.split("=")[1]
      ? "active"
      : ""
    : location.pathname === el.path
    ? "active"
    : "";
