import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FC } from "react";
import { useBlockPages } from "./useBlockPages";

export type PropsType = {
  totPages?: number;
  currPage: number;
  setCurrPage: (val: number) => void;
};

const BlockPages: FC<PropsType> = ({ totPages = 0, currPage, setCurrPage }) => {
  const {
    handleNext,
    handlePrev,
    arrToMakeBtns,
    isPrevDisabled,
    isNextDisabled,
    handlePrevInterval,
    handleNextInterval,
    clearIntervalHandler,
    blockSize,
    currBlock,
  } = useBlockPages({
    totPages,
  });

  return (
    !!totPages && (
      <div className="w-[95%] flex flex-col items-center absolute bottom-10">
        <div className="w-full grid grid-cols-[50px_1fr_50px] items-center">
          {currBlock > 1 ? (
            <button
              disabled={isPrevDisabled}
              onClick={handlePrev}
              onMouseDown={handlePrevInterval}
              onMouseUp={clearIntervalHandler}
              className="w-full flex items-center justify-center btn__brand"
            >
              <ArrowBigLeft className="h-[50px] w-[50px] " />
            </button>
          ) : (
            <div className=""></div>
          )}

          <div className="max-w-full flex items-center justify-around">
            {arrToMakeBtns.map((num) => (
              <button
                onClick={() => setCurrPage(num)}
                key={num}
                className={`${
                  currPage === num
                    ? "text-orange-500 border-orange-500 scale-120"
                    : "text-white"
                } btn__brand txt__02 border-2 rounded-xl px-4 py-1`}
              >
                {num}
              </button>
            ))}
          </div>
          {currBlock < Math.ceil(totPages / blockSize) && (
            <button
              disabled={isNextDisabled}
              onClick={handleNext}
              onMouseDown={handleNextInterval}
              onMouseUp={clearIntervalHandler}
              className="w-full flex items-center justify-center btn__brand"
            >
              <ArrowBigRight className="h-[50px] w-[50px] " />
            </button>
          )}
        </div>
      </div>
    )
  );
};
export default BlockPages;
