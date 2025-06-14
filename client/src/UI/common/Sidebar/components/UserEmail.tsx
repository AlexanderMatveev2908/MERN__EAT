import { FC } from "react";
import { CircleUserRound } from "lucide-react";

type PropsType = {
  email: string;
};

const UserEmail: FC<PropsType> = ({ email }) => {
  return (
    <div className="w-full flex items-center border-b-2 border-orange-500 sticky pt-4 top-0 z-20 bg-[#111]">
      <div className="w-full flex items-center pb-4 pl-3 gap-3">
        <CircleUserRound className=" w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]" />
        <span className="txt__02 max-w-full truncate">{email}</span>
      </div>
    </div>
  );
};
export default UserEmail;
