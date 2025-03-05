import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { FC, useState } from "react";
import { useBlockPages } from "./hooks/useBlockPages";

export type PropsType = {
  totPages?: number;
  // currPage?: number;
  // setCurrPage?: (val: number) => void;
};

const BlockPages: FC<PropsType> = ({
  totPages = 200,
  // currPage,
  // setCurrPage,
}) => {
  const [currPage, setCurrPage] = useState<number>(1);

  const {
    handleNext,
    handlePrev,
    arrToMakeBtns,
    isPrevDisabled,
    isNextDisabled,
    handlePrevInterval,
    handleNextInterval,
    clearIntervalHandler,
  } = useBlockPages({
    totPages,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full grid grid-cols-[50px_1fr_50px] items-center">
        <button
          disabled={isPrevDisabled}
          onClick={handlePrev}
          onMouseDown={handlePrevInterval}
          onMouseUp={clearIntervalHandler}
          className="w-full flex items-center justify-center btn__brand"
        >
          <ArrowBigLeft className="h-[50px] w-[50px] " />
        </button>
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
        <button
          disabled={isNextDisabled}
          onClick={handleNext}
          onMouseDown={handleNextInterval}
          onMouseUp={clearIntervalHandler}
          className="w-full flex items-center justify-center btn__brand"
        >
          <ArrowBigRight className="h-[50px] w-[50px] " />
        </button>
      </div>
    </div>
  );
};
export default BlockPages;
