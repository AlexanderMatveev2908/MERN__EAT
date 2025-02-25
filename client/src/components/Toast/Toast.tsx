import { FC, useEffect } from "react";
import { useToast } from "../../hooks/useGlobal";
import { CircleCheck, CircleX, X } from "lucide-react";

const Toast: FC = () => {
  const { isToast, msg, type, showToastMsg, closeToast } = useToast();

  useEffect(() => {
    showToastMsg("This is a success message", "SUCCESS");
  }, [showToastMsg]);

  useEffect(() => {
    let timer;
    if (isToast)
      timer = setTimeout(() => {
        closeToast();
      }, 3000);

    return () => clearTimeout(timer);
  }, [closeToast, isToast]);

  console.log([isToast, msg, type]);

  return (
    <div
      className={`fixed top-5 right-5 toast__i bg-[#111] rounded-xl text-[whitesmoke] min-w-3/4 sm:min-w-1/2 max-w-3/4 h-fit min-h-[75px] flex border-t-2 border-r-2 transition-all duration-500  ${
        type === "SUCCESS" ? "border-green-600" : "border-red-600"
      } 
      ${isToast ? "active_in" : "active_out translate-x-[120%]"}
      `}
    >
      <div
        className={`w-full grid grid-cols-[75px_1fr] relative min-h-full rounded-xl border-l-[8px] ${
          type === "SUCCESS" ? "border-green-600" : "border-red-600"
        }`}
      >
        <div className="w-full flex flex-col items-center justify-center">
          {type === "SUCCESS" ? (
            <CircleCheck className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] text-green-600" />
          ) : (
            <CircleX className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] text-red-600" />
          )}
        </div>

        <div
          className={`absolute txt__03 top-3 left-[75px] ${
            type === "SUCCESS" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type}
        </div>

        <div onClick={closeToast} className="absolute right-5 top-3 ">
          <X className="h-[30px] w-[30px] sm:w-[32px] sm:h-[32px] text-red-600 hover:scale-110 btn__pseudo" />
        </div>

        <div className="w-full flex justify-start pr-6 pb-6 pt-12">
          <span className="txt__03">{msg}</span>
        </div>
      </div>
    </div>
  );
};
export default Toast;
