import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { ReturnAPIBasic } from "../../../types/types";
import { delCartAPI } from "../../api/APICalls/cart";
import { useUser } from "../useGlobal";
import { useGetFavHooks } from "../useGetFavHooks";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();
  const { isLogged } = useUser();

  const { mutate, isPending } = useMutation({
    mutationFn: delCartAPI,

    onSuccess: (data: ReturnAPIBasic) => {
      showToastMsg(data?.msg ?? "", "SUCCESS");
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => queryClient.resetQueries({ queryKey: ["myCart"] }),
  });

  const handleDeleteCart = () => (isLogged ? mutate() : null);

  return {
    handleDeleteCart,
    isPending,
  };
};
