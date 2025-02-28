import { CircleCheckBig, CircleX } from "lucide-react";
import { FC } from "react";
import { UseFormWatch } from "react-hook-form";
import { LoginFormType } from "../Login/useLoginCustom";
import { isValidPiecePwd } from "../Login/regexLogin";

type PropsType = {
  watch: UseFormWatch<LoginFormType>;
  loginRegArr: {
    id: string;
    label: string;
    reg: RegExp;
    msgErr: string;
    msgGood: string;
  }[];
};

const PasswordChecker: FC<PropsType> = ({ watch, loginRegArr }) => {
  const password = watch("password");

  const content = loginRegArr.map((el) => {
    const isValid = isValidPiecePwd(password, el.reg);

    return (
      <div
        key={el.id}
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
          className={`txt__00 ml-2 px-2 py-1 border-2 rounded-xl ${
            isValid
              ? "text-green-600 border-green-600"
              : "text-red-600 border-red-600"
          }`}
        >
          {el.label}
        </span>
        <span
          className={`txt__01 ml-4 ${
            isValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {isValid ? el.msgGood : el.msgErr}
        </span>
      </div>
    );
  });

  return content;
};
export default PasswordChecker;
