import { useQuery } from "@tanstack/react-query";
import { useHandleErr } from ".././useHandleErr";
import { useCart, useUser } from ".././useGlobal";
import { useEffect } from "react";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { getCartUserAPI } from "../../api/api";

export const useGetCart = () => {
  const { isLogged } = useUser();
  const { handleErrAPI } = useHandleErr();
  const { setCartLogged } = useCart();

  const { data, isPending, isError, isSuccess, error } = useQuery({
    queryKey: ["myCart"],
    queryFn: getCartUserAPI,
    enabled: isLogged,
  });

  useEffect(() => {
    if (isError) handleErrAPI({ err: error as ErrFoodApp });
    if (isSuccess) {
      console.log(data?.cart);
      setCartLogged(data?.cart);
    }
  }, [data, isPending, isError, isSuccess, error, handleErrAPI, setCartLogged]);
};
