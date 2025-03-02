import { useEffect, useState } from "react";
import { tailwindBreak } from "../../../../constants/breakpoints";

export const useUpdateSizeLoader = () => {
  const [size, setSize] = useState(50);

  useEffect(() => {
    const updateSize = () => {
      const currWidth = window.innerWidth;

      return currWidth > tailwindBreak.md
        ? setSize(150)
        : currWidth > tailwindBreak.sm
        ? setSize(100)
        : setSize(50);
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [setSize]);

  return { size };
};
