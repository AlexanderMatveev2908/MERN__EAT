import { FC } from "react";
import ButtonBasic from "../../../../components/buttons/ButtonBasic/ButtonBasic";
import ButtonAnimated from "../../../../components/buttons/ButtonAnimated/ButtonAnimated";
import SpinnerBtnReact from "../../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";

type PropsType = {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  curr: number;
  isPendingUpdate: boolean;
};

const ButtonsForm: FC<PropsType> = ({
  isPrevDisabled,
  isNextDisabled,
  handlePrev,
  handleNext,
  curr,
  isPendingUpdate,
}) => {
  return (
    <div
      className="w-full grid grid-cols-2
     items-center h-fit justify-items-center"
    >
      <div className="w-full max-w-[30vw] sm:max-w-[200px]">
        <ButtonBasic
          {...{
            label: "Prev",
            type: "button",
            styleTxt: "txt__02",
            isDisabled: isPrevDisabled,
            handleClick: handlePrev,
            styleBtn:
              "group-hover:text-orange-500 group-hover:border-orange-500",
          }}
        />
      </div>
      {curr === 2 ? (
        isPendingUpdate ? (
          <SpinnerBtnReact />
        ) : (
          <div className="w-full max-w-[200px] h-full flex items-center">
            <ButtonAnimated
              {...{ label: "Save", isDisabled: isNextDisabled, type: "submit" }}
            />
          </div>
        )
      ) : (
        <div className="w-full max-w-[30vw] sm:max-w-[200px]">
          <ButtonBasic
            {...{
              label: "Next",
              type: "button",
              styleTxt: "txt__02",
              isDisabled: isNextDisabled,
              handleClick: handleNext,
              styleBtn:
                "group-hover:text-orange-500 group-hover:border-orange-500",
            }}
          />
        </div>
      )}
    </div>
  );
};
export default ButtonsForm;
