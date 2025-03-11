import { useEffect, useRef, useState } from "react";
import { tailwindBreak } from "../../../constants/breakpoints";

export const useBlockPages = ({ totPages }: { totPages: number }) => {
  const [blockSize, setBlockSize] = useState<number>(3);
  const [currBlock, setCurrBlock] = useState<number>(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateBlockSize = () =>
      setBlockSize(
        window.innerWidth > tailwindBreak._2xl
          ? 12
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

  // const startIntervalHandler = (action: "prev" | "next") => {
  //   if (intervalRef.current) return;

  //   intervalRef.current = setInterval(() => {
  //     setCurrBlock((prev) => {
  //       const newBlock = action === "prev" ? prev - 1 : prev + 1;

  //       const isPrevDisabled = newBlock < 1;
  //       const isNextDisabled = (newBlock - 1) * blockSize >= totPages!;

  //       if (
  //         (action === "prev" && isPrevDisabled) ||
  //         (action === "next" && isNextDisabled)
  //       ) {
  //         clearIntervalHandler();
  //         return prev;
  //       }

  //       return newBlock;
  //     });
  //   }, 150);
  // };

  const handlePrevInterval = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrBlock((prev) => {
        if (prev === 1) {
          clearIntervalHandler();
          return prev;
        }
        return prev - 1;
      });
    }, 150);
  };

  const handleNextInterval = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrBlock((prev) => {
        if (prev * blockSize >= totPages!) {
          clearIntervalHandler();
          return prev;
        }
        return prev + 1;
      });
    }, 150);
  };

  const clearIntervalHandler = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearIntervalHandler();
  }, []);

  return {
    handleNext,
    handlePrev,
    isPrevDisabled,
    isNextDisabled,
    arrToMakeBtns,
    // startIntervalHandler,
    handlePrevInterval,
    handleNextInterval,
    clearIntervalHandler,
  };
};
