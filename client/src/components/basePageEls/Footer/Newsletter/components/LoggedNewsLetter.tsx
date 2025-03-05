import { FC } from "react";
import SpinnerBtnReact from "../../../../loaders/SpinnerBtnReact/SpinnerBtnReact";
import ButtonAnimated from "../../../../buttons/ButtonAnimated/ButtonAnimated";
import { CurrUserType } from "../../../../../types/userTypes";

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
          type: "submit",
          handleClick: submitNewsLetter,
        }}
      />
    </div>
  );
};
export default LoggedNewsLetter;
