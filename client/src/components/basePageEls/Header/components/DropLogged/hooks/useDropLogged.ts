import { useEffect, useRef, useState } from "react";
import { useLogout } from "../../../../../../hooks/useLogout";

export const useDropLogged = () => {
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutClick);

    return () => {
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, []);

  const { mutate, isPending } = useLogout();

  const toggleDrop = () => setDropOpen((prev) => !prev);

  const handleDropLogout = () => {
    mutate();
  };

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setDropOpen(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setDropOpen(false);
    }, 250);
  };

  return {
    dropOpen,
    dropRef,
    toggleDrop,
    isPending,
    handleDropLogout,
    setDropOpen,
    handleMouseEnter,
    handleMouseLeave,
  };
};
