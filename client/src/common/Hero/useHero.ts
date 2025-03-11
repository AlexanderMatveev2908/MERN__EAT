import { useCallback, useEffect, useState } from "react";
import { tailwindBreak } from "./../../constants/breakpoints";
import { heroFieldsArr } from "./../../config/fieldsArr/heroFieldsArr";

export const useHero = () => {
  const [activeIndx, setActiveIdx] = useState<number>(0);
  const [btnClicked, setBtnClicked] = useState<boolean>(false);
  const [translateVal, setTranslateVal] = useState<number>(100);

  useEffect(() => {
    const updateTranslateVal = () =>
      window.innerWidth <= tailwindBreak.md
        ? setTranslateVal(100)
        : window.innerWidth <= tailwindBreak.lg
        ? setTranslateVal(90)
        : window.innerWidth <= tailwindBreak.xl
        ? setTranslateVal(80)
        : setTranslateVal(75);

    updateTranslateVal();

    window.addEventListener("resize", updateTranslateVal);

    return () => window.removeEventListener("resize", updateTranslateVal);
  }, []);

  const handleNext = useCallback(() => {
    if (activeIndx === heroFieldsArr.length - 1) setActiveIdx(0);
    else setActiveIdx((prev) => prev + 1);
  }, [activeIndx]);

  const handlePrev = () => {
    if (activeIndx === 0) setActiveIdx(heroFieldsArr.length - 1);
    else setActiveIdx((prev) => prev - 1);
  };

  useEffect(() => {
    if (btnClicked) return;

    const interval = setInterval(() => {
      handleNext();
    }, 1500);

    return () => clearInterval(interval);
  }, [btnClicked, handleNext]);

  return { activeIndx, handleNext, handlePrev, setBtnClicked, translateVal };
};
