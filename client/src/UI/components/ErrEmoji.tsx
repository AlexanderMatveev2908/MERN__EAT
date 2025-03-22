import { FC } from "react";
import { MdError } from "react-icons/md";

type PropsType = {
  txt: string;
};

const ErrEmoji: FC<PropsType> = ({ txt }) => {
  return (
    <div className="w-full flex flex-col h-[30vh] justify-center items-center">
      <div className="w-full flex gap-5 items-center justify-center">
        <MdError className="min-w-[40px] min-h-[40px] text-orange-500" />
        <span className="txt__03">{txt}</span>
      </div>
    </div>
  );
};
export default ErrEmoji;
