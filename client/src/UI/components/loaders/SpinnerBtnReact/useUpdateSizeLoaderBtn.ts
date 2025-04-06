import { useEffect, useState } from "react";
import { tailwindBreak } from "../../../../core/config/constants/breakpoints";

export const useUpdateSizeLoaderBtn = () => {
  const [size, setSize] = useState(25);

  useEffect(() => {
    const updateSize = () => {
      const currWidth = window.innerWidth;

      return currWidth > tailwindBreak.sm ? setSize(40) : setSize(30);
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [setSize]);

  return { size };
};
