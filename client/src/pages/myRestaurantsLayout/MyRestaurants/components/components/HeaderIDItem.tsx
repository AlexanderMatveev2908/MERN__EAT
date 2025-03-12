import { FC } from "react";
import { CiDatabase } from "react-icons/ci";

type PropsType = {
  id: string;
};

const HeaderIDItem: FC<PropsType> = ({ id }) => {
  return (
    <div className="border-b-2 border-orange-500 w-full grid grid-cols-[75px_1fr] justify-items-center">
      <div className="w-full flex gap-2 items-center px-3 py-2">
        <CiDatabase className="text-orange-500 min-w-[25px] min-h-[25px]" />

        <span className="txt__02 ">ID:</span>
      </div>

      <div className="w-full flex justify-start items-center overflow-x-auto hide_scrollbar">
        <span className="txt__01">{id}</span>
      </div>
    </div>
  );
};
export default HeaderIDItem;
