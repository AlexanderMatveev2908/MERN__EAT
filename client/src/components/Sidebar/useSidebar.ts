import { useEffect } from "react";

export const useSidebar = ({
  sideRef,
  setSideOpen,
}: {
  sideRef: React.MutableRefObject<HTMLDivElement | null>;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const closeSide = (e: MouseEvent) => {
      if (!sideRef.current?.contains(e.target as Node)) {
        setSideOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSide);

    return () => {
      document.removeEventListener("mousedown", closeSide);
    };
  }, [setSideOpen, sideRef]);
};
