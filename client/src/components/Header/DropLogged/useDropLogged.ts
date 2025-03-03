import { useEffect, useRef, useState } from "react";
import { useLogout } from "../../../hooks/useLogout";

export const useDropLogged = () => {
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

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

  return {
    dropOpen,
    dropRef,
    toggleDrop,
    isPending,
    handleDropLogout,
  };
};
