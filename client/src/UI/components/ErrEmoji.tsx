import { FC } from "react";
import { MdError } from "react-icons/md";
import { ErrFoodApp } from "../../types/allTypes/API";

type PropsType = {
  err?: ErrFoodApp | null;
};

const ErrEmoji: FC<PropsType> = ({ err }) => {
  return (
    <div className="w-full flex flex-col h-[30vh] justify-center items-center">
      <div className="w-full flex gap-5 items-center justify-center">
        <MdError className="min-w-[40px] min-h-[40px] text-red-600" />
        <span className="txt__03">
          {err?.response?.data?.msg ||
            err?.message ||
            "Our hamster-powered servers took a break, try later 🐹."}
        </span>
      </div>
    </div>
  );
};
export default ErrEmoji;
