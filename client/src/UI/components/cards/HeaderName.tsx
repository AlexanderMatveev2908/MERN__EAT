import { FC } from "react";

type PropsType = {
  name: string;
};

const HeaderName: FC<PropsType> = ({ name }) => {
  return (
    <div className="w-full absolute top-0 left-0 flex justify-start h-[50px] bg-black/90 items-center ">
      <span className="txt__03 px-3 overflow-x-auto hide_scrollbar">
        {name}
      </span>
    </div>
  );
};
export default HeaderName;
