import { FC } from "react";
import { CiDatabase } from "react-icons/ci";
import TooltipEL from "../TooltipEL";

type PropsType = {
  id: string;
};

const HeaderIDItem: FC<PropsType> = ({ id }) => {
  return (
    <div className="border-b-2 border-orange-500 w-full grid grid-cols-[75px_1fr]">
      <div className="w-full flex gap-2 items-center px-3 py-2">
        <CiDatabase className="text-orange-500 icon__base -ml-2" />

        <span className="txt__02 ">ID:</span>
      </div>

      <TooltipEL {...{ txt: id, label: "Id" }} />
    </div>
  );
};
export default HeaderIDItem;
