import { KeyRound, LogIn, ShieldCheck, UserPen } from "lucide-react";
import { genID } from "../../../../utils/allUtils/genID";
import { SwitchFormFieldType } from "../typesFields";

export const switchFormAuthLeft: SwitchFormFieldType[] = [
  {
    id: genID(),
    label: "Forgot password",
    svg: KeyRound,
    type: "login",
  },
  {
    id: genID(),
    label: "Verify account",
    svg: ShieldCheck,
    type: "register",
  },
];

export const switchFormAuthRight: SwitchFormFieldType[] = [
  {
    id: genID(),
    label: "Create account",
    svg: UserPen,
    type: "login",
  },
  {
    id: genID(),
    label: "Login in your account",
    svg: LogIn,
    type: "register",
  },
];
