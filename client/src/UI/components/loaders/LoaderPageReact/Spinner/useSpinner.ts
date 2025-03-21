import { useEffect, useState } from "react";
import { tailwindBreak } from "../../../../../core/config/constants/breakpoints";

export const useSpinner = () => {
  const [numEls, setNumEls] = useState(35);
  const deg = 360 / numEls;

  useEffect(() => {
    const updateSpinner = () =>
      window.innerWidth > tailwindBreak.lg ? setNumEls(40) : setNumEls(30);

    window.addEventListener("resize", updateSpinner);

    return () => window.removeEventListener("resize", updateSpinner);
  }, []);

  return {
    numEls,
    deg,
  };
};
