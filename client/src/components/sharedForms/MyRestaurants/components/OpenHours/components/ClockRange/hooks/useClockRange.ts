import { useEffect } from "react";

export const useClockRange = ({
  rangeRef,
}: {
  rangeRef: React.RefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    const focusRange = (e: MouseEvent) => {
      if (rangeRef.current?.contains(e.target as Node))
        rangeRef.current?.focus();
    };

    document.addEventListener("click", focusRange);

    return () => document.removeEventListener("click", focusRange);
  }, [rangeRef]);
};
