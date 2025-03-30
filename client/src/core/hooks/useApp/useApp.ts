import { useGetCart } from "../cartLogged/useGetCart";
import { useGetCurrUser } from "../useGetCurrUser";

export const useApp = () => {
  useGetCurrUser();
  useGetCart();
};
