import { BadgeHelp } from "lucide-react";
import { FC } from "react";
import { useGeneratePwd } from "./useGeneratePwd";

const GeneratePwd: FC = () => {
  const {
    strongPwd,
    genRef,
    handlePwdBtn,
    handleCopyBnt,
    isGeneratePwdTooltip,
    isCopyingTooltip,
  } = useGeneratePwd();

  return (
    <div className="w-full max-w-full grid grid-cols-[35px_1fr] gap-3 items-center">
      <div className="w-full max-w-fit relative flex group">
        <button
          onClick={handlePwdBtn}
          ref={genRef}
          type="button"
          className="btn__pseudo txt__01  justify-self-start hover:text-orange-500 flex gap-2  hover:scale-120"
        >
          <BadgeHelp className="w-[30px] h-[30px]" />
        </button>

        <span
          className={`tooltip min-w-[250px] transition-all duration-300 ${
            isGeneratePwdTooltip
              ? "-translate-y-[150%] opacity-100"
              : "opacity-0 translate-y-0"
          }`}
        >
          Generate strong password
        </span>
      </div>

      {!!strongPwd && (
        <div className="relative group w-full flex max-w-fit">
          <button
            type="button"
            onClick={handleCopyBnt}
            className="txt__00 transition-all duration-300 border-2 border-orange-500 rounded-xl w-full max-w-fit px-6 py-1 cursor-pointer hover:text-orange-500 active:scale-120 active:duration-75 break-all text-start"
          >
            {strongPwd}
          </button>
          <span
            className={`tooltip max-w-fit px-6 min-w-[100px] md:min-w-[150px] opacity-0 md:duration-300 ${
              isCopyingTooltip ? "copy_tooltip" : "transform-none"
            }`}
          >
            {isCopyingTooltip ? "Copied" : "Copy password"}
          </span>
        </div>
      )}
    </div>
  );
};
export default GeneratePwd;
