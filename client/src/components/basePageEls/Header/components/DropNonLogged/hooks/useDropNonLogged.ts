import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useDropNonLogged = () => {
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

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

  const toggleDrop = () => setDropOpen((prev) => !prev);

  const handleSideClick = (path: string, from?: string) => {
    navigate(path, from ? { state: { from } } : undefined);
    setDropOpen(false);
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
    toggleDrop,
    dropOpen,
    dropRef,
    handleSideClick,
    setDropOpen,
    handleMouseEnter,
    handleMouseLeave,
  };
};
