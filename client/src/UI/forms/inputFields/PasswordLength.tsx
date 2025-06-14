/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleCheckBig, CircleX, Ruler } from "lucide-react";
import { FC } from "react";
import { UseFormWatch } from "react-hook-form";

type PropsType = {
  watch: UseFormWatch<any>;
};

const PasswordLength: FC<PropsType> = ({ watch }) => {
  const password = watch("password");
  const isValid = password?.length >= 8;

  return (
    <div className="w-full col-span-2 grid grid-cols-[35px_70px_1fr] items-center">
      <span>
        {isValid ? (
          <CircleCheckBig className="w-[30px] h-[30px] text-green-600" />
        ) : (
          <CircleX className="w-[30px] h-[30px] text-red-600" />
        )}
      </span>
      <span
        className={`txt__00 ml-2 px-3 py-1 border-2 rounded-xl ${
          isValid
            ? "text-green-600 border-green-600"
            : "text-red-600 border-red-600"
        }`}
      >
        <Ruler />
      </span>
      <span
        className={`txt__01 ml-4 ${
          isValid ? "text-green-600" : "text-red-600"
        }`}
      >
        {password?.length ?? 0} / 8
      </span>
    </div>
  );
};
export default PasswordLength;
