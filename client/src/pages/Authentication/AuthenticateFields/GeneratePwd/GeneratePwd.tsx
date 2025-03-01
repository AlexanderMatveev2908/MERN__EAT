import { BadgeHelp } from "lucide-react";
import { FC } from "react";
import { useGeneratePwd } from "./useGeneratePwd";

const GeneratePwd: FC = () => {
  const { strongPwd, handlePwdBtn, handleCopyBnt, isCopyingTooltip } =
    useGeneratePwd();

  return (
    <div className="w-full max-w-full grid grid-cols-1 gap-3">
      <div className="w-full max-w-fit flex hover:text-orange-500 btn__pseudo">
        <button
          onClick={handlePwdBtn}
          type="button"
          className="justify-self-start flex gap-4 items-center cursor-pointer"
        >
          <BadgeHelp className="w-[30px] h-[30px]" />

          <span className="txt__00">Generate strong password</span>
        </button>
      </div>

      {!!strongPwd && (
        <div className="relative group w-full flex max-w-fit">
          <button
            type="button"
            onClick={handleCopyBnt}
            className="txt__00 btn__pseudo border-2 border-orange-500 rounded-xl w-full max-w-fit px-6 py-1 cursor-pointer hover:text-orange-500 break-all text-start"
          >
            {strongPwd}
          </button>
          <span
            className={`tooltip txt__00 max-w-fit px-6 min-w-[150px] ${
              isCopyingTooltip ? "copy_tooltip" : "opacity-0"
            }`}
          >
            Password Copied
          </span>
        </div>
      )}
    </div>
  );
};
export default GeneratePwd;
