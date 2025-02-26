import { useEffect, useState } from "react";
import { tailwindBreak } from "../../constants/breakpoints";

export const useSpinner = () => {
  const [numEls, setNumEls] = useState(35);
  const deg = 360 / numEls;

  useEffect(() => {
    const updateSpinner = () =>
      window.innerWidth > tailwindBreak._2xl
        ? setNumEls(60)
        : window.innerWidth > tailwindBreak.xl
        ? setNumEls(50)
        : window.innerWidth > tailwindBreak.lg
        ? setNumEls(60)
        : window.innerWidth > tailwindBreak.md
        ? setNumEls(35)
        : window.innerWidth > tailwindBreak.sm
        ? setNumEls(40)
        : setNumEls(35);

    updateSpinner();

    window.addEventListener("resize", updateSpinner);

    return () => window.removeEventListener("resize", updateSpinner);
  }, []);

  return {
    numEls,
    deg,
  };
};
