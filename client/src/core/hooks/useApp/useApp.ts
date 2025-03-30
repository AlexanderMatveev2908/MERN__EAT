import { useGetCart } from "../cartLogged/useGetCart";
import { useSaveDbStorageCart } from "../cartLogged/useSaveDbStorageCart";
import { useSwitchCartJustLogged } from "../cartLogged/useSwitchCartJustLogged";
import { useGetCurrUser } from "../useGetCurrUser";

export const useApp = () => {
  useGetCurrUser();
  useGetCart();
  useSwitchCartJustLogged();
  useSaveDbStorageCart();
};
