import { FC } from "react";
import ButtonBasic from "../../../../../../buttons/ButtonBasic/ButtonBasic";
import { totLen } from "../../hooks/useSwapperForm";

type PropsType = {
  currForm: number;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  handlePrev: () => void;
  handleNext: () => void;
};

const ButtonsForm: FC<PropsType> = ({
  currForm,
  isPrevDisabled,
  isNextDisabled,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="w-full grid grid-cols-2 sm:justify-items-center lg:hidden">
      <div className="w-full max-w-[30vw] sm:max-w-[200px] justify-self-start sm:justify-self-center">
        <ButtonBasic
          {...{
            label: "Prev",
            isDisabled: isPrevDisabled,
            handleClick: handlePrev,
            styleTxt: "txt__02",
            type: "button",
          }}
        />
      </div>
      {currForm !== totLen - 1 && (
        <div className="w-full max-w-[30vw] sm:max-w-[200px] justify-self-end sm:justify-self-center">
          <ButtonBasic
            {...{
              label: "Next",
              isDisabled: isNextDisabled,
              handleClick: handleNext,
              styleTxt: "txt__02",
              type: "button",
            }}
          />
        </div>
      )}
    </div>
  );
};
export default ButtonsForm;
