import { useGetCart } from "../cart/useGetCart";
import { useGetCurrUser } from "../useGetCurrUser";

export const useApp = () => {
  useGetCurrUser();
  useGetCart();
};
