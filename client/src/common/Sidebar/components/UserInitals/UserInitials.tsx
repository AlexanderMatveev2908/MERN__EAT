import { FC } from "react";
import { CircleUserRound } from "lucide-react";
import { CurrUserType } from "./../../../../types/userTypes";

type PropsType = {
  currUser: CurrUserType;
};

const UserInitials: FC<PropsType> = ({ currUser }) => {
  return (
    <div className="w-full flex items-center border-b-2 border-orange-500">
      <div className="w-full flex items-center pb-4 pl-3 gap-3">
        <CircleUserRound className=" w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]" />
        <span className="txt__02 max-w-full truncate">{currUser.email}</span>
      </div>
    </div>
  );
};
export default UserInitials;
