import { FC } from "react";
import { Beef, Cookie, Fish, Ham, IceCreamCone, Pizza } from "lucide-react";
import SpinnerBtnReact from "../loaders/SpinnerBtnReact/SpinnerBtnReact";

type PropsType = {
  label: string;
  type: "button" | "submit" | "reset";
  styleTxt?: string;
  handleClick?: () => void;
  isDisabled?: boolean;
  isPending?: boolean;
};

const ButtonAnimated: FC<PropsType> = ({
  isDisabled,
  label,
  type = "button",
  handleClick,
  styleTxt,
  isPending,
}) => {
  return isPending ? (
    <SpinnerBtnReact />
  ) : (
    <button
      onClick={handleClick}
      type={type}
      disabled={isDisabled}
      className="btn_container outline-none"
    >
      <div className="btn_container__content">
        <div className="content__btn">
          <span className={`relative z-40 ${styleTxt ?? "btn__txt"}`}>
            {label ?? "BUTTON"}
          </span>
        </div>

        <span className="btn__ref_1"></span>
        <span className="btn__ref_2"></span>
      </div>

      <span className="btn_container__shadow"></span>

      <Pizza className="btn_container__svg_1" />
      <Ham className="btn_container__svg_2" />
      <Beef className="btn_container__svg_3" />
      <Fish className="btn_container__svg_4" />
      <Cookie className="btn_container__svg_5" />
      <IceCreamCone className="btn_container__svg_6" />
    </button>
  );
};
export default ButtonAnimated;
