import { CircleCheckBig, CircleX } from "lucide-react";
import { FC } from "react";

type PropsType = {
  isValid: boolean | string;
  field: {
    id: string;
    msg: string;
    reg: RegExp;
    label: string;
  };
};

const PasswordChecker: FC<PropsType> = ({ isValid, field }) => {
  return (
    <div
      key={field.id}
      className="w-full grid grid-cols-[35px_70px_1fr] items-center"
    >
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
        {field.label}
      </span>
      <span
        className={`txt__00 hidden ml-4 ${
          isValid ? "text-green-600" : "text-red-600"
        }`}
      >
        {field.msg}
      </span>
    </div>
  );
};
export default PasswordChecker;
