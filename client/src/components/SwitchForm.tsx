import { FC, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  switchFormAuthLeft,
  switchFormAuthRight,
} from "../config/fieldsArr/switchForms";

type PropsType = {
  type: "login" | "register";
};

const SwitchForm: FC<PropsType> = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2">
      <button
        type="button"
        onClick={() =>
          navigate(
            `/auth/send-email?type=${
              type === "login" ? "recover-pwd" : "verify-account"
            }`,
            { state: { from: location.pathname } }
          )
        }
        className="w-full flex items-center gap-3 group el__after_below cursor-pointer"
      >
        {switchFormAuthLeft.map(
          (field) =>
            field.type === type && (
              <Fragment key={field.id}>
                <field.svg className="svg__switch_form" />{" "}
                <span className="el__flow group-hover:text-orange-500 txt__00">
                  {field.label}
                </span>
              </Fragment>
            )
        )}
      </button>

      <Link
        to={type === "login" ? "/auth/register" : "/auth/login"}
        className="w-full flex items-center gap-3 group el__after_below sm:justify-self-end"
      >
        {switchFormAuthRight.map(
          (field) =>
            field.type === type && (
              <Fragment key={field.id}>
                <field.svg className="svg__switch_form" />
                <span className="el__flow group-hover:text-orange-500 txt__00">
                  {field.label}
                </span>
              </Fragment>
            )
        )}
      </Link>
    </div>
  );
};
export default SwitchForm;
