import { FC } from "react";
import SpinnerBtnReact from "../loaders/SpinnerBtnReact/SpinnerBtnReact";

type PropsType = {
  isDisabled?: boolean;
  label?: string;
  type?: "button" | "submit" | "reset";
  styleTxt?: string;
  styleBtn?: string;
  handleClick?: () => void;
  isPending?: boolean;
};

const ButtonBasic: FC<PropsType> = ({
  isDisabled,
  label,
  type = "button",
  handleClick,
  styleTxt,
  styleBtn,
  isPending,
}) => {
  return isPending ? (
    <SpinnerBtnReact />
  ) : (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      type={type}
      className="btn__with_shadow_container group outline-none"
    >
      <div
        className={`${
          styleBtn ?? "group-hover:text-orange-500 border-orange-500"
        } btn__with_shadow_container__content`}
      >
        <span className={`${styleTxt}`}>{label}</span>
      </div>

      <span
        className={`${
          styleBtn ?? "border-orange-500"
        } btn__with_shadow_container__shadow`}
      ></span>
    </button>
  );
};
export default ButtonBasic;
