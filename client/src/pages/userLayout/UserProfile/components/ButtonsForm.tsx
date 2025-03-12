import { FC } from "react";
import ButtonAnimated from "../../../../components/buttons/ButtonAnimated";
import { totLenUserDetails } from "../../../../config/fieldsArr/userDetailsFields";
import ButtonsSwapper from "../../../../components/ButtonsSwapper";

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
    <ButtonsSwapper
      {...{
        isPrevDisabled,
        isNextDisabled,
        handleNext,
        handlePrev,
        currForm: curr,
        totLen: totLenUserDetails,
        hiddenLg: false,
      }}
    >
      <div className="w-full max-w-[200px] h-full flex items-center">
        <ButtonAnimated
          {...{
            label: "Save",
            isDisabled: isNextDisabled,
            type: "submit",
            styleTxt: "txt__02",
            isPending: isPendingUpdate,
          }}
        />
      </div>
    </ButtonsSwapper>
  );
};
export default ButtonsForm;
