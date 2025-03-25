import { useGetCart } from "../useGetCart";
import { useGetCurrUser } from "../useGetCurrUser";

export const useApp = () => {
  useGetCurrUser();
  useGetCart();
};
