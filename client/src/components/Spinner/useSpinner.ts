import { useEffect, useState } from "react";
import { tailwindBreak } from "../../constants/breakpoints";

export const useSpinner = () => {
  const [numEls, setNumEls] = useState(35);
  const [passedFirstRender, setIsPassedFirstRender] = useState(false);
  const deg = 360 / numEls;

  useEffect(() => {
    setTimeout(() => {
      setIsPassedFirstRender(true);
    }, 10);
  }, []);

  useEffect(() => {
    const updateSpinner = () =>
      window.innerWidth > tailwindBreak._2xl
        ? setNumEls(50)
        : window.innerWidth > tailwindBreak.xl
        ? setNumEls(50)
        : window.innerWidth > tailwindBreak.lg
        ? setNumEls(45)
        : window.innerWidth > tailwindBreak.md
        ? setNumEls(35)
        : window.innerWidth > tailwindBreak.sm
        ? setNumEls(40)
        : setNumEls(35);

    window.addEventListener("resize", updateSpinner);

    return () => window.removeEventListener("resize", updateSpinner);
  }, []);

  return {
    numEls,
    deg,
    passedFirstRender,
  };
};
