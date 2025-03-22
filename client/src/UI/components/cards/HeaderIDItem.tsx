import { FC } from "react";
import { CiDatabase } from "react-icons/ci";
import TooltipEL from "../TooltipEL";

type PropsType = {
  id: string;
};

const HeaderIDItem: FC<PropsType> = ({ id }) => {
  return (
    <div className="border-b-2 border-orange-500 w-full grid grid-cols-[75px_1fr] justify-items-center">
      <div className="w-full flex gap-2 items-center px-3 py-2">
        <CiDatabase className="text-orange-500 min-w-[30px] min-h-[30px] -ml-2" />

        <span className="txt__02 ">ID:</span>
      </div>

      <div className="w-full flex justify-start">
        <TooltipEL {...{ txt: id, label: "Id" }} />
      </div>
    </div>
  );
};
export default HeaderIDItem;
