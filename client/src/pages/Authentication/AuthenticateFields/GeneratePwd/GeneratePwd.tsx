import { BadgeHelp } from "lucide-react";
import { FC } from "react";
import { useGeneratePwd } from "./useGeneratePwd";

const GeneratePwd: FC = () => {
  const { generatePwd, strongPwd, handleCopyPwd } = useGeneratePwd();

  return (
    <div className="w-full grid grid-cols-[35px_1fr] gap-x-4 gap-y-3 items-center">
      <div className="w-full max-w-fit relative flex group">
        <button
          onClick={generatePwd}
          type="button"
          className="btn__pseudo txt__01  justify-self-start hover:text-orange-500 flex gap-2  hover:scale-120"
        >
          <BadgeHelp className="w-[30px] h-[30px]" />
        </button>

        <span className="tooltip min-w-[250px]">Generate strong password</span>
      </div>

      {!!strongPwd && (
        <div className="relative group w-full flex max-w-fit">
          <button
            type="button"
            onClick={handleCopyPwd}
            className="txt__00 transition-all duration-300 border-2 border-orange-500 rounded-xl max-w-fit px-6 py-1 cursor-pointer hover:text-orange-500 active:scale-120 active:duration-75"
          >
            {strongPwd}
          </button>
          <span className="tooltip min-w-[150px]">Copy password</span>
        </div>
      )}
    </div>
  );
};
export default GeneratePwd;
