/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Beef, Cookie, Fish, Ham, IceCreamCone, Pizza } from "lucide-react";

type PropsType = {
  isLoading?: boolean;
  isDisabled?: boolean;
  label?: string;
  type?: "button" | "submit" | "reset";
  styleTxt?: string;
  handleClick?: (...params: any) => void;
};

const ButtonAnimated: FC<PropsType> = ({
  isLoading,
  isDisabled,
  label,
  type = "button",
  handleClick,
  styleTxt,
}) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={isDisabled || isLoading}
      className="btn_container"
    >
      <div className="btn_container__content">
        <div className="content__btn">
          <span className={`${styleTxt ?? "btn__txt"}`}>
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
