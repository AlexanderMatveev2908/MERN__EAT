import { FC } from "react";

type PropsType = {
  txt: string;
};

const NoLengthResult: FC<PropsType> = ({ txt }) => {
  return (
    <div className="w-full flex flex-col h-[30vh] justify-center items-center">
      <span className="txt__03">{txt}</span>
    </div>
  );
};
export default NoLengthResult;
