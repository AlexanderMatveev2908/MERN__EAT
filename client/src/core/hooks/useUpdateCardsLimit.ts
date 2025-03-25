import { SetStateAction, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { REG_P_SEARCH } from "../config/constants/regex";

export const useUpdateCardsLimit = (
  limit: number,
  setLimit: React.Dispatch<SetStateAction<number>>
) => {
  const path = useLocation().pathname;

  useEffect(() => {
    const updateLimit = () => {
      const w = window.innerWidth;
      if (REG_P_SEARCH.test(path)) return;
      if (w > 1250) setLimit(9);
      else if (w > 835) setLimit(6);
      else setLimit(6);
    };

    updateLimit();

    window.addEventListener("resize", updateLimit);

    return () => {
      window.removeEventListener("resize", updateLimit);
    };
  }, [limit, setLimit, path]);

  return { limit };
};
