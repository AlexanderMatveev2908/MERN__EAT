/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

type PropsType = {
  isLoading?: boolean;
  isDisabled?: boolean;
  label?: string;
  type?: "button" | "submit" | "reset";
  styleTxt?: string;
  styleBtn?: string;
  handleClick?: (...params: any) => void;
};

const ButtonBasic: FC<PropsType> = ({
  isLoading,
  isDisabled,
  label,
  type = "button",
  handleClick,
  styleTxt,
  styleBtn,
}) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      onClick={handleClick}
      type={type}
      className="btn__with_shadow_container group "
    >
      <div className={`${styleBtn} btn__with_shadow_container__content`}>
        <span className={`${styleTxt} content__txt`}>{label}</span>
      </div>

      <span className={`${styleBtn} btn__with_shadow_container__shadow`}></span>
    </button>
  );
};
export default ButtonBasic;
