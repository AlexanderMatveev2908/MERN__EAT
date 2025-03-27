import { X } from "lucide-react";
import { useInfoPop } from "../../core/hooks/useGlobal";
import ButtonBasic from "../components/buttons/ButtonBasic";

const InfoPop = () => {
  const { infoPop, setInfoPop } = useInfoPop();

  const someoneIsLoading =
    infoPop?.isPendingCancel || infoPop?.isPendingConfirm;
  return (
    <div
      className={`${
        infoPop ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-black/50 popup__i flex justify-center items-center`}
    >
      <div className="w-[75vw] max-w-[750px] min-h-1/2 max-h-full bg-[#111] border-[3px] border-orange-500 rounded-2xl grid grid-rows-[40px_1fr_1fr] p-6">
        <div
          onClick={() => setInfoPop(null)}
          className="w-fit h-fit justify-self-end flex justify-end -mt-3 -mr-2"
        >
          <X className="w-[35px] h-[35px] sm:h-[40px] sm:w-[40px] text-red-600 btn__pseudo hover:scale-120" />
        </div>

        <div className="w-full h-fit flex justify-center self-start">
          <span className="txt__03">{infoPop?.msg}</span>
        </div>

        <div className="w-full self-center grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-5 ">
          <div className="w-full max-w-[250px] flex justify-center">
            <ButtonBasic
              {...{
                label: infoPop?.confirmActMsg,
                styleTxt: "txt__02 ",
                handleClick: () => infoPop?.confirmActCb(),
                isDisabled: someoneIsLoading,
                isPending: infoPop?.isPendingConfirm,
              }}
            />
          </div>

          <div className="w-full max-w-[250px] flex justify-center">
            <ButtonBasic
              {...{
                label: infoPop?.cancelActMsg,
                styleTxt: "txt__02",
                handleClick: () => infoPop?.cancelActCb(),
                isDisabled: someoneIsLoading,
                isPending: infoPop?.isPendingCancel,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoPop;
