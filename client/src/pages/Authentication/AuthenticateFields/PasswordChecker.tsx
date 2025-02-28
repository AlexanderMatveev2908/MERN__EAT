import { CircleCheckBig, CircleX } from "lucide-react";
import { FC, ReactNode } from "react";
import { UseFormWatch } from "react-hook-form";
import { LoginFormType } from "../Login/useLoginCustom";
import { isValidPiecePwd } from "../Login/regexLogin";

type PropsType = {
  watch: UseFormWatch<LoginFormType>;
  loginRegArr: {
    id: string;
    label: string;
    reg: RegExp;
    msg: string;
  }[];
};

const PasswordChecker: FC<PropsType> = ({ watch, loginRegArr }) => {
  const content: ReactNode[] = [];

  const password = watch("password");

  for (let i = 0; i < loginRegArr.length; i++) {
    if (i % 2 === 0) {
      content.push(
        <div key={loginRegArr[i].id} className="w-full grid grid-cols-1">
          <div className="w-full grid grid-cols-2">
            <span>
              {isValidPiecePwd(password, loginRegArr[i].reg) ? (
                <CircleCheckBig />
              ) : (
                <CircleX />
              )}
            </span>
            <span>{loginRegArr[i].label}</span>
          </div>
          <div className="w-full grid grid-cols-2">
            <span>
              {isValidPiecePwd(password, loginRegArr[i + 1].reg) ? (
                <CircleCheckBig />
              ) : (
                <CircleX />
              )}
            </span>
            <span>{loginRegArr[i + 1].label}</span>
          </div>
        </div>
      );
      i++;
    }
  }

  return content;
};
export default PasswordChecker;
