import { SetStateAction, useEffect } from "react";

export const useUpdateCardsLimit = (
  limit: number,
  setLimit: React.Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    const updateLimit = () => {
      const w = window.innerWidth;

      if (w > 1250) setLimit(9);
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
