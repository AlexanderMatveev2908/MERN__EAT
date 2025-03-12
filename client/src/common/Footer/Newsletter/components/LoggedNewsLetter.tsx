import { FC } from "react";
import { CurrUserType } from "../../../../types/userTypes";
import ButtonAnimated from "../../../../components/buttons/ButtonAnimated";
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
  return (
    <div className="max-w-[200px] md:max-w-[225px] flex justify-start">
      <ButtonAnimated
        {...{
          label: currUser?.hasSubscribedToNewsletter
            ? "Unsubscribe"
            : "Subscribe",
          type: "button",
          handleClick: submitNewsLetter,
          isPending,
        }}
      />
    </div>
  );
};
export default LoggedNewsLetter;
