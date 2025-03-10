import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "./../../../hooks/useLogout";

export const useSidebar = ({
  sideRef,
  setSideOpen,
}: {
  sideRef: React.MutableRefObject<HTMLDivElement | null>;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

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

  const { mutate, isPending } = useLogout();

  const handleLogout = () => mutate();

  const handleSideClick = (path: string, from?: string) => {
    navigate(path, from ? { state: { from } } : undefined);
    setSideOpen(false);
  };

  return {
    isPending,
    handleLogout,
    handleSideClick,
  };
};
