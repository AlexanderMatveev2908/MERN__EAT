import { FC } from "react";

type PropsType = {
  children: React.ReactNode;
};

const Skeleton: FC<PropsType> = ({ children }) => {
  return (
    <div className="w-full min-h-screen border-[3px] border-orange-500 rounded-xl p-10 grid grid-cols-1 justify-items-center">
      {children}
    </div>
  );
};
export default Skeleton;
