import { FC, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { switchFormLeftArr, switchFormRightArr } from "./switchFormFieldsArr";

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
            `/send-email?type=${
              type === "login" ? "recover-pwd" : "verify-account"
            }`,
            { state: { from: location.pathname } }
          )
        }
        className="w-full flex items-center gap-3 group el_with_after cursor-pointer"
      >
        {switchFormLeftArr.map(
          (field) =>
            field.type === type && (
              <Fragment key={field.id}>
                <field.svg className="icon_switch_form" />{" "}
                <span className="transition-all duration-300 group-hover:text-orange-500 txt__00">
                  {field.label}
                </span>
              </Fragment>
            )
        )}
      </button>

      <Link
        to={type === "login" ? "/register" : "/login"}
        className="w-full flex items-center gap-3 group el_with_after sm:justify-self-end"
      >
        {switchFormRightArr.map(
          (field) =>
            field.type === type && (
              <Fragment key={field.id}>
                <field.svg className="icon_switch_form" />
                <span className="transition-all duration-300 group-hover:text-orange-500 txt__00">
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
