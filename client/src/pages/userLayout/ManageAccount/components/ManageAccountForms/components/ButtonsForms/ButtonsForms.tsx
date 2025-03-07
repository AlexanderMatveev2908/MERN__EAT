import { FC } from "react";
import ButtonBasic from "../../../../../../../components/buttons/ButtonBasic/ButtonBasic";

type PropsType = {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  handlePrev: () => void;
  handleNext: () => void;
};

const ButtonsForms: FC<PropsType> = ({
  isPrevDisabled,
  isNextDisabled,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="w-full flex justify-between">
      <div className="w-[min(35vw,200px)] sm:max-w-[200px]">
        <ButtonBasic
          {...{
            type: "button",
            styleTxt: "txt__02",
            label: "Prev",
            handleClick: handlePrev,
            isDisabled: isPrevDisabled,
          }}
        />
      </div>

      <div className="w-[min(35vw,200px)] sm:max-w-[200px]">
        <ButtonBasic
          {...{
            type: "button",
            styleTxt: "txt__02",
            label: "Next",
            handleClick: handleNext,
            isDisabled: isNextDisabled,
          }}
        />
      </div>
    </div>
  );
};
export default ButtonsForms;
