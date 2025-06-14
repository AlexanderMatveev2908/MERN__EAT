import { FC } from "react";
import { CurrUserType } from "../../../../../types/allTypes/userTypes";
import ButtonAnimated from "../../../../components/buttons/ButtonAnimated";

type PropsType = {
  isPending: boolean;
  currUser: CurrUserType | null;
  submitNewsLetter: () => void;
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
