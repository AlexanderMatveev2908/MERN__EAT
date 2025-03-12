import { useLogout } from "./../../../../hooks/useLogout";

export const useDropLogged = () => {
  const { mutate, isPending } = useLogout();

  const handleDropLogout = () => {
    mutate();
  };

  return {
    handleDropLogout,
    isPending,
  };
};
