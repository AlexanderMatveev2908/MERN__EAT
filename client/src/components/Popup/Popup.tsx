/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import { FC } from "react";
import ButtonBasic from "../buttons/ButtonBasic";

type PropsType = {
  txt?: string;
  setIsPopup?: (val: boolean) => void;
  isPopup?: boolean;
  greenLabel?: string;
  redLabel?: string;
  confirmAction?: (params?: any) => void;
  isLoading?: boolean;
};

const Popup: FC<PropsType> = ({
  txt,
  setIsPopup,
  isPopup,
  greenLabel,
  redLabel,
  confirmAction,
  isLoading,
}) => {
  return (
    <div
      className={`${
        isPopup ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-black/50 popup__i flex justify-center items-center`}
    >
      <div className="w-[75vw] max-w-[750px] h-1/2 bg-[#111] border-[3px] border-orange-500 rounded-2xl grid grid-cols-1 p-5 content-start relative">
        <div
          onClick={() => setIsPopup?.(false)}
          className="w-fit h-fit justify-self-end flex justify-end -mt-3 -mr-2"
        >
          <X className="w-[35px] h-[35px] sm:h-[40px] sm:w-[40px] text-red-600 btn__pseudo hover:scale-120" />
        </div>

        <div className="w-full h-fit flex justify-center self-start mt-[5%]">
          <span className="txt__03">Are you sure you want to&nbsp;{txt}</span>
        </div>

        <div className="w-full h-fit grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] absolute bottom-[20%] left-1/2 -translate-x-1/2 justify-items-center gap-5">
          <div className="w-full flex justify-center">
            <ButtonBasic
              {...{
                label: greenLabel,
                styleTxt: "txt__02 text-green-600",
                styleBtn: "border-green-600",
                handleClick: () => setIsPopup?.(false),
                isLoading,
              }}
            />
          </div>

          <div className="w-full flex justify-center">
            <ButtonBasic
              {...{
                label: redLabel,
                styleTxt: "txt__02 text-red-600",
                styleBtn: "border-red-600",
                handleClick: confirmAction,
                isLoading,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Popup;
