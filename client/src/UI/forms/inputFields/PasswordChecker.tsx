/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleCheckBig, CircleX } from "lucide-react";
import { FC } from "react";
import { UseFormWatch } from "react-hook-form";
import { passwordCheckerFieldsArr } from "../../../core/config/fieldsArr/fields";
import { isValidStr } from "../../../utils/allUtils/validateStr";

type PropsType = {
  watch: UseFormWatch<any>;
};

const PasswordChecker: FC<PropsType> = ({ watch }) => {
  return passwordCheckerFieldsArr.map((field) => {
    const isValid = isValidStr(watch("password"), field.reg);

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
  });
};
export default PasswordChecker;
