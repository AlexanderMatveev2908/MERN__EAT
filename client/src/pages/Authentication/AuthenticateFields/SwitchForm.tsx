import { KeyRound, LogIn, ShieldCheck, UserPen } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

type PropsType = {
  type: "login" | "register";
};

const SwitchForm: FC<PropsType> = ({ type }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2">
      <Link
        to="/send-email"
        className="w-full flex items-center gap-3 group el_with_after"
      >
        {type === "login" ? (
          <>
            <KeyRound className="icon_switch_form" />
            <span className="transition-all duration-300 group-hover:text-orange-500 txt__00">
              Forgot password
            </span>
          </>
        ) : (
          <>
            <ShieldCheck className="icon_switch_form" />{" "}
            <span className="transition-all duration-300 group-hover:text-orange-500 txt__00">
              Verify account
            </span>
          </>
        )}
      </Link>

      <Link
        to={type === "login" ? "/register" : "/login"}
        className="w-full flex items-center gap-3 group el_with_after sm:justify-self-end"
      >
        {type === "login" ? (
          <>
            <UserPen className="icon_switch_form" />
            <span className="transition-all duration-300 group-hover:text-orange-500 txt__00">
              Create account
            </span>
          </>
        ) : (
          <>
            <LogIn className="icon_switch_form" />
            <span className="transition-all duration-300 group-hover:text-orange-500 txt__00">
              Create account
            </span>
          </>
        )}
      </Link>
    </div>
  );
};
export default SwitchForm;
