import { useEffect, useState } from "react";
import { tailwindBreak } from "../../constants/breakpoints";

export const useBlockPages = ({ totPages }: { totPages: number }) => {
  const [blockSize, setBlockSize] = useState<number>(3);
  const [currBlock, setCurrBlock] = useState<number>(1);

  useEffect(() => {
    const updateBlockSize = () =>
      setBlockSize(
        window.innerWidth > tailwindBreak._2xl
          ? 15
          : window.innerWidth > tailwindBreak.lg
          ? 10
          : window.innerWidth > tailwindBreak.md
          ? 8
          : window.innerWidth > tailwindBreak.sm
          ? 5
          : 3
      );

    updateBlockSize();

    window.addEventListener("resize", updateBlockSize);

    return () => window.removeEventListener("resize", updateBlockSize);
  }, []);

  const blockEls = Math.min(blockSize, totPages! - (currBlock - 1) * blockSize);
  const isPrevDisabled = currBlock === 1;
  const isNextDisabled = currBlock * blockSize >= totPages!;
  const arrToMakeBtns = Array.from(
    { length: blockEls },
    (_, i) => i + 1 + (currBlock - 1) * blockSize
  );

  const handleNext = () =>
    isNextDisabled ? null : setCurrBlock(currBlock + 1);

  const handlePrev = () =>
    isPrevDisabled ? null : setCurrBlock(currBlock - 1);

  return {
    blockEls,
    handleNext,
    handlePrev,
    isPrevDisabled,
    isNextDisabled,
    blockSize,
    arrToMakeBtns,
  };
};
