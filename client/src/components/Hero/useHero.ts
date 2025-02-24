import { useCallback, useEffect, useState } from "react";
import { heroFieldsArr } from "./heroFieldsArr";

export const useHero = () => {
  const [activeIndx, setActiveIdx] = useState<number>(0);
  const [btnClicked, setBtnClicked] = useState<boolean>(false);

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

  return { activeIndx, handleNext, handlePrev, setBtnClicked };
};
