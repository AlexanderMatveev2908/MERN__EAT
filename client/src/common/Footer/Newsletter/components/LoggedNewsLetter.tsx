import { FC } from "react";
import { CurrUserType } from "../../../../types/userTypes";
import SpinnerBtnReact from "../../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";
import ButtonAnimated from "../../../../components/buttons/ButtonAnimated/ButtonAnimated";
// import { CurrUserType } from "../../../../../types/userTypes";

type PropsType = {
  isPending: boolean;
  currUser: CurrUserType | null;
  submitNewsLetter: (e: React.FormEvent<HTMLFormElement>) => void;
};

const LoggedNewsLetter: FC<PropsType> = ({
  isPending,
  currUser,
  submitNewsLetter,
}) => {
  return isPending ? (
    <SpinnerBtnReact {...{ styleGiven: "justify-start" }} />
  ) : (
    <div className="max-w-[200px] md:max-w-[225px] flex justify-start">
      <ButtonAnimated
        {...{
          label: currUser?.hasSubscribedToNewsletter
            ? "Unsubscribe"
            : "Subscribe",
          type: "button",
          handleClick: submitNewsLetter,
        }}
      />
    </div>
  );
};
export default LoggedNewsLetter;
