import { useEffect } from "react";
import { useGetCart } from "../cartLogged/useGetCart";
import { useSaveDbStorageCart } from "../cartLogged/useSaveDbStorageCart";
import { useSwitchCartJustLogged } from "../cartLogged/useSwitchCartJustLogged";
import { useGetCurrUser } from "../useGetCurrUser";
import { useUser } from "../useGlobal";

export const useApp = () => {
  const { lookUserLogged } = useUser();

  useEffect(() => {
    lookUserLogged();
  }, [lookUserLogged]);

  useGetCurrUser();
  useGetCart();
  useSwitchCartJustLogged();
  useSaveDbStorageCart();
};
