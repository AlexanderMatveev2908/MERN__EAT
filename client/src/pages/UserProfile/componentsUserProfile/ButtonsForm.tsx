import { FC } from "react";
import ButtonBasic from "../../../components/ButtonBasic/ButtonBasic";
import ButtonAnimated from "../../../components/ButtonAnimated/ButtonAnimated";

type PropsType = {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  curr: number;
};

const ButtonsForm: FC<PropsType> = ({
  isPrevDisabled,
  isNextDisabled,
  handlePrev,
  handleNext,
  curr,
}) => {
  return (
    <div className="w-full flex items-center justify-around h-fit ">
      <ButtonBasic
        {...{
          label: "Prev",
          type: "button",
          styleTxt: "txt__02",
          isDisabled: isPrevDisabled,
          handleClick: handlePrev,
          styleBtn: "group-hover:text-orange-500 group-hover:border-orange-500",
        }}
      />
      {curr === 2 ? (
        <div className="w-full max-w-[225px] h-full flex items-center">
          <ButtonAnimated {...{ label: "Save Details" }} />
        </div>
      ) : (
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
      )}
    </div>
  );
};
export default ButtonsForm;
