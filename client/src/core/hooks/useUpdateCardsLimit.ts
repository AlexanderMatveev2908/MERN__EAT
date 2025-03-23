import { SetStateAction, useEffect } from "react";
import { tailwindBreak } from "../config/constants/breakpoints";

export const useUpdateCardsLimit = (
  limit: number,
  setLimit: React.Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    const updateLimit = () => {
      const w = window.innerWidth;

      if (w > tailwindBreak._2xl) setLimit(12);
      else if (w > 1380) setLimit(9);
      else setLimit(6);
    };

    updateLimit();

    window.addEventListener("resize", updateLimit);

    return () => {
      window.removeEventListener("resize", updateLimit);
    };
  }, [limit, setLimit]);

  return { limit };
};
