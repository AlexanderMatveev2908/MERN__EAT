import { FC } from "react";
import ButtonsSwapper from "../../../../UI/components/ButtonsSwapper";
import { totLenUserDetails } from "../../../../core/config/fieldsArr/fields";
import ButtonAnimated from "../../../../UI/components/buttons/ButtonAnimated";

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
