import { SetStateAction, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useUpdateCardsLimit = (
  limit: number,
  setLimit: React.Dispatch<SetStateAction<number>>
) => {
  const path = useLocation().pathname;

  useEffect(() => {
    const updateLimit = () => {
      const w = window.innerWidth;
      if (path === "/search") return;
      if (w > 1250) setLimit(9);
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
